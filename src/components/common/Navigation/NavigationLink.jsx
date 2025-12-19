import styles from './Navigation.module.css';

const NavigationLink = ({
  id,
  label,
  icon: Icon,
  href,
  onClick,
  className = '',
  showIcon = false,
  iconPosition = 'left',
  external = false,
  ...props
}) => {
  const linkClass = `${styles.link} ${className}`;

  const content = (
    <>
      {showIcon && Icon && iconPosition === 'left' && <Icon className={styles.icon} aria-hidden="true" />}
      <span className={styles.label}>{label}</span>
      {showIcon && Icon && iconPosition === 'right' && <Icon className={styles.icon} aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={linkClass}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={label}
        {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={linkClass} onClick={onClick} aria-label="label" {...props}>
      {content}
    </button>
  );
};

export default NavigationLink;
