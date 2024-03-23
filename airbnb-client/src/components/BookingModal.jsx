/* eslint-disable react/prop-types */
import { useContext, useEffect, useReducer } from "react";
import Input from "./Form/Input";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const initialState = {
  checkIn: "",
  checkOut: "",
  numberOfGuests: 1,
  name: "",
  phone: "",
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    default:
      return state;
  }
};

export default function BookingModal({
  onCloseModal,
  showModal,
  maxGuests,
  price,
  placeId,
}) {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(UserContext);

  const numberOfDays =
    formData.checkIn &&
    formData.checkOut &&
    differenceInCalendarDays(
      new Date(formData.checkIn),
      new Date(formData.checkOut)
    );

  const calculatedPrice = Math.abs(numberOfDays * price);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/bookings", {
      place: placeId,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      name: formData.name,
      phone: formData.phone,
      price: calculatedPrice,
    });

    const bookingId = data._id;
    onCloseModal();
    navigate("/account/bookings/" + bookingId);
  };

  useEffect(() => {
    if (user) {
      dispatch({ type: "UPDATE_FIELD", field: "name", value: user.name });
    }
  }, [user]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-screen duration-300 ${
        showModal ? "h-screen opacity-100" : "!h-0 opacity-60"
      } flex justify-center items-center bg-black bg-opacity-50 z-40`}
    >
      <button
        onClick={onCloseModal}
        className="absolute top-3 left-3 p-2 rounded-full bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 translate-y-[2px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      <div
        className={`w-full ${
          showModal ? "h-auto" : "h-0"
        } duration-500 ease-out`}
      >
        <div className="w-[22rem] sm:w-[26rem] md:w-[32rem] flex flex-col gap-8 mx-auto md:mb-20 p-3 sm:p-6 rounded-lg bg-gray-100">
          <div className="flex gap-4 justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-semibold">Bookings</h2>
            <p className="text-2xl">${calculatedPrice}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-lg">
            <div className="grid grid-cols-2 gap-3">
              <Input
                title="Check-in"
                description=""
                type="date"
                name="checkIn"
                onChange={handleInputChange}
                value={formData.checkIn}
                required
                className="p-3 w-full mt-2 text-base rounded-md bg-red-100"
              />
              <Input
                title="Checkout"
                description=""
                type="date"
                name="checkOut"
                onChange={handleInputChange}
                value={formData.checkOut}
                required
                className="p-3 w-full mt-2 text-base rounded-md bg-red-100"
              />
            </div>

            <Input
              title="Number of guests"
              name="numberOfGuests"
              type="number"
              onChange={handleInputChange}
              value={formData.numberOfGuests}
              placeholder={"max guests: " + maxGuests}
              min="1"
              max={maxGuests}
              required
            />
            <Input
              title="Your full name"
              name="name"
              type="text"
              onChange={handleInputChange}
              value={formData.name}
              placeholder="John Doe"
              required
            />
            <Input
              title="Phone number"
              name="phone"
              type="tel"
              onChange={handleInputChange}
              value={formData.phone}
              placeholder="Enter your phone number"
              required
            />

            <button className="primary !p-5 mx-auto font-bold text-lg leading-3">
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
