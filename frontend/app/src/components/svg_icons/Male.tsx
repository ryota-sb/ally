const Male = ({ size = 100, color = "#1e90ff" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-gender-male"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
      <path d="M19 5l-5.4 5.4"></path>
      <path d="M19 5h-5"></path>
      <path d="M19 5v5"></path>
    </svg>
  );
};

export default Male;
