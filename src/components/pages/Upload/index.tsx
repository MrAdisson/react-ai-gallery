import React, { useState, useCallback, useEffect } from "react";
import feathersClient from "@/configs/feathers";

import "./Upload.css";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";

const About = () => {
  const [file, setFile] = useState<File>();
  const [b64file, setB64file] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [positivePrompt, setPositivePrompt] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();

  const resetForm = () => {
    setFile(undefined);
    setB64file("");
    setTitle("");
    setDescription("");
    setPositivePrompt("");
    setNegativePrompt("");
  };

  const handleFileChange = useCallback((file: File) => {
    console.log("FILE CHANGE", file);
    setFile(file);
  }, []);

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file as Blob);
    fileReader.onloadend = () => {
      const b64String = fileReader.result;
      setB64file(b64String as string);
    };
    const objectUrl = URL.createObjectURL(file as Blob);
    setPreview(objectUrl);
    console.log(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      if (!b64file) {
        alert("NO FILE");
        setLoading(false);
        return;
      }
      try {
        const response = await feathersClient.service("upload").create({
          title,
          description,
          positivePrompt,
          negativePrompt,
          uri: b64file,
        });
        console.log(response);
        setLoading(false);
        // RESET FORM
        resetForm();
        toast.success("Image uploaded successfully !");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    [title, description, positivePrompt, negativePrompt, b64file]
  );

  return (
    <div className="About">
      <header className="App-header">
        <h2>Upload your AI generated pictures</h2>
      </header>
      <div className="upload-page-container">
        {file && <img src={preview} alt="preview" className="uploadPreview" />}
        <form onSubmit={handleSubmit} className="uploadForm">
          <div style={file && { display: "none" }}>
            <FileUploader
              handleChange={handleFileChange}
              name="file"
              multiple={false}
              types={["PNG", "JPEG", "GIF"]}
              label={"Upload or drop a file"}
            />
          </div>
          <div style={file ? {} : { display: "none" }}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={file ? {} : { display: "none" }}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div style={file ? {} : { display: "none" }}>
            <label htmlFor="positivePromt">Positive Promt</label>
            <textarea
              id="positivePromt"
              value={positivePrompt}
              onChange={(e) => setPositivePrompt(e.target.value)}
            />
          </div>
          <div style={file ? {} : { display: "none" }}>
            <label htmlFor="negativePromt">Negative Promt</label>
            <textarea
              id="negativePromt"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
            />
          </div>
          {file && (
            <button type="submit" disabled={loading}>
              {loading ? "LOADING" : "Submit"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default About;
