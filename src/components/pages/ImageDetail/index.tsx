// IMAGE DETAIL COMPONENT (/IMAGE/:id)

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import feathersClient from "@/configs/feathers";

import "./ImageDetail.css";
import { Id } from "@feathersjs/feathers";
import { AWS_BUCKET_URL } from "@/utils/statics";

type ImageType = {
  _id: Id;
  title?: string;
  description?: string;
  positivePromt?: string;
  negativePromt?: string;
  fileKey: string;
  filename: string;
};

const ImageDetail = () => {
  const [image, setImage] = useState<ImageType>();
  const { id } = useParams<{ id: string }>();
  console.log("ID", id);

  useEffect(() => {
    (async () => {
      const response = await feathersClient
        .service("images")
        .find({ query: { _id: id } });
      console.log("RESPONSE", response);
      setImage(response.data?.[0]);
    })();
  }, [id]);

  return (
    <div className="image-detail">
      {image && (
        <div className="image-and-desc-container">
          <div className="imageDetail-image-container">
            <img
              className="imageDetail-image"
              src={`${AWS_BUCKET_URL}${image.fileKey}`}
              alt={image.filename}
              //   style={{ height: "50vh" }}
            />
          </div>
          <div className="imageDetail-desc-container">
            <h1>{image.title}</h1>
            <p>{image.description}</p>
            <p>{image.positivePromt}</p>
            <p>{image.negativePromt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetail;
