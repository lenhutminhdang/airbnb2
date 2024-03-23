export default function Input({ title, description, ...props }) {
  return (
    <div>
      {title?.trim() && <h2 className="text-2xl">{title}</h2>}
      {description?.trim() && (
        <p className="text-base sm:text-sm text-gray-500">{description}</p>
      )}
      <input {...props} required />
    </div>
  );
}
