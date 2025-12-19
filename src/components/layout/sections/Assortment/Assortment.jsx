import { useEffect, useState } from 'react';
import Title from '../../../common/Title/Title';
import styles from './Assortment.module.css';
import { mockApi } from '../../../../api/mockApi';
import { AssortmentListSkeleton } from '../../../common/Skeleton/Skeleton';
import Button from '../../../common/Button/Button';
import Card from '../../../common/Card/Card';
import { useGalleryModal } from '../../../../context/AppContext';

const Assortment = ({ container }) => {
  const [assortment, setAssortment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { openGallery } = useGalleryModal();

  const fetchAssortment = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await mockApi.getAssortment();
      setAssortment(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssortment();
  }, []);

  const handleOpenGallery = item => {
    if (item.gallery && Array.isArray(item.gallery)) {
      openGallery(item.gallery, item.title);
    }
  };

  return (
    <section className={styles.assortment} name="assortment" id="assortment">
      <div className={styles[container]}>
        <Title title="Предлагаем следующие категории товаров" subtitle="Ассортимент" />
        {loading ? (
          <AssortmentListSkeleton count={6} />
        ) : (
          <div className={styles.itemList}>
            {assortment.map(item => (
              <Card animated padding="medium" hoverable key={item.id}>
                <div className={styles.image}>
                  <img src={item.image} alt="" />
                </div>
                <div className={styles.box}>
                  <div className={styles.textContent}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                  <Button variant="ghost" text="Подробнее" endIcon="arrow" fullWidth className="gapAuto" onClick={() => handleOpenGallery(item)} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Assortment;
