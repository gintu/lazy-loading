import React from "react";
import { useEffect, useRef, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchImageAsync,
  selectImages,
  selectFetchedImageCount,
  selectTotalImageCount,
} from "./imageGridSlice";

function ImageGrid() {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages);
  const fetchedImageCount = useAppSelector(selectFetchedImageCount);
  const totalImageCount = useAppSelector(selectTotalImageCount);

  const [pageNumber, setPageNumber] = React.useState(1);

  const observer: React.MutableRefObject<any> = useRef();
  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    if (totalImageCount && fetchedImageCount === totalImageCount) return;
    dispatch(fetchImageAsync(pageNumber));
  }, [pageNumber]);

  return (
    <div className="grid grid-cols-3 gap-4 pt-20 px-4 md:grid-cols-7 container mx-auto">
      {images.map((image, index) => {
        if (index + 1 === images.length) {
          return (
            <div key={index} ref={lastElementRef} className="w-21 h-70 ">
              <img
                src={require(`../../assets/images/${
                  image["poster-image"] === "posterthatismissing.jpg"
                    ? "placeholder_for_missing_posters.png"
                    : image["poster-image"]
                }`)}
                alt="some 1"
                className="w-full h-48"
              />
              <div className="my-2 font w-21 text-ellipsis font-light">
                {image.name}
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="w-21 h-70 ">
              <img
                src={require(`../../assets/images/${
                  image["poster-image"] === "posterthatismissing.jpg"
                    ? "placeholder_for_missing_posters.png"
                    : image["poster-image"]
                }`)}
                alt="some 1"
                className="w-full h-48 object-cover"
              />
              <div className="my-2 font font-light w-21 text-ellipsis">
                {image.name}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ImageGrid;
