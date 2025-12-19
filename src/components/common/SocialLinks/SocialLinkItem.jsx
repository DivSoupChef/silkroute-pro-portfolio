import { memo } from 'react';
import { TelegramIcon, WeChatIcon } from '../../../assets/icons';
import styles from './SocialLinks.module.css';

const iconComponents = {
  TelegramIcon,
  WeChatIcon,
};

const SocialLinkItemComponent = ({
  id,
  name,
  url,
  icon,
  text,
  variant = 'default', // 'default', 'icons-only', 'text-only'
  className = '',
}) => {
  const IconComponent = iconComponents[icon];

  const renderContent = () => {
    switch (variant) {
      case 'icons-only':
        return (
          <>
            <IconComponent className={styles.icon} aria-label={name || text} />
            <span className="visually-hidden">{text}</span>
          </>
        );

      case 'text-only':
        return <span className={styles.text}>{text}</span>;

      default:
        return (
          <>
            {IconComponent && <IconComponent className={styles.icon} aria-hidden="true" />}
            <span className={styles.text}>{text}</span>
          </>
        );
    }
  };

  return (
    <a
      href={url}
      className={`${styles.socialLink} ${styles[variant]} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text || `Ссылка на ${name}`}
      data-social={id}>
      {renderContent()}
    </a>
  );
};

export const SocialLinkItem = memo(SocialLinkItemComponent);
