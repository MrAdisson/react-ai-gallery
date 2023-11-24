import LikeButton from "@/components/LikeButton/LikeButton";
import { ImageType } from "@/components/MasonryGallery/MasonryGallery";
import { useState } from "react";

const AIImageMenu = ({
  image,
  hover,
}: {
  image: ImageType;
  hover: boolean;
}) => {
  const { title } = image;

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
      <div className="AIImage-image-menu-element AIImage-image-menu-title">
        {title}
      </div>
      <div className="AIImage-image-menu-element">
        <LikeButton image={image} />
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
