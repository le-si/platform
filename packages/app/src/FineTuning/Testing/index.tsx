import React, { useRef } from 'react';

import * as Stability from "@stability/sdk"

import { GRPC } from "~/GRPC";
import { Theme } from "~/Theme";

export function FineTuningTesting() {
  const grpc = GRPC.use();
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState('');

  const photoUploadInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    photoUploadInputRef.current?.click();
  };

  const handleFileChange = () => {
    const uploadedFile = photoUploadInputRef.current?.files?.[0];
    console.log("got file", uploadedFile)
    if (uploadedFile) {
      const reader = new FileReader();
      console.log("got reader", reader)
      reader.onload = () => {
        const imageData = reader.result;
        console.log("got image data", imageData)
        const imageDataBuffer = Buffer.from(imageData as string, 'base64')
        const artifact = Stability.GRPC.Artifact.create({
          type: Stability.GRPC.ArtifactType.ARTIFACT_IMAGE,
          data: {
            oneofKind: 'binary',
            binary: imageDataBuffer,
          }
        })
        const prompt = Stability.GRPC.Prompt.create()
      }
      reader.readAsDataURL(uploadedFile);
    }
  }

  const createProject = async () => {
    const createProjectRequest = GRPC.CreateProjectRequest.create({
      title: projectName,
      type: Stability.GRPC.ProjectType.TRAINING,
      access: Stability.GRPC.ProjectAccess.PRIVATE,
      status: Stability.GRPC.ProjectStatus.ACTIVE,
    });
    const createProjectResponse = await grpc?.project.create(createProjectRequest).response
    console.log("create project response", createProjectResponse)
  }

  const createFineTuneModel = async () => {
    const request = Stability.GRPC.CreateModelRequest.create({
      name: "test",
      mode: Stability.GRPC.FineTuningMode.FACE,
      objectPrompt: "dog",
      projectId: "fakeProject",
      engineId: "stable-diffusion-blah"
    })
  }

  useEffect(() => {
    const execute = async () => {

      const response = await grpc?.dashboard?.getMe({}).response;
      const email = response?.email;

      email && setEmail(email);
    };

    execute();
  }, [grpc?.dashboard]);


  return (
    <Theme.Page>
      <div className="flex h-[500px] items-center justify-center">
        <input
          type="file"
          style={{ display: 'none' }}
          ref={photoUploadInputRef}
          onChange={handleFileChange}
        />
        <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <button onClick={createProject}>Create Project</button>
        <button onClick={handleClick}>Upload Photo</button>
      </div>
    </Theme.Page>
  );
}
