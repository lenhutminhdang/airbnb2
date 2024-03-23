import { useState } from "react";
import ImageOverlay from "../UI/ImageOverlay";

/* eslint-disable react/prop-types */
const locationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function PlaceItem({ place }) {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <figure className="flex gap-4">
      <div className="relative shrink-0 aspect-square overflow-hidden w-24 md:w-40">
        {imageLoading && <ImageOverlay />}
        <img
          onLoad={() => {
            setImageLoading(false);
          }}
          src={place.photos[0]}
          alt=""
          className="object-cover h-full w-full rounded-xl"
        />
      </div>
      <figcaption className="grow">
        <h2 className="font-semibold text-xl">{place.title}</h2>
        <p className="flex gap-2 items-center text-gray-600 text-base italic">
          <span>{place.address}</span> {locationIcon}
        </p>
      </figcaption>
    </figure>
  );
}
