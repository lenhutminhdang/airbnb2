/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import MyPlacesList from "../../../components/Places/PlacesList";
import { useEffect, useState } from "react";
import ToggleViewButton from "../../../components/UI/ToggleViewButton";

export default function MyPlaces() {
  const [view, setView] = useState("grid");

  const toggleView = () => {
    setView((prevView) => {
      if (prevView === "list") {
        localStorage.setItem("myPlacesView", "grid");
        return "grid";
      }

      localStorage.setItem("myPlacesView", "list");
      return "list";
    });
  };

  useEffect(() => {
    const _view = localStorage.getItem("myPlacesView");
    if (_view && (_view === "list" || _view === "grid")) {
      setView(localStorage.getItem("myPlacesView"));
    }
  }, []);

  return (
    <div className="px-4 md:mx-20 lg:mx-52">
      {/* Add new place button */}
      <div className="flex justify-between items-center mb-5">
        <Link
          className="inline-flex gap-1 py-2 px-6 bg-primary text-white rounded-full"
          to="new"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>

        <ToggleViewButton view={view} onClick={toggleView} />
      </div>

      {/* My places list */}
      <MyPlacesList view={view} />
    </div>
  );
}
