import { AWS_BUCKET_URL } from "@/utils/statics";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AIImage.css";
import AIImageMenu from "./AIImageMenu/AIImageMenu";

const AIImage = ({ fileKey, alt, title, id }: any) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/image/${id}`);
  };

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
    >
      <div style={{ ...styles.base, ...(hover && styles.hover) }}>
        <AIImageMenu hover={hover} title={title} />

        <img
          src={`${AWS_BUCKET_URL}${fileKey}`}
          alt={alt}
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
