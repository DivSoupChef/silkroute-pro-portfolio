import StarIcon from "./StarIcon";

const StarIconHalf = ({ gradientId, fillPercentage }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id={gradientId}>
        <stop offset={`${fillPercentage}%`} stopColor="#F59E0B" />
        <stop offset={`${fillPercentage}%`} stopColor="#E5E7EB" />
      </linearGradient>
    </defs>
    <StarIcon gradientId={gradientId} />
  </svg>
);

export default StarIconHalf;
