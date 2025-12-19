import { memo } from 'react';
import NavigationItem from './NavigationItem';
import styles from './Navigation.module.css';

const NavigationListComponent = ({
  items,
  onItemClick,
  direction = 'horizontal', // 'horizontal' | 'vertical'
  className = '',
  itemClassName = '',
  linkClassName = '',
  showIcons = false,
  iconPosition = 'left', // 'left' | 'right'
}) => {
  const containerClass = `${styles.navigationList} ${styles[direction]} ${styles[className]}`;

  return (
    <nav className={containerClass} aria-label="Основная навигация">
      <ul className={styles.list}>
        {items.map(item => (
          <NavigationItem
            key={item.id}
            item={item}
            onClick={onItemClick}
            className={itemClassName}
            linkClassName={linkClassName}
            showIcon={showIcons}
            iconPosition={iconPosition}
          />
        ))}
      </ul>
    </nav>
  );
};

export const NavigationList = memo(NavigationListComponent);
