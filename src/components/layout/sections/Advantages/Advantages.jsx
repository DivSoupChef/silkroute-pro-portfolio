import { useEffect, useState } from 'react';
import Title from '../../../common/Title/Title';
import styles from './Advantages.module.css';
import { mockApi } from '../../../../api/mockApi';
import Card from '../../../common/Card/Card';
import Button from '../../../common/Button/Button';
import { useScroll } from '../../../../hooks/useScroll';

const Advantages = ({ container }) => {
  const [advantages, setAdvantages] = useState([]);
  const scrollToSection = useScroll(100);

  const handleNavClick = sectionId => {
    scrollToSection(sectionId, 15);
  };

  const fetchAdvantages = async () => {
    try {
      const response = await mockApi.getAdvantages();
      setAdvantages(response.data);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchAdvantages();
  }, []);

  return (
    <section className={styles.advantages}>
      <div className={styles[container]}>
        <Title subtitle="Преимущества" title="Работая с нами, вы получаете" />
        <div className={styles.itemList}>
          {advantages.map((advantage, index) => (
            <Card align="center" key={index}>
              <div className={styles.title}>
                <advantage.icon width={48} height={48} />
                <h3>{advantage.title}</h3>
              </div>
              <p>{advantage.description}</p>
            </Card>
          ))}
        </div>
        <Button
          onClick={() => handleNavClick('contacts')}
          variant="primary"
          size="large"
          text="Получить консультацию"
        />
      </div>
    </section>
  );
};

export default Advantages;
