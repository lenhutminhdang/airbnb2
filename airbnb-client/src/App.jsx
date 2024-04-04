import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import RootLayout from "./RootLayout";
import Signup from "./pages/Signup";
import axios from "axios";
import UserContextProvider from "./context/UserContext";
import Profile from "./pages/account/Profile";
import AccountLayout from "./pages/AccountLayout";
import PlacesLayout from "./pages/account/PlacesLayout";
import Bookings from "./pages/account/Bookings";
import MyPlaces from "./pages/account/Places/MyPlaces";
import NewPlaceForm from "./pages/account/Places/PlaceForm";
import EditPlaceForm from "./pages/account/Places/PlaceForm";
import PlaceDetails from "./pages/PlaceDetails";
import Booking from "./pages/account/Booking";
import Error from "./pages/Error";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;
// axios.defaults.timeout = 5000;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "places/:placeId",
        element: <PlaceDetails />,
      },
      {
        path: "account",
        element: <AccountLayout />,
        children: [
          {
            index: true,
            path: "profile",
            element: <Profile />,
          },
          {
            path: "bookings",
            element: <Bookings />,
          },
          {
            path: "bookings/:bookingId",
            element: <Booking />,
          },
          {
            path: "places",
            element: <PlacesLayout />,
            children: [
              {
                index: true,
                path: "",
                element: <MyPlaces />,
              },
              {
                path: "new",
                element: <NewPlaceForm />,
              },
              {
                path: ":placeId/edit",
                element: <EditPlaceForm />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
