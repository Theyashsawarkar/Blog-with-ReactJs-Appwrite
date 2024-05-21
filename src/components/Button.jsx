/* eslint-disable react/prop-types */
export default function Button({
  name,
  clickHandler = () => {},
  className = "",
  shouldPreventDefault = true,
  ...props
}) {
  return (
    <button
      onClick={(e) => {
        shouldPreventDefault ? e.preventDefault() : null;
        clickHandler();
      }}
      className={className}
      {...props}
    >
      {name}
    </button>
  );
}
