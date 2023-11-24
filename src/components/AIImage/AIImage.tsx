import { AWS_BUCKET_URL } from "@/utils/statics";
import { useState } from "react";
import AIImageMenu from "./AIImageMenu/AIImageMenu";
import "./AIImage.css";
import { ImageType } from "../MasonryGallery/MasonryGallery";

const AIImage = ({
  image,
  onClick,
  className,
}: {
  image: ImageType;
  onClick: () => void;
  className?: string;
}) => {
  const { fileKey } = image;
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onClick={onClick}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={className}
    >
      <div style={{ ...styles.base, ...(hover && styles.hover) }}>
        <AIImageMenu hover={hover} image={image} />
        <img
          src={`${AWS_BUCKET_URL}${fileKey}`}
          alt={image.title || "NO ALT DESCRIPTION"}
          width="100%"
          loading="lazy"
        />
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

export default AIImage;
