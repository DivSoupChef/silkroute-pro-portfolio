import styles from "./Skeleton.module.css";

export const AssortmentItemSkeleton = () => {
  return (
    <div className={styles.assortmentItem}>
      <div className={styles.assortmentImage}></div>
      <div className={styles.assortmentBox}>
        <div className={styles.assortmentTextContent}>
          <div className={styles.assortmentTitle}></div>
          <div className={styles.assortmentDescription}></div>
          <div className={styles.assortmentDescription}></div>
          <div className={styles.assortmentDescription}></div>
        </div>
        <div className={styles.assortmentBtn}></div>
      </div>
    </div>
  );
};

export const AssortmentListSkeleton = ({ count = 6 }) => (
  <div className={styles.assortmentList}>
    {Array.from({ length: count }).map((_, index) => (
      <AssortmentItemSkeleton key={index} />
    ))}
  </div>
);
