/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gallery from "../components/Places/Gallery";
import BookingModal from "../components/BookingModal";
import PlaceInfo from "../components/Places/PlaceInfo";
import PlaceTitle from "../components/Places/PlaceTitle";
import Loader from "../components/Loader";

const getWordsBy = (text, delimiter = / /) => {
  if (typeof text !== "string") return [];

  return text.split(delimiter);
};

const arrayToString = (arr, end, seperator) =>
  arr.slice(0, end).join(seperator);

const calculateDisplayWords = (text) => {
  if (typeof text !== "string") return "";

  if (text.length < 50) return text;

  const words = getWordsBy(text, " ");
  const wordsByBreakSpace = getWordsBy(text, "\n");

  if (wordsByBreakSpace.length > 5) {
    return arrayToString(wordsByBreakSpace, 4, "\n");
  }
  if (words.length > 50) {
    return arrayToString(words, 40, " ");
  }
  return arrayToString(words, words.length, " ");
};

function DescriptionDetails({ title, text }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!text || text.trim() === "") return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {showFullDescription && (
        <p
          className="text-gray-600 leading-7"
          style={{ whiteSpace: "pre-line" }}
        >
          {text}
        </p>
      )}
      {!showFullDescription && (
        <p
          className="text-gray-600 leading-7"
          style={{ whiteSpace: "pre-line" }}
        >
          {calculateDisplayWords(text)}
        </p>
      )}
      <button
        onClick={toggleDescription}
        className="bg-blue-500 text-white font-bold py-1 px-3 rounded mt-2"
      >
        {showFullDescription ? "Collapse <<<" : "Show more >>>"}
      </button>
    </div>
  );
}

export default function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [showModalForm, setShowModalForm] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!placeId) return null;
    setPageLoading(true);

    axios.get(`/places/${placeId}`).then((response) => {
      const { data } = response;
      setPlace({
        ...data,
      });
      setPageLoading(false);
    });
    setPageLoading(false);
  }, [placeId]);

  if (pageLoading) return <Loader />;

  return (
    <div className="mx-auto container py-6 px-4 lg:px-10 xl:px-20">
      <PlaceTitle data={place} />

      {place?.photos?.length > 0 && <Gallery photos={place.photos} />}

      <div className="mt-6">
        {/* Info */}
        <PlaceInfo
          data={place}
          onShowModal={() => {
            setShowModalForm(true);
            // Prevent scroll event on page when modal is opening
            document.body.classList.add("overflow-hidden");
          }}
          buttonLabel="Book this place"
        />

        <div className="">
          {/* Description */}
          <DescriptionDetails title="Description" text={place.description} />
          {place.extraInfo && <hr className="mb-6" />}
          {/* Extra Info */}
          <DescriptionDetails title="Extra Info" text={place.extraInfo} />
        </div>
      </div>

      {/* MODAL */}
      <BookingModal
        onCloseModal={() => {
          setShowModalForm(false);
          document.body.classList.remove("overflow-hidden");
        }}
        showModal={showModalForm}
        maxGuests={place.maxGuests}
        price={place.price}
        placeId={place._id}
      />
    </div>
  );
}
