import { useReviewModal } from '../../../context/AppContext';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import StarRating from '../StarRating/StarRating';
import styles from './ReviewCard.module.css';

const ReviewCard = ({ review }) => {
  const { openReview } = useReviewModal();

  return (
    <Card>
      <div className={styles.head}>
        <div className={styles.avatar}>
          <img src={review.author.image} alt={review.author.name} />
        </div>
        <div className={styles.author}>
          <div className={styles.authorDesc}>
            <h3>{review.author.name}</h3>
            <p>{review.author.position}</p>
          </div>
          <div className={styles.rating}>
            <StarRating rating={review.author.rate} />
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <p>{review.text}</p>
      </div>
      <Button
        fullWidth
        variant="ghost"
        text="Читать весь отзыв"
        className="center"
        onClick={() => openReview(review)}
      />
    </Card>
  );
};

export default ReviewCard;
