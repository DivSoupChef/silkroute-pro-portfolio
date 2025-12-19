import {
  useGalleryModal,
  useNotification,
  useReviewModal,
} from "../../../context/AppContext";
import GalleryModal from "./GalleryModal/GalleryModal";
import styles from "./Modal.module.css";
import NotificationModal from "./NotificationModal/NotificationModal";
import ReviewModal from "./ReviewModal/ReviewModal";

const Modal = () => {
  const { isOpen: isGalleryOpen, closeGallery } = useGalleryModal();
  const { isOpen: isNotificationOpen, closeNotification } = useNotification();
  const { isOpen: isReviewOpen, closeReview } = useReviewModal();

  const getActiveModal = () => {
    if (isGalleryOpen) return "gallery";
    if (isNotificationOpen) return "notification";
    if (isReviewOpen) return "review";
  };

  const activeModal = getActiveModal();

  const getCloseHandler = () => {
    switch (activeModal) {
      case "gallery":
        return closeGallery;
      case "notification":
        return closeNotification;
      case "review":
        return closeReview;
      default:
        return () => {};
    }
  };

  const closeHandler = getCloseHandler();

  return (
    <div
      className={`${styles.modalOverlay} ${activeModal ? styles.active : ""}`}
      onClick={closeHandler}
    >
      <div
        className={`${styles.modal} ${
          activeModal === "notification" ? styles.notification : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {activeModal === "gallery" && (
          <GalleryModal closeModal={closeHandler} />
        )}
        {activeModal === "notification" && (
          <NotificationModal closeModal={closeHandler} />
        )}
        {activeModal === "review" && <ReviewModal closeModal={closeHandler} />}
      </div>
    </div>
  );
};

export default Modal;
