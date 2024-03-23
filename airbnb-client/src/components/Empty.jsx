export default function Empty({ label }) {
  return (
    <div className="w-full h-[30vh] flex justify-center items-center">
      <p className="text-lg text-gray-600">Your {label} are empty</p>
    </div>
  );
}
