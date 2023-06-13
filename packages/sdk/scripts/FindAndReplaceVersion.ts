import * as ChildProcess from "child_process";
import * as FileSystem from "fs";
import * as Path from "path";
import * as URL from "url";

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const main = () => JavascriptLibIndex.findAndReplaceVersion(CommitHash.get());

namespace JavascriptLibIndex {
  export const path = () => Path.join(__dirname, "../lib/index.js");
  export const findAndReplaceVersion = (commitHash: string) => {
    const file = FileSystem.readFileSync(path()).toString();
    const updated = file.replace("$$VERSION$$", commitHash);
    FileSystem.writeFileSync(path(), updated);
  };
}

namespace CommitHash {
  export const get = () =>
    ChildProcess.execSync("git rev-parse HEAD").toString().trim();
}

main();
