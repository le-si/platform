import * as ChildProcess from "child_process";
import * as FileSystem from "fs";
import * as Path from "path";
import * as URL from "url";

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const main = () => {
  OutputDirectory.setup();
  InputDirectory.setup();
  GenerationCommand.execute();
  PrependCode.execute();
  Prettier.execute();
};

namespace GenerationCommand {
  const pathsArguments = () =>
    [
      InputDirectory.ProtoDirectory.path(),
      ...InputDirectory.ProtoDirectory.sourceFiles(),
    ].join(" ");

  export const execute = () =>
    ChildProcess.execSync(
      `npx protoc --ts_out ${OutputDirectory.path()} --proto_path ${pathsArguments()}`
    );
}

namespace InputDirectory {
  export const path = () => Path.join(__dirname, "../api-interfaces");

  export const setup = () => {
    GitRepository.setup();
    TensorsProto.setup();
  };

  export namespace ProtoDirectory {
    export const path = () => `${InputDirectory.path()}/src/proto` as const;

    export const sourceFiles = () =>
      FileSystem.readdirSync(path())
        .filter((file) => file.endsWith(".proto"))
        .map((file) => Path.join(path(), file));
  }

  namespace GitRepository {
    export const setup = () => {
      if (!FileSystem.existsSync(path())) clone();
      forceUpdate();
    };

    export const clone = () =>
      ChildProcess.execSync(
        `git clone https://github.com/Stability-AI/api-interfaces.git ${path()}`
      );

    export const forceUpdate = () =>
      ChildProcess.execSync("git reset --hard origin/main && git pull", {
        cwd: path(),
      });
  }

  namespace TensorsProto {
    export const path = () =>
      `${InputDirectory.path()}/src/tensorizer/proto` as const;

    export const setup = () => {
      GitRepository.setup();
      Copy.setup();
    };

    namespace GitRepository {
      export const path = () => `${InputDirectory.path()}/src/tensorizer`;

      export const setup = () => {
        if (!FileSystem.existsSync(`${path()}/.git`)) clone();
        forceUpdate();
      };

      export const clone = () =>
        ChildProcess.execSync(
          `git clone https://github.com/coreweave/tensorizer.git ${path()}`
        );

      export const forceUpdate = () =>
        ChildProcess.execSync("git reset --hard origin/main", { cwd: path() });
    }

    export namespace Copy {
      export const path = () => `${TensorsProto.path()}/tensors.proto`;

      export const setup = () =>
        FileSystem.copyFileSync(
          path(),
          `${ProtoDirectory.path()}/tensors.proto`
        );
    }
  }
}

namespace OutputDirectory {
  export const path = () => Path.join(__dirname, "../src/GRPC/Generated");

  const remove = () =>
    FileSystem.existsSync(path()) &&
    FileSystem.rmSync(path(), { recursive: true });

  export const setup = () => {
    remove();
    FileSystem.mkdirSync(path());
  };
}

namespace PrependCode {
  const code = `/* eslint-disable */
// @ts-nocheck
`;

  const prependTo = (filePath: string) => {
    const oldContents = FileSystem.readFileSync(filePath, "utf8");
    const newContents = `${code}${oldContents}`;
    FileSystem.writeFileSync(filePath, newContents);
  };

  const iterateFilesInDirectory = (directoryPath: string) =>
    FileSystem.readdirSync(directoryPath).forEach((file) => {
      const filePath = Path.join(directoryPath, file);
      FileSystem.lstatSync(filePath).isDirectory()
        ? iterateFilesInDirectory(filePath)
        : prependTo(filePath);
    });

  export const execute = () => iterateFilesInDirectory(OutputDirectory.path());
}

namespace Prettier {
  export const execute = () => {
    ChildProcess.execSync(
      `yarn prettier --write ${OutputDirectory.path()} --loglevel silent`
    );
  };
}

main();
