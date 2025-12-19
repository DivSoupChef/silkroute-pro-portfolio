import { useId } from "react";
import styles from "./StarRating.module.css";
import { StarIcon, StarIconEmpty, StarIconHalf } from "../StarIcons";

const StarRating = ({ rating, maxStars = 5 }) => {
  const gradientId = useId();

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} />);
    }

    if (hasHalfStar) {
      const fillPercentage = Math.round((rating % 1) * 100);
      stars.push(
        <StarIconHalf
          key="half"
          gradientId={`${gradientId}-half`}
          fillPercentage={fillPercentage}
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIconEmpty key={`empty-${i}`} />);
    }

    return stars;
  };

  return (
    <div
      className={styles.ratingStars}
      role="img"
      aria-label={`Рейтинг: ${rating} из ${maxStars} звезд`}
    >
      {renderStars()}
    </div>
  );
};

export default StarRating;
