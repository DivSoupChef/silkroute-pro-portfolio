import { memo } from 'react';
import { EmailIcon, LocationIcon, PhoneIcon } from '../../../assets/icons';
import styles from './ContactInfo.module.css';

const iconComponents = {
  LocationIcon,
  EmailIcon,
  PhoneIcon,
};

const ContactItemComponent = ({ type, value, label, href, icon, showIcon = true, className = '' }) => {
  const IconComponent = icon ? iconComponents[icon] : null;
  const isLink = href && (type === 'email' || type === 'phone' || type === 'website');

  const content = (
    <>
      {showIcon && IconComponent && <IconComponent className={styles.icon} aria-hidden="true" data-type={type} />}
      <span className={styles.value}>{value}</span>
      {label && <span className={styles.label}>{label}</span>}
    </>
  );

  const itemClass = `${styles.contactItem} ${styles[type]} ${className}`;

  if (isLink) {
    const linkProps =
      type === 'email'
        ? { href: `mailto:${value}` }
        : type === 'phone'
        ? { href: `tel:${value.replace(/\D/g, '')}` }
        : { href, target: '_blank', rel: 'noopener noreferrer' };

    return (
      <div>
        <a
          {...linkProps}
          className={styles.link}
          aria-label={`${type === 'phone' ? 'Позвонить по телефону' : 'Написать на email'}: ${value}`}>
          {content}
        </a>
      </div>
    );
  }

  return (
    <div className={itemClass} aria-label={type}>
      {content}
    </div>
  );
};

export const ContactItem = memo(ContactItemComponent);
