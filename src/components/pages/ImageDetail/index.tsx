// IMAGE DETAIL COMPONENT (/IMAGE/:id)

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import feathersClient from "@/configs/feathers";

import "./ImageDetail.css";
import { AWS_BUCKET_URL } from "@/utils/statics";
import { ImageType } from "@/components/MasonryGallery/MasonryGallery";
import LikeButton from "@/components/LikeButton/LikeButton";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { toast } from "react-toastify";

const ImageDetail = () => {
  const [image, setImage] = useState<ImageType>();
  const { id } = useParams<{ id: string }>();

  const handle = useFullScreenHandle();

  const manageFullScreen = () => {
    if (handle.active) handle.exit();
    else {
      handle.enter();
    }
  };
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
    <>
      {image && (
        <div className="image-detail-container">
          <div className="imageDetail-image-container">
            <FullScreen handle={handle}>
              <img
                src={`${AWS_BUCKET_URL}${image.fileKey}`}
                alt={image.filename}
                className={
                  handle.active
                    ? "imageDetail-image-fullscreen"
                    : "imageDetail-image"
                }
                onClick={manageFullScreen}
              />
            </FullScreen>
          </div>
          <div className="imageDetail-desc-container">
            <p className="imageDetail-desc-title imageDetail-desc-element">
              {image.title || "Untitled"}
            </p>
            <p className="imageDetail-desc-description imageDetail-desc-element">
              "{image.description || "..."}"
            </p>
            <div>Prompts : </div>
            <p
              className="imageDetail-desc-pprompt imageDetail-desc-prompt imageDetail-desc-element"
              onClick={() => {
                if (!image.positivePrompt) return;
                navigator.clipboard.writeText(image.positivePrompt);
                toast.success("Positive prompt copied to clipboard !", {
                  icon: "👏",
                });
              }}
            >
              {image.positivePrompt}
            </p>
            <p
              className="imageDetail-desc-nprompt imageDetail-desc-prompt imageDetail-desc-element"
              onClick={() => {
                if (!image.negativePrompt) return;
                navigator.clipboard.writeText(image.negativePrompt);
                toast.success("Negative prompt copied to clipboard !", {
                  icon: "👏",
                });
              }}
            >
              {image.negativePrompt}
            </p>
            <div className="imageDetail-likes">
              <LikeButton image={image} />
            </div>
          </div>
        </div>
      )}
      {!image && <div>Loading...</div>}
    </>
  );
};

export default ImageDetail;
