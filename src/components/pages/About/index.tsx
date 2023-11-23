// import "./About.css";

// // FILE (image) UPLOAD :

// import React, { useState, useCallback } from "react";
// import feathersClient from "@/configs/feathers";

// const About = () => {
//   const [file, setFile] = useState<File>();
//   const [title, setTitle] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [positivePromt, setPositivePromt] = useState<string>("");
//   const [negativePromt, setNegativePromt] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleFileChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files) {
//         setFile(e.target.files[0]);
//       }
//     },
//     []
//   );

//   const handleSubmit = useCallback(
//     async (e: React.FormEvent<HTMLFormElement>) => {
//       // FILEREADER TO GET B64 ENCODED IMAGE STRING

//       e.preventDefault();
//       setLoading(true);

//       try {
//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("description", description);
//         formData.append("positivePromt", positivePromt);
//         formData.append("negativePromt", negativePromt);
//         const response = await feathersClient
//           .service("upload")
//           .create(formData);
//         console.log(response);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     },
//     [title, description, positivePromt, negativePromt, file]
//   );

//   return (
//     <div className="About">
//       <header className="App-header">
//         <h1>AI Gallery</h1>
//       </header>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Description</label>
//           <input
//             type="text"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="positivePromt">Positive Promt</label>
//           <input
//             type="text"
//             id="positivePromt"
//             value={positivePromt}
//             onChange={(e) => setPositivePromt(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="negativePromt">Negative Promt</label>
//           <input
//             type="text"
//             id="negativePromt"
//             value={negativePromt}
//             onChange={(e) => setNegativePromt(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="file">File</label>
//           <input type="file" id="file" onChange={handleFileChange} />
//         </div>
//         <button type="submit" disabled={loading}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default About;

// SAME BUT WITH B64 ENCODED IMAGE STRING UPLOAD:

import React, { useState, useCallback, useEffect } from "react";
import feathersClient from "@/configs/feathers";

const About = () => {
  const [file, setFile] = useState<File>();
  const [b64file, setB64file] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [positivePromt, setPositivePromt] = useState<string>("");
  const [negativePromt, setNegativePromt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const resetForm = () => {
    setFile(undefined);
    setB64file("");
    setTitle("");
    setDescription("");
    setPositivePromt("");
    setNegativePromt("");
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
          positivePromt,
          negativePromt,
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
    [title, description, positivePromt, negativePromt, b64file]
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
            value={positivePromt}
            onChange={(e) => setPositivePromt(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="negativePromt">Negative Promt</label>
          <input
            type="text"
            id="negativePromt"
            value={negativePromt}
            onChange={(e) => setNegativePromt(e.target.value)}
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
