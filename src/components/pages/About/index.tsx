import React, { useState, useCallback, useEffect } from "react";
import feathersClient from "@/configs/feathers";

const About = () => {
  const [file, setFile] = useState<File>();
  const [b64file, setB64file] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [positivePrompt, setPositivePrompt] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const resetForm = () => {
    setFile(undefined);
    setB64file("");
    setTitle("");
    setDescription("");
    setPositivePrompt("");
    setNegativePrompt("");
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    },
    []
  );

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file as Blob);
      fileReader.onloadend = () => {
        const b64String = fileReader.result;
        setB64file(b64String as string);
      };
    }
  }, [file]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      console.log("SUBMITTING");
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
        <h1>AI Gallery</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="positivePromt">Positive Promt</label>
          <input
            type="text"
            id="positivePromt"
            value={positivePrompt}
            onChange={(e) => setPositivePrompt(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="negativePromt">Negative Promt</label>
          <input
            type="text"
            id="negativePromt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "LOADING" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default About;
