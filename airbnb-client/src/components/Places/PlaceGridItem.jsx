import { useState } from "react";
import ImageOverlay from "../UI/ImageOverlay";

const locationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      fillRule="evenodd"
      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
  </svg>
);

const userIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 inline-block"
  >
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
  </svg>
);

/* eslint-disable react/prop-types */
export default function PlaceGridItem({ place }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[20/19] rounded-xl overflow-hidden">
        {imageLoading && <ImageOverlay />}
        <img
          onLoad={() => {
            setImageLoading(false);
          }}
          src={place.photos[0]}
          alt=""
          className="object-cover h-full w-full hover:scale-105 duration-300"
        />
      </div>
      <figcaption className="flex gap-2">
        <div className="grow truncate">
          <h2 className="font-semibold text-base truncate">{place.title}</h2>
          <p className="flex items-center gap-1 text-gray-600 text-sm italic">
            <span>{place.address}</span>
            {locationIcon}
          </p>
          <div className="flex gap-2 justify-between">
            <p className="text-base font-semibold">
              {place.price}$ <span className="font-normal">night</span>
            </p>
          </div>
        </div>

        <p className="self-start flex gap-1 items-end">
          <span className="inline-block ">{place.maxGuests}</span>
          <span className="inline-block text-gray-600">{userIcon}</span>
        </p>
      </figcaption>
    </figure>
  );
}
