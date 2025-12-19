import { useState } from "react";
import styles from "./Spoiler.module.css";
import SpoilerGroup from "./SpoilerGroup/SpoilerGroup";

const Spoiler = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState(allowMultiple ? [] : null);

  const oddItems = items.filter((item) => item.id % 2 !== 0);
  const evenItems = items.filter((item) => item.id % 2 === 0);

  const handleToggle = (id) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev === id ? null : id));
    }
  };

  return (
    <div className={styles.spoilers}>
      <SpoilerGroup
        title="Нечетные элементы"
        items={oddItems}
        openItems={openItems}
        onToggle={handleToggle}
        allowMultiple={allowMultiple}
      />
      <SpoilerGroup
        title="Четные элементы"
        items={evenItems}
        openItems={openItems}
        onToggle={handleToggle}
        allowMultiple={allowMultiple}
      />
    </div>
  );
};

export default Spoiler;
