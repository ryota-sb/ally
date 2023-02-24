const Female = ({ size = 100, color = "#ee82ee" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-gender-female"
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
      <path d="M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
      <path d="M12 14v7"></path>
      <path d="M9 18h6"></path>
    </svg>
  );
};

export default Female;
