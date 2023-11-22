import { useCallback, useEffect, useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "@/assets/vite.svg";
import "./About.css";
import InfiniteScroll from "react-infinite-scroll-component";
import feathersClient from "@/configs/feathers";

type ImageType = {
  _id: string;
  title?: string;
  description?: string;
  positivePromt?: string;
  negativePromt?: string;
  fileKey: string;
  filename: string;
};

const About = () => {
  const [images, setImages] = useState<any[]>([]);
  const AWS_BUCKET_URL =
    "https://mradisson-ai-gallery.s3.eu-north-1.amazonaws.com/";

  const getImages = useCallback(async () => {
    const response = await feathersClient.service("images").find({
      query: {
        $limit: 10,
      },
    });
    console.log(response);
    setImages(response.data);
  }, []);

  const next = useCallback(async () => {
    console.log("LOADING MORE IMAGES...");
    const response = await feathersClient.service("images").find({
      query: {
        $limit: 10,
        $skip: images.length,
      },
    });
    setImages([...images, ...response.data]);
  }, [images]);

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="About">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" width="100px" />
        <img src={viteLogo} className="App-logo" alt="logo" width="100px" />
        <p>ABOUT ABOUT ABOUT</p>

        <div className="image-grid">
          <InfiniteScroll
            dataLength={images.length}
            next={next}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrolableDiv"
          >
            {images.map((image: ImageType) => (
              <div className="image-container" key={image._id}>
                <img
                  src={`${AWS_BUCKET_URL}${image.fileKey}`}
                  alt={image.filename}
                  width="100%"
                  style={{ minHeight: 10 }} //Added minHeight; 10 is just a sample value
                  loading="lazy"
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </header>
    </div>
  );
};

export default About;
