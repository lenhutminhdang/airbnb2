export default function TextArea({ title, description, ...props }) {
  return (
    <div>
      <h2 className="text-3xl md:text-2xl">{title}</h2>
      <p className="text-base sm:text-sm text-gray-500">{description}</p>
      <textarea className="w-full min-h-48" {...props} />
    </div>
  );
}
