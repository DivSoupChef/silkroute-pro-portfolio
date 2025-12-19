import { useEffect, useState } from "react";
import { useGalleryModal } from "../../../../context/AppContext";
import styles from "./GalleryModal.module.css";
import { ArrowNext, ArrowPrev, CloseIcon } from "../../../../assets/icons";

const GalleryModal = ({ closeModal }) => {
  const { images, title } = useGalleryModal();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <div className={styles.modalHead}>
        <h3>{title}</h3>
        <CloseIcon onClick={closeModal} />
      </div>
      <div className={styles.galleryContent}>
        <div className={styles.mainImageWrapp}>
          <div className={styles.imageBox}>
            <img
              src={images[currentIndex]}
              alt={`${title} - ${currentIndex + 1}`}
              className={styles.mainImage}
            />
          </div>
          {images.length > 1 && (
            <div className={styles.thumbnailWrapp}>
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnailButton} ${
                    index === currentIndex ? styles.activeThumbnail : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Перейти к изображению ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`Миниатюра ${index + 1}`}
                    className={styles.thumbnail}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.imageCounter}>
          <div className={styles.btnNavigation}>
            <button
              className={styles.navBtn}
              onClick={handlePrev}
              aria-label="Предыдущее изображение"
            >
              <ArrowPrev />
            </button>
            <div>
              {currentIndex + 1} / {images.length}
            </div>
            <button
              className={styles.navBtn}
              onClick={handleNext}
              aria-label="Следующее изображение"
            >
              <ArrowNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
