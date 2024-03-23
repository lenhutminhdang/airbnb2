import axios from "axios";
import { useEffect, useState } from "react";
import PlaceGridItem from "../components/Places/PlaceGridItem";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios.get("/places").then((res) => {
      setPlaces(res.data);
      setIsLoading(false);
    });

    setIsLoading(false);
  }, []);

  if (isLoading) return <Loader />;
  if (!isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mx-6 sm:mx-10 md:mx-20 mt-10">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link to={`places/${place._id}`} key={place._id}>
                <PlaceGridItem place={place} />
              </Link>
            );
          })}
      </div>
    );
  }
}
