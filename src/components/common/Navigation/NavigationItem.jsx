import NavigationLink from './NavigationLink';
import styles from './Navigation.module.css';

const NavigationItem = ({
  item,
  onClick,
  className = '',
  linkClassName = '',
  showIcon = false,
  iconPosition = 'left',
}) => {
  const handleClick = () => {
    if (onClick && item.id) {
      onClick(item.id);
    }
  };

  return (
    <li className={`${styles.item} ${className}`}>
      <NavigationLink
        id={item.id}
        label={item.label}
        icon={item.icon}
        href={item.href}
        onClick={handleClick}
        className={linkClassName}
        showIcon={showIcon}
        iconPosition={iconPosition}
        external={item.external}
      />
    </li>
  );
};

export default NavigationItem;
