import SpoilerItem from "../SpoilerItem/SpoilerItem";
import styles from "./SpoilerGroup.module.css";

const SpoilerGroup = ({ items, openItems, onToggle, allowMultiple }) => {
  return (
    <div className={styles.spoilerGroup}>
      {items.map((item, index) => (
        <SpoilerItem
          key={index}
          id={item.id}
          title={item.title}
          isOpen={
            allowMultiple ? openItems.includes(item.id) : openItems === item.id
          }
          onClick={onToggle}
        >
          {item.description}
        </SpoilerItem>
      ))}
    </div>
  );
};

export default SpoilerGroup;
