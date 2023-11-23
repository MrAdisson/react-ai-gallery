import { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

const AIImageMenu = ({ hover, title }: { hover: boolean; title: string }) => {
  const [menuHover, setMenuHover] = useState(false);

  const [like, setLike] = useState(false);

  const onLike = (e) => {
    e.stopPropagation();
    setLike(!like);
  };

  return (
    <div
      className={"AIImage-image-menu"}
      style={{
        ...styles.base,
        ...(hover && styles.fadeOut),
        ...(menuHover && styles.menuHover),
      }}
      onMouseLeave={() => {
        setMenuHover(false);
      }}
      onMouseEnter={() => {
        setMenuHover(true);
      }}
    >
      <div className="AIImage-image-menu-element AIImage-image-menu-title">
        {title}
      </div>
      <div
        className="AIImage-image-menu-element AIImage-image-menu-likeButton"
        onClick={onLike}
      >
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
    </div>
  );
};

const styles = {
  base: {
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  hover: {
    transform: "scale(1.05)",
  },
  fadeOut: {
    transition: "all 0.3s ease-in-out",
    opacity: 0,
  },
  menuHover: {
    opacity: 1,
  },
};

export default AIImageMenu;
