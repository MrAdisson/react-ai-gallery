import { useCallback, useEffect, useState } from "react";
import "./MasonryGallery.css";
import InfiniteScroll from "react-infinite-scroll-component";
import feathersClient from "@/configs/feathers";
import Masonry from "react-masonry-css";
import { GALLERY_IMAGE_WIDTH } from "@/utils/statics";
import AIImage from "../AIImage/AIImage";

export type ImageDataType = {
  total: number;
  limit: number;
  skip: number;
  data: ImageType[];
};
export type ImageType = {
  _id: string;
  title?: string;
  description?: string;
  positivePromt?: string;
  negativePromt?: string;
  fileKey: string;
  filename: string;
};
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const MasonryGallery = () => {
  const [imagesData, setImagesData] = useState<ImageDataType>();

  const getImages = useCallback(async () => {
    const response: ImageDataType = await feathersClient
      .service("images")
      .find({
        query: {
          $limit: 10,
          $sort: {
            _id: -1,
          },
        },
      });
    setImagesData(response);
  }, []);

  const next = useCallback(async () => {
    console.log("LOADING MORE IMAGES...");
    const response = await feathersClient.service("images").find({
      query: {
        $limit: 10,
        $skip: imagesData?.data.length,
        $sort: {
          _id: -1,
        },
      },
    });
    imagesData &&
      setImagesData({
        ...response,
        data: [...imagesData.data, ...response.data],
      });
  }, [imagesData]);

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="image-grid">
      <InfiniteScroll
        dataLength={imagesData?.data.length || 0}
        next={next}
        hasMore={(imagesData?.data.length || 0) < (imagesData?.total || 0)}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrolableDiv"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflow: "none",
        }}
      >
        <div
          className="image-container"
          style={{
            maxWidth: 5 * GALLERY_IMAGE_WIDTH,
          }}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {imagesData?.data &&
              imagesData.data.map((image: ImageType) => (
                <AIImage
                  fileKey={image.fileKey}
                  title={image.title}
                  alt={image.filename}
                  id={image._id}
                  key={image._id}
                />
              ))}
          </Masonry>
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default MasonryGallery;
