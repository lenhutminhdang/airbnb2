/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function FormWrapper({ children, type = "login", onSubmit }) {
  let content = (
    <>
      Don&#39;t have an account yet?{" "}
      <Link to="/signup" className="text-blue-600 underline">
        Sign up now
      </Link>
    </>
  );

  // for signup form
  if (type !== "login")
    content = (
      <>
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login now
        </Link>
      </>
    );

  return (
    <div className="grow flex items-center justify-center mt-8">
      <div className="mb-auto">
        <h1 className="text-4xl text-center capitalize">{type}</h1>
        <form onSubmit={onSubmit} className="max-w-md mx-auto p-6">
          {children}
          <button className="primary !p-4 capitalize">{type}</button>
          <div className="mt-6 text-lg sm:text-base text-center text-gray-600">
            {content}
          </div>
        </form>
      </div>
    </div>
  );
}
