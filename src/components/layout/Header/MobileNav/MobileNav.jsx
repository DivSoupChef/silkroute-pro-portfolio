import { ContactInfo } from '../../../common/ContactInfo/ContactInfo';
import { NavigationList } from '../../../common/Navigation/NavigationList';
import { SocialLinks } from '../../../common/SocialLinks/SocialLinks';
import styles from './MobileNav.module.css';

const MobileNav = ({ isOpen, navItems, headerHeight, onNavItemClick }) => {
  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`} style={{ top: `${headerHeight}px` }}>
      <div className={styles.mobileMenuContent}>
        <NavigationList items={navItems} onItemClick={onNavItemClick} direction="vertical" className="mobileNav" />
        <ContactInfo variant="default" className="mobileNavContacts" />
        <SocialLinks variant="default" direction="vertical" className="mobileNavSocialLinks" />
      </div>
    </div>
  );
};

export default MobileNav;
