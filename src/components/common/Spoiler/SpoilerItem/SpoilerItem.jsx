import { useEffect, useRef, useState } from "react";
import { BtnArrow } from "../../../../assets/icons";
import styles from "./SpoilerItem.module.css";

const SpoilerItem = ({ id, title, children, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, children]);

  return (
    <div className={styles.spoilerItem} data-id={id}>
      <button
        className={`${styles.spoilerBtn} ${isOpen ? styles.open : ""}`}
        onClick={() => onClick(id)}
        aria-expanded={isOpen}
      >
        <div className={styles.title}>
          <h3>{title}</h3>
          <BtnArrow width={28} height={28} />
        </div>
        <div
          className={styles.spoilerContentWrapper}
          style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px" }}
        >
          <div
            ref={contentRef}
            className={`${styles.spoilerContent} ${isOpen ? styles.open : ""}`}
          >
            {children.map((item, index) => (
              <p key={index}>{item.text}</p>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
};

export default SpoilerItem;
