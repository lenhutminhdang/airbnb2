import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-center bg-red-100">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl">Not Found</h1>
        <p className="text-xl md:text-3xl">
          Something went wrong. Please try again!
        </p>
        <Link
          to="/"
          className="self-center text-xl md:text-3xl text-red-500 bg-red-50 px-6 py-3 rounded-xl"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
