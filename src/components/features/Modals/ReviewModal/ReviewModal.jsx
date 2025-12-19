import { CloseIcon } from "../../../../assets/icons";
import { useReviewModal } from "../../../../context/AppContext";
import StarRating from "../../StarRating/StarRating";
import styles from "./ReviewModal.module.css";

const ReviewModal = ({ closeModal }) => {
  const { reviewData } = useReviewModal();

  const author = reviewData.author || {};
  const authorImage = author.image || "";
  const authorName = author.name || "";
  const authorPosition = author.position || "";
  const authorRate = author.rate || "";
  const text = reviewData.text || "";

  return (
    <div className={styles.reviewModal}>
      <div onClick={closeModal} className={styles.closeModal}>
        <CloseIcon />
      </div>
      <div className={styles.head}>
        {authorImage && (
          <div className={styles.avatar}>
            <img src={authorImage} alt={authorName} />
          </div>
        )}
        <div className={styles.author}>
          <div className={styles.authorDesc}>
            {authorName && <h3>{authorName}</h3>}
            {authorPosition && <p>{authorPosition}</p>}
            {authorRate && <StarRating rating={authorRate} />}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {text && <p className={styles.fullText}>{text}</p>}
      </div>
    </div>
  );
};

export default ReviewModal;
