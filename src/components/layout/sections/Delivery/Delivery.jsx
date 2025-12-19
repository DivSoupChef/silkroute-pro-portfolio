import { useEffect, useState } from 'react';
import Title from '../../../common/Title/Title';
import styles from './Delivery.module.css';
import { mockApi } from '../../../../api/mockApi';
import Card from '../../../common/Card/Card';
import Button from '../../../common/Button/Button';
import { useScroll } from '../../../../hooks/useScroll';

const Delivery = ({ container }) => {
  const [typeDelivery, setTypeDelivery] = useState([]);
  const scrollToSection = useScroll(100);

  const handleNavClick = sectionId => {
    scrollToSection(sectionId, 15);
  };

  const fetchDelivry = async () => {
    try {
      const response = await mockApi.getDelivery();

      setTypeDelivery(response.data);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchDelivry();
  }, []);

  return (
    <section className={styles.delivery}>
      <div className={styles[container]}>
        <Title title="Доставим быстро и удобно" subtitle="Виды доставки" />
        <div className={styles.list}>
          {typeDelivery.map((item, index) => (
            <Card align="center" key={index}>
              <div className={styles.head}>
                <item.icon width={48} height={48} />
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
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

export default Delivery;
