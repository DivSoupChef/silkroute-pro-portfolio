import { Logo, TelegramIcon, WeChatIcon } from '../../../assets/icons';
import { NAV_ITEMS } from '../../../constants/navigation';
import { useScroll } from '../../../hooks/useScroll';
import { NavigationList } from '../../common/Navigation/NavigationList';
import styles from './Footer.module.css';

const Footer = ({ container }) => {
  const scrollToSection = useScroll(70);

  const handleNavClick = sectionId => {
    scrollToSection(sectionId, 15);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles[container]}>
        <div className={styles.footerHead}>
          <Logo />
          <NavigationList items={NAV_ITEMS} onItemClick={handleNavClick} direction="horizontal" className="footerNav" />
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerInfo}>
            <div>@ 2025 · SilkRoute Pro</div>
            <a href="#">Политика конфиденциальности</a>
          </div>
          <ul className={styles.listItems}>
            <li className={styles.listItem}>
              <a href="#" className={styles.listItemLink}>
                <WeChatIcon />
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.listItemLink}>
                <TelegramIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
