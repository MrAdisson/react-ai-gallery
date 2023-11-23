import { useState } from "react";

const AIImage = ({ fileKey, alt }: any) => {
  const AWS_BUCKET_URL =
    "https://mradisson-ai-gallery.s3.eu-north-1.amazonaws.com/";

  const [hover, setHover] = useState(false);

  return (
    <div>
      <div className="image-menu"></div>
      <img
        src={`${AWS_BUCKET_URL}${fileKey}`}
        alt={alt}
        width="100%"
        loading="lazy"
        onMouseEnter={() => {
          console.log("HOVER");
          setHover(true);
        }}
        onMouseLeave={() => {
          console.log("LEAVE");
          setHover(false);
        }}
        style={{ ...styles.base, ...(hover && styles.hover) }}
      />
    </div>
  );
};

const styles = {
  base: {
    cursor: "pointer",
    transition: "all 0.3s ease",
    // width: "300px",
  },
  hover: {
    zIndex: 2,
    transform: "scale(1.05)",
    boxShadow: "0 0 10px 0px rgba(0,0,0,0.75)",
  },
};

export default AIImage;
