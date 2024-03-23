/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ImageOverlay from "../UI/ImageOverlay";

function AllPhotos({ photos, onShowModal, showModal }) {
  const handleCloseModal = () => {
    onShowModal(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div
      className={`w-full h-full fixed bottom-0 left-0 bg-gray-100 duration-[360ms] ${
        showModal ? "opacity-100" : "!h-0 opacity-70"
      }`}
    >
      {/* Top Bar */}
      <div
        className={`${
          showModal ? "fixed opacity-100" : "absolute opacity-50"
        } top-0 z-40 w-full h-16 duration-500 bg-gray-50 shadow-md`}
      >
        <button
          onClick={handleCloseModal}
          className="absolute z-50 top-3 left-3 bg-transparent p-2 rounded-full bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 translate-y-[2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>

      {/* Photos */}
      <ul
        className={`absolute top-[4.5rem] bottom-0 right-0 left-0 overflow-y-scroll px-2 w-full max-h-full max-w-[1200px] mx-auto flex flex-col gap-2`}
      >
        {photos?.map((photo) => {
          return (
            <li key={photo}>
              <img
                src={photo}
                alt=""
                className="h-full w-full aspect-video object-cover object-center"
              />
            </li>
          );
        })}
        <p className="text-center text-gray-600 mb-20">~ End ~</p>
      </ul>
    </div>
  );
}

export default function Gallery({ photos }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [imagesLoading, setImagesLoading] = useState(true);

  const handleImageLoad = () => {
    setImagesLoaded((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      if (imagesLoaded === 5) {
        setImagesLoading(false);
      }
    }, 2000);
  }, [imagesLoaded]);

  return (
    <div>
      <div
        onClick={() => {
          setShowAllPhotos(true);
          // Prevent scroll event on page when modal is opening
          document.body.classList.add("overflow-hidden");
        }}
        className="md:grid grid-cols-2 gap-2 relative overflow-hidden cursor-pointer rounded-xl"
      >
        <div className="relative overflow-hidden aspect-video md:aspect-square">
          {/* Overlay image element if image is not loaded */}
          {imagesLoading && <ImageOverlay />}
          <img
            onLoad={handleImageLoad}
            src={photos[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:grid hidden grid-cols-2 gap-2 overflow-hidden">
          <div className="relative overflow-hidden md:aspect-square">
            {imagesLoading && <ImageOverlay />}
            <img
              onLoad={handleImageLoad}
              src={photos[1]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden md:aspect-square">
            {imagesLoading && <ImageOverlay />}
            <img
              onLoad={handleImageLoad}
              src={photos[2]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden md:aspect-square">
            {imagesLoading && <ImageOverlay />}
            <img
              onLoad={handleImageLoad}
              src={photos[3]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden md:aspect-square">
            {imagesLoading && <ImageOverlay />}
            <img
              onLoad={handleImageLoad}
              src={photos[4]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Display gallery modal button */}
        <button className="absolute bottom-6 right-6 inline-flex gap-2 items-center px-3 py-1 rounded-lg bg-gray-50 border-gray-800 border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <span className="text-sm font-semibold text-gray-800">
            Show all photos
          </span>
        </button>
      </div>

      {createPortal(
        <AllPhotos
          photos={photos}
          onShowModal={setShowAllPhotos}
          showModal={showAllPhotos}
        />,
        document.getElementById("modal")
      )}
    </div>
  );
}
