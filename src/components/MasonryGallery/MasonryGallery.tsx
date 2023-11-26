import { useCallback, useEffect, useState } from "react";
import "./MasonryGallery.css";
import InfiniteScroll from "react-infinite-scroll-component";
import feathersClient from "@/configs/feathers";
import Masonry from "react-masonry-css";
import { GALLERY_IMAGE_WIDTH } from "@/utils/statics";
import AIImage from "../AIImage/AIImage";
import { AuthData } from "@/auth/AuthWrapper";
import { useNavigate } from "react-router-dom";

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
  likes: number;
  isLiked?: boolean;
  positivePrompt?: string;
  negativePrompt?: string;
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
  const navigate = useNavigate();

  const [imagesData, setImagesData] = useState<ImageDataType>();

  const [sortFilter, setSortFilter] = useState<any>({ _id: -1 });
  const [queryFilter, setQueryFilter] = useState<any>({});

  const getImages = useCallback(async () => {
    const response: ImageDataType = await feathersClient
      .service("images")
      .find({
        query: {
          $limit: 10,
          $sort: {
            ...sortFilter,
          },
          ...queryFilter,
        },
      });
    console.log("RESPONSE", response);
    setImagesData(response);
  }, [sortFilter, queryFilter]);

  const next = useCallback(async () => {
    console.log("LOADING MORE IMAGES...");
    const response = await feathersClient.service("images").find({
      query: {
        $limit: 10,
        $skip: imagesData?.data.length,
        $sort: {
          ...sortFilter,
        },
        ...queryFilter,
      },
    });
    imagesData &&
      setImagesData({
        ...response,
        data: [...imagesData.data, ...response.data],
      });
  }, [imagesData, queryFilter, sortFilter]);

  useEffect(() => {
    console.log(sortFilter, queryFilter);
    getImages();
  }, [sortFilter, queryFilter]);

  return (
    <div className="image-grid">
      {/* FILTER SELECTOR */}
      <div className="image-grid-filter fixedElement">
        {/* CHECKBOXK "Has Prompts" */}
        <div className="image-grid-filter-hasPrompts">
          <label htmlFor="hasPrompts">Has Prompts</label>
          <input
            onChange={(e) => {
              if (!e.target.checked) return setQueryFilter({});
              setQueryFilter({
                ...queryFilter,
                positivePrompt: { $gt: 0 },
              });
            }}
            type="checkbox"
            id="hasPrompts"
            name="hasPrompts"
          />
        </div>
        <select
          onChange={(e) => {
            setSortFilter({
              ...sortFilter,
              ["_id"]: e.target.value === "desc" ? -1 : 1,
            });
          }}
          name="timeSort"
        >
          <option value={"desc"}>Newest</option>
          <option value={"asc"}>Oldest</option>
        </select>
      </div>
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
                  image={image}
                  onClick={() => navigate(`/image/${image._id}`)}
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
