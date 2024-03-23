/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { useState } from "react";
import ImageOverlay from "./UI/ImageOverlay";

const arrIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 inline-block translate-y-[2px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    />
  </svg>
);

export default function BookingItem({ booking }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <figure className="flex gap-4 rounded-xl overflow-hidden">
      <div className="shrink-0 aspect-square overflow-hidden w-24 h-24 md:w-40 md:h-40">
        {imageLoading && <ImageOverlay />}
        <img
          onLoad={() => {
            setImageLoading(false);
          }}
          src={booking.place.photos[0]}
          alt=""
          className="object-cover h-full w-full rounded-xl"
        />
      </div>
      <figcaption className="grow flex flex-col justify-between gap-2 sm:gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-xl">{booking.place.title}</h2>
          <p className="text-gray-600 text-base italic">
            <span>{booking.place.address}</span>
          </p>
          <p className="text-base text-gray-600 italic flex gap-2 items-center">
            {format(new Date(booking.checkIn), "dd-MM-yyyy")}

            {arrIcon}

            {format(new Date(booking.checkOut), "dd-MM-yyyy")}
          </p>
        </div>

        <p className="text-xl md:text-3xl text-gray-600 mb-2">
          ${booking.price}
        </p>
      </figcaption>
    </figure>
  );
}
