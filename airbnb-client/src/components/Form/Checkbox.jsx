export default function CheckBox({ children, name, label, ...props }) {
  return (
    <label
      htmlFor={name}
      className="border p-4 rounded-md flex items-center gap-2 cursor-pointer "
    >
      <input type="checkbox" name={name} id={name} {...props} />
      <span>{children}</span>
      <span>{label}</span>
    </label>
  );
}
