/* eslint-disable react/prop-types */
const deletingIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 absolute top-1 right-1 text-white bg-[#0000002a] rounded-full"
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

const starIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 absolute bottom-1 left-1 text-yellow-300 rounded-full"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function PhotosUploader({
  formData,
  onInputChange,
  onUploadPhotoByLink,
  onUploadPhoto,
  onDeletePhoto,
  onChangeThumbnail,
}) {
  return (
    <div>
      <h2 className="text-3xl md:text-2xl">Photos</h2>
      <p className="text-base sm:text-sm text-gray-500">
        Upload at least 5 images (maximum of 16 images)
      </p>
      {/* Upload by link */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add image using a link (image URL)"
          name="photoLink"
          value={formData.photoLink}
          onChange={onInputChange}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onUploadPhotoByLink();
          }}
          className="bg-gray-600 hover:bg-primary p-2 my-1 min-w-32 text-white rounded-lg"
        >
          Add&nbsp;photo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 items-stretch gap-2 mt-2">
        {/* Preview Images */}
        {formData.photos.length > 0 &&
          formData.photos.map((photoLink, index) => (
            <div
              key={photoLink}
              className="relative aspect-video object-contain overflow-hidden rounded-md"
            >
              <img
                src={photoLink}
                alt="photo"
                className="peer w-full h-full object-cover object-center hover:scale-110 duration-300 cursor-pointer"
                onClick={() => onChangeThumbnail(photoLink)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDeletePhoto(photoLink);
                }}
              >
                {deletingIcon}
              </button>
              {index === 0 && starIcon}
              {index !== 0 && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-8 peer-hover:translate-y-0 hover:translate-y-0 invisible peer-hover:visible hover:visible w-max text-center tracking-wider duration-300 text-white text-sm uppercase font-semibold text-shadow-sm">
                  Set as Thumbnail
                </span>
              )}
            </div>
          ))}

        {/* Upload by device functionality */}
        <label className="inline-flex justify-center items-center py-10 gap-2 rounded-md border border-gray-600 bg-transparent hover:bg-red-50 text-2xl cursor-pointer aspect-video">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onUploadPhoto}
          />
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
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
}
