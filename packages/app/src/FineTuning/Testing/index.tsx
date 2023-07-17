import React, { useRef } from 'react';

import * as Stability from "@stability/sdk"

import { GRPC } from "~/GRPC";
import { Theme } from "~/Theme";

export function FineTuningTesting() {
  const grpc = GRPC.use();
  const [userId, setUserId] = useState("");
  const [projectName, setProjectName] = useState('');
  const [projectID, setProjectID] = useState('');
  const [modelID, setModelID] = useState('');

  const engineID = "stable-diffusion-xl-1024-09"

  const photoUploadInputRef = useRef<HTMLInputElement>(null);
  const handleUploadPhoto = () => {
    photoUploadInputRef.current?.click();
  };

  const handleFileChange = async () => {
    const uploadedFile = photoUploadInputRef.current?.files?.[0];
    console.log("got file", uploadedFile)
    if (uploadedFile) {
      const reader = new FileReader();
      console.log("got reader", reader)
      reader.onload = async (event) => {
        const mimeType = uploadedFile.type;
        const imageData = event.target?.result as ArrayBuffer;
        console.log(imageData)
        const artifact = Stability.GRPC.Artifact.create({
          type: Stability.GRPC.ArtifactType.ARTIFACT_IMAGE,
          mime: mimeType,
          data: {
            oneofKind: 'binary',
            binary: new Uint8Array(imageData),
          }
        })
        const artifactPrompt = Stability.GRPC.Prompt.create({
          prompt: {
            oneofKind: 'artifact',
            artifact: artifact,
          }
        })
        const assetParameters = Stability.GRPC.AssetParameters.create({
          action: Stability.GRPC.AssetAction.ASSET_PUT,
          projectId: projectID,
          use: Stability.GRPC.AssetUse.INPUT,
        })
        const request = Stability.GRPC.Request.create({
          params: {
            oneofKind: "asset",
            asset: assetParameters
          },
          engineId: "asset-service",
          prompt: [artifactPrompt],
        })
        const response = await grpc?.generation.generate(request)
        console.log("asset upload response", response)
      }
      reader.readAsArrayBuffer(uploadedFile);
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
    setProjectID(createProjectResponse?.id || "")
  }

  const createFineTuneModel = async () => {
    const request = Stability.GRPC.CreateModelRequest.create({
      name: "test",
      mode: Stability.GRPC.FineTuningMode.OBJECT,
      objectPrompt: "dog",
      projectId: projectID,
      engineId: engineID
    })
    const createModelResponse = await grpc?.fineTuning.createModel(request)
    console.log("create model response", createModelResponse)
  }

  const getModelStatus = async () => {
    const request = Stability.GRPC.GetModelRequest.create({
      id: modelID,
    })
    const getModelResponse = await grpc?.fineTuning.getModel(request)
    console.log("Model status:", getModelResponse)
  }

  const listModels = async () => {
    const request = Stability.GRPC.ListModelsRequest.create({
      id: {
        oneofKind: "userId",
        userId: userId,
      }
    })
    const listModelsResponse = await grpc?.fineTuning.listModels(request)
    console.log("List models response:", listModelsResponse)
  }

  const deleteModel = async () => {
    const request = Stability.GRPC.DeleteModelRequest.create({
      id: modelID,
    })
    const deleteModelResponse = await grpc?.fineTuning.deleteModel(request)
    console.log("Delete model response:", deleteModelResponse)
  }

  useEffect(() => {
    const execute = async () => {

      const response = await grpc?.dashboard?.getMe({}).response;
      const userId = response?.id;

      userId && setUserId(userId);
    };

    execute();
  }, [grpc?.dashboard]);


  return (
    <Theme.Page>
      <div style={{ flexDirection: "column" }} className="flex h-[500px] items-center justify-center">
        <input
          type="file"
          style={{ display: 'none' }}
          ref={photoUploadInputRef}
          onChange={handleFileChange}
        />
        <input type="text" placeholder="Project Name" style={{textAlign: "center"}} value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <button onClick={createProject}>Create Project</button>
        <button onClick={handleUploadPhoto}>Upload Photo</button>
        <button onClick={createFineTuneModel}>Create Fine Tune Model</button>
        <button onClick={getModelStatus}>Get Model Status</button>
        <button onClick={listModels}>List Models</button>
      </div>
    </Theme.Page>
  );
}
