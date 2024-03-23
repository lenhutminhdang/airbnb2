import axios from "axios";
import { useEffect, useState } from "react";
import BookingsList from "../../components/BookingsList";
import Empty from "../../components/Empty";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/bookings").then((res) => {
      setBookings(res.data);
      setIsLoading(false);
    });
    setIsLoading(false);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (!isLoading && bookings.length === 0) {
    return <Empty label="bookings" />;
  }

  return (
    <div>
      <div>
        <BookingsList bookings={bookings} />
      </div>
    </div>
  );
}
