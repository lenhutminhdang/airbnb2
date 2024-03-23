/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import PlaceGridItem from "./PlaceGridItem";
import PlaceItem from "./PlaceItem";
import { Link } from "react-router-dom";
import Empty from "../Empty";

export default function PlacesList({ view }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  if (places.length === 0) return <Empty label="accommodations" />;

  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {places.map((place) => {
          return (
            <Link to={`${place._id}/edit`} key={place._id}>
              <PlaceGridItem place={place} />
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {places.map((place) => {
        return (
          <Link to={`${place._id}/edit`} key={place._id} className="shrink-0">
            <PlaceItem key={place._id} place={place} />
          </Link>
        );
      })}
    </div>
  );
}
