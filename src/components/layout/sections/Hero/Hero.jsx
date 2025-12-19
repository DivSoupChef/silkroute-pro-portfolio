import styles from './Hero.module.css';
import Button from '../../../common/Button/Button';
import { heroImage } from '../../../../assets/images';
import { useScroll } from '../../../../hooks/useScroll';

const Hero = ({ container }) => {
  const scrollToSection = useScroll(100);

  const handleNavClick = sectionId => {
    scrollToSection(sectionId, 15);
  };
  return (
    <section className={styles.hero}>
      <div className={styles[container]}>
        <div className={styles.image}>
          <img src={heroImage} alt="Перевозки и поставки товаров из Китая" />
        </div>
        <div className={styles.box}>
          <div className={styles.textContent}>
            <h1>Перевозки и поставки товаров из Китая</h1>
            <div className={styles.description}>
              <p>Подберем и доставим понравившийся товар в любой регион России на выгодных условиях</p>
              <ul className={styles.advantagesList}>
                <li>Без наценок и переплат</li>
                <li>Быстрая доставка</li>
                <li>Напрямую с завода-изготовителя</li>
                <li>Представители в России и Китае</li>
              </ul>
            </div>
          </div>
          <Button onClick={() => handleNavClick("contacts")} variant="primary" size="large" text="Получить консультацию" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
