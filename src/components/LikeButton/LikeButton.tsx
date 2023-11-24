import { AuthData } from "@/auth/AuthWrapper";
import feathersClient from "@/configs/feathers";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageType } from "../MasonryGallery/MasonryGallery";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import "./LikeButton.css";

const LikeButton = ({ image }: { image: ImageType }) => {
  const { user } = AuthData();
  const navigate = useNavigate();

  const [like, setLike] = useState(image.isLiked);

  const onLike = (event: MouseEvent) => {
    event.stopPropagation();
    {
      if (!user?.isAuthenticated) {
        // Navigate to login page
        return navigate("/login");
      }
    }
    feathersClient.service("likes").create({
      image: image._id,
    });
    if (like) {
      image.likes--;
    } else {
      image.likes++;
    }
    setLike(!like);
  };

  return (
    <>
      <div style={{ fontSize: ".8rem" }}>{image.likes} &nbsp;</div>
      <div className="likeButton" onClick={onLike}>
        {!like ? (
          <IoHeartOutline className="likeIcon" />
        ) : (
          <IoHeart
            className={
              !like
                ? "likeIcon liked "
                : "LikeButtonAnimationEffect likeIcon liked"
            }
          />
        )}
      </div>
    </>
  );
};

export default LikeButton;
