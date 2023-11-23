import { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
// import { IoHeart } from "react-icons/io5";

const AIImageMenu = ({ hover, title }: { hover: boolean; title: string }) => {
  const [menuHover, setMenuHover] = useState(false);

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
      <div className="AIImage-image-menu-bottom"> {title}</div>
      <div className="LikeButton">
        <IoHeartOutline className="likeIcon" />
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
