/* eslint-disable react/prop-types */
export default function Button({
  name,
  clickHandler,
  className = "",
  ...props
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        clickHandler();
      }}
      className={className}
      {...props}
    >
      {name}
    </button>
  );
}
