import { useRef } from 'react';
import { NAV_ITEMS } from '../../../constants/navigation';

import { CloseIcon, Logo, MenuIcon } from '../../../assets/icons';
import { NavigationList } from '../../common/Navigation/NavigationList';
import { ContactInfo } from '../../common/ContactInfo/ContactInfo';
import MobileNav from './MobileNav/MobileNav';

import styles from './Header.module.css';
import { useMenu } from '../../../hooks/useMenu';
import { useElementSize } from '../../../hooks/useElementSize';
import { useScroll } from '../../../hooks/useScroll';

const Header = ({ container }) => {
  const headerRef = useRef(null);
  const { isOpen, toggleMenu, closeMenu } = useMenu();
  const { height: headerHeight } = useElementSize(headerRef);
  const scrollToSection = useScroll(headerHeight);

  const handleNavClick = sectionId => {
    closeMenu();

    scrollToSection(sectionId, 15);
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles[container]}>
        <div className={styles.headerLogo}>
          <Logo />
        </div>

        {/* Десктопная навигация */}
        <NavigationList items={NAV_ITEMS} onItemClick={handleNavClick} direction="horizontal" className="desktopNav" />

        <div className={styles.mobileWrapp}>
          <ContactInfo variant="compact" showIcons={true} className="headerContacts" />

          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isOpen}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <MobileNav isOpen={isOpen} navItems={NAV_ITEMS} onNavItemClick={handleNavClick} headerHeight={headerHeight} />
    </header>
  );
};

export default Header;
