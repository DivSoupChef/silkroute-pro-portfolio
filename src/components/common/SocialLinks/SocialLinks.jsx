import { memo } from 'react';
import { SocialLinkItem } from './SocialLinkItem';
import { SOCIAL_LINKS } from '../../../constants/social';
import styles from './SocialLinks.module.css';

const SocialLinksComponent = ({
  variant = 'default', // 'default' | 'icons-only' | 'text-only'
  direction = 'horizontal', // 'horizontal' | 'vertical'
  className = '',
}) => {
  const links = SOCIAL_LINKS[variant] || SOCIAL_LINKS.default;

  return (
    <div className={`${styles.socialLinks} ${styles[direction]} ${styles[className]}`}>
      {links.map(link => (
        <SocialLinkItem key={link.id} {...link} variant={variant} />
      ))}
    </div>
  );
};

export const SocialLinks = memo(SocialLinksComponent);
