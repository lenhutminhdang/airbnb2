import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gallery from "../../components/Places/Gallery";
import { format } from "date-fns";
import BookingModal from "../../components/BookingModal";
import PlaceInfo from "../../components/Places/PlaceInfo";
import PlaceTitle from "../../components/Places/PlaceTitle";

const userCircleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);

const phoneIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
    <path
      fillRule="evenodd"
      d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
      clipRule="evenodd"
    />
  </svg>
);

const calendarIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    <path
      fillRule="evenodd"
      d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Booking() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState();
  const [showModalForm, setShowModalForm] = useState(false);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      const _booking = response.data.find((res) => res._id === bookingId);
      setBooking(_booking);
    });
  }, [bookingId]);

  if (!booking) {
    return <h1>Could not found booking place!</h1>;
  }

  return (
    <div className="mx-auto container py-6 px-4 lg:px-10 xl:px-20">
      {/* Booking title */}
      <PlaceTitle data={booking.place} />

      <div className="flex flex-col gap-4">
        {/* Gallery */}
        {booking.place.photos.length > 0 && (
          <Gallery photos={booking.place.photos} />
        )}

        {/* Place Info */}
        <PlaceInfo
          data={booking.place}
          buttonLabel="Book this place again"
          onShowModal={() => {
            setShowModalForm(true);
            document.body.classList.add("overflow-hidden");
          }}
        />

        {/* Booking Information md:grid grid-cols-2 gap-2 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Your Booking Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:border sm:border-gray-400 sm:shadow-md min-h-52 p-4 rounded-xl">
            <div className="flex justify-center items-center gap-4">
              <div className="shrink-0 w-10 h-10 flex justify-center items-center rounded-full bg-red-100">
                {userCircleIcon}
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Fullname</h3>
                <p>{booking.name}</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <div className="shrink-0 w-10 h-10 flex justify-center items-center rounded-full bg-red-100">
                {phoneIcon}
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Phone number</h3>
                <p>{booking.phone}</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <div className="shrink-0 w-10 h-10 flex justify-center items-center rounded-full bg-red-100">
                {calendarIcon}
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Day check-in</h3>
                <p>{format(new Date(booking.checkIn), "dd-MM-yyyy")}</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <div className="shrink-0 w-10 h-10 flex justify-center items-center rounded-full bg-red-100">
                {calendarIcon}
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Day checkout</h3>
                <p>{format(new Date(booking.checkOut), "dd-MM-yyyy")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <BookingModal
        onCloseModal={() => {
          setShowModalForm(false);
          document.body.classList.remove("overflow-hidden");
        }}
        showModal={showModalForm}
        maxGuests={booking.place.maxGuests}
        price={booking.place.price}
        placeId={booking.place._id}
      />
    </div>
  );
}
