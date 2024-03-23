/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import BookingItem from "./BookingItem";

export default function BookingsList({ bookings }) {
  return (
    <ul className="flex flex-col gap-4 w-full p-4 md:px-12 lg:px-32 xl:px-56">
      {bookings.map((booking) => {
        return (
          <Link to={`${booking._id}`} key={booking._id}>
            <BookingItem booking={booking} />
          </Link>
        );
      })}
    </ul>
  );
}
