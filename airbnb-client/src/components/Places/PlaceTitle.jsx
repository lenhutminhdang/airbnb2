/* eslint-disable react/prop-types */
const locationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-5"
  >
    <path
      fillRule="evenodd"
      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function PlaceTitle({ data }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p className="flex gap-1 items-end">
        <a
          href={`https://maps.google.com/?q=${data.address}`}
          target="_black"
          className="font-semibold underline"
          style={{ textDecorationThickness: "2px" }}
        >
          {data.address}
        </a>
        {locationIcon}
      </p>
    </div>
  );
}
