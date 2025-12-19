import { CloseIcon, SuccessIcon } from "../../../../assets/icons";
import { useNotification } from "../../../../context/AppContext";
import styles from "./NotificationModal.module.css";

const NotificationModal = ({ closeModal }) => {
  const { message } = useNotification();

  return (
    <div className={styles.notificationModal}>
      <div onClick={closeModal} className={styles.closeModal}>
        <CloseIcon />
      </div>
      <div className={styles.modalHead}>
        <SuccessIcon />
        <h3>Спасибо, ваша заявка принята</h3>
      </div>
      <p className={styles.notificationModalMsg}>{message}</p>
    </div>
  );
};

export default NotificationModal;
