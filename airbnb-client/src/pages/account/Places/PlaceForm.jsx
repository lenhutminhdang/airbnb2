import { useEffect, useReducer } from "react";
import Input from "../../../components/Form/Input";
import TextArea from "../../../components/Form/TextArea";
import axios from "axios";
import PhotosUploader from "../../../components/Form/PhotosUploader";
import PerksCheckBox from "../../../components/Form/PerksCheckbox";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

import { storage } from "../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { isImageUrl } from "../../../utils/utils";

const initialState = {
  title: "",
  address: "",
  photoLink: "",
  photos: [],
  description: "",
  perks: [],
  extraInfo: "",
  info: {
    checkInTime: "",
    checkOutTime: "",
    maxGuests: 1,
    price: 0,
  },
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "ADD_PERK":
      return {
        ...state,
        perks: [...state.perks, action.perk],
      };

    case "REMOVE_PERK":
      return {
        ...state,
        perks: [...state.perks].filter((perk) => perk !== action.perk),
      };

    case "UPDATE_INFO":
      return {
        ...state,
        info: {
          ...state.info,
          [action.field]: action.value,
        },
      };

    case "ADD_PHOTO": {
      if (state.photos.length > 16)
        alert("Too many images. Please upload a maximum of 16 images!");

      if (state.photos.length <= 16) {
        return {
          ...state,
          photos: [...state.photos, action.photo],
          photoLink: "",
        };
      }
      break;
    }

    case "DELETE_PHOTO": {
      const filteredPhotos = state.photos.filter(
        (photo) => photo !== action.photoName
      );
      return {
        ...state,
        photos: filteredPhotos,
      };
    }

    case "CHANGE_THUMBNAIL": {
      const photosArr = [...state.photos];

      let temp = photosArr[0];
      photosArr[0] = photosArr[action.photoIndex];
      photosArr[action.photoIndex] = temp;

      return {
        ...state,
        photos: photosArr,
      };
    }

    case "UPDATE_ALL":
      return {
        ...state,
        ...action.data,
        info: {
          checkInTime: action.data.checkIn,
          checkOutTime: action.data.checkOut,
          maxGuests: action.data.maxGuests,
          price: action.data.price,
        },
      };

    default:
      return state;
  }
};

export default function PlaceEdit() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleTogglePerk = (e) => {
    if (e.target.checked) {
      dispatch({ type: "ADD_PERK", perk: e.target.name });
    } else {
      dispatch({ type: "REMOVE_PERK", perk: e.target.name });
    }
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_INFO", field: name, value });
  };

  const handleUploadPhotoByLink = () => {
    if (!state.photoLink || state.photoLink === "") return;
    const imageUrl = isImageUrl(state.photoLink);

    if (!imageUrl) {
      alert("Your link is not a valid link, try image link instead.");
      return;
    }

    dispatch({ type: "ADD_PHOTO", photo: state.photoLink });
  };

  const handleUploadPhoto = async (e) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const img = files[i];

      if (!img) return;

      const date = format(new Date(), "dd-MM-yyyy");
      const filename = v4() + "-" + date;
      const imageRef = ref(storage, `images/${filename}`);

      await uploadBytes(imageRef, img);
      const url = await getDownloadURL(imageRef);
      dispatch({ type: "ADD_PHOTO", photo: url });
    }
  };

  const handleChangeThumbnail = (photoName) => {
    const photoIndex = state.photos.findIndex((photo) => photo === photoName);
    if (photoIndex === -1 || photoIndex === 0) return;

    dispatch({ type: "CHANGE_THUMBNAIL", photoIndex });
  };

  const handleDeletePhoto = (photoName) => {
    dispatch({ type: "DELETE_PHOTO", photoName });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.photos.length < 5) {
      alert("Please upload at least 5 photos.");
      return;
    }

    const placeData = {
      title: state.title,
      address: state.address,
      photos: state.photos,
      description: state.description,
      perks: state.perks,
      extraInfo: state.extraInfo,
      checkIn: state.info.checkInTime,
      checkOut: state.info.checkOutTime,
      maxGuests: +state.info.maxGuests,
      price: +state.info.price,
    };

    // Add new place
    try {
      if (placeId) {
        await axios.put("/places", { ...placeData, placeId });
      } else {
        await axios.post("/places", placeData);
      }
    } catch (error) {
      console.error(error);
    }
    navigate("/account/places");
  };

  useEffect(() => {
    if (!placeId) return;

    axios.get(`/places/${placeId}`).then((response) => {
      const { data } = response;

      dispatch({ type: "UPDATE_ALL", data });
    });
  }, [placeId]);

  return (
    <div>
      {/* FORM */}
      <div className="mx-4 sm:mx-10 md:mx-20">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-xl flex flex-col gap-4 p-4"
        >
          {/* Title */}
          <Input
            title="Title"
            description="Title for your place, should be short and catchy as in
              advertisement"
            name="title"
            placeholder="My title"
            type="text"
            minLength="4"
            maxLength="100"
            value={state.title}
            onChange={handleInputChange}
          />
          {/* Address */}
          <Input
            title="Address"
            description="Address to this place"
            name="address"
            placeholder="123, street abc"
            type="text"
            maxLength="50"
            value={state.address}
            onChange={handleInputChange}
          />
          {/* Photos Uploader */}
          <PhotosUploader
            formData={state}
            onInputChange={handleInputChange}
            onUploadPhotoByLink={handleUploadPhotoByLink}
            onUploadPhoto={handleUploadPhoto}
            onDeletePhoto={handleDeletePhoto}
            onChangeThumbnail={handleChangeThumbnail}
          />

          {/* Description */}
          <TextArea
            title="Description"
            description="Description of the place"
            name="description"
            maxLength="2000"
            required
            value={state.description}
            onChange={handleInputChange}
          />
          {/* Perks */}
          <PerksCheckBox formData={state} onTogglePerk={handleTogglePerk} />

          {/* Extra info */}
          <TextArea
            title="Extra information"
            description="House rule, etc"
            name="extraInfo"
            maxLength="2000"
            value={state.extraInfo}
            onChange={handleInputChange}
          />

          {/* Info: checkin & out, max guests, price */}
          <div>
            <h2 className="text-3xl md:text-2xl">
              Check in & out times, max guests, price
            </h2>
            <p className="text-base sm:text-sm text-gray-500">
              Add check in & out times, remember to have some times window for
              cleaning the room between guests
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="mt-2">
                <h3 className="text-lg sm:text-base">Check in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  name="checkInTime"
                  value={state.info.checkInTime}
                  onChange={handleInfoChange}
                  required
                  maxLength="20"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-lg sm:text-base">Check out time</h3>
                <input
                  type="text"
                  placeholder="12:00"
                  name="checkOutTime"
                  value={state.info.checkOutTime}
                  onChange={handleInfoChange}
                  required
                  maxLength="20"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-lg sm:text-base">Max guests</h3>
                <input
                  type="number"
                  placeholder="2"
                  name="maxGuests"
                  max="100"
                  value={state.info.maxGuests}
                  onChange={handleInfoChange}
                  required
                />
              </div>
              <div className="mt-2">
                <h3 className="text-lg sm:text-base">Price per night (USD)</h3>
                <input
                  type="number"
                  placeholder="10"
                  name="price"
                  value={state.info.price}
                  onChange={handleInfoChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button className="primary text-xl !my-10 !p-4 sm:max-w-36 self-center font-bold">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
