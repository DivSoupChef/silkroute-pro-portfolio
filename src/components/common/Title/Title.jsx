import styles from "./Title.module.css";

const Title = ({ title, subtitle }) => {
  return (
    <div className={styles.title}>
      <div>{subtitle}</div>
      <h2>{title}</h2>
    </div>
  );
};

export default Title;
