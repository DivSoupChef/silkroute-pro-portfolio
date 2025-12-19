import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Title from '../../../common/Title/Title';
import styles from './Stages.module.css';
import { mockApi } from '../../../../api/mockApi';
import Card from '../../../common/Card/Card';

const Stages = ({ container }) => {
  const [stages, setStages] = useState([]);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const stepRefs = useRef([]);
  const observerRef = useRef(null);

  const setRef = useCallback(
    index => el => {
      stepRefs.current[index] = el;
    },
    [],
  );

  const fetchStages = async () => {
    try {
      const response = await mockApi.getStages();
      setStages(response.data);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  const updateVisibleCards = useCallback((index, isVisible) => {
    setVisibleCards(prev => {
      const newSet = new Set(prev);
      if (isVisible) {
        newSet.add(index);
      } else {
        newSet.delete(index);
      }
      return newSet;
    });
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1,
    };

    const handleIntersection = entries => {
      requestAnimationFrame(() => {
        entries.forEach(entry => {
          const index = parseInt(entry.target.dataset.index);
          updateVisibleCards(index, entry.isIntersecting);
        });
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    observerRef.current = observer;

    stepRefs.current.forEach((ref, index) => {
      if (ref && ref.dataset) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [stages, updateVisibleCards]);

  const memoizedCards = useMemo(() => {
    return stages.map((stage, index) => {
      const isLeft = index % 2 === 0;

      return (
        <div
          key={index}
          className={`${styles.cardWrapper} ${isLeft ? styles.wrapperLeft : styles.wrapperRight}`}
          ref={setRef(index)}
          data-index={index}>
          <Card className={visibleCards.has(index) ? "active" : "inactive"}>
            <div className={styles.textContent}>
              <div className={styles.head}>
                <div className={styles.subtitle}>{stage.subtitle}</div>
                <h3>{stage.title}</h3>
              </div>
              <p className={styles.description}>{stage.description}</p>
              {stage.list && (
                <ul className={styles.list}>
                  {stage.list.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.listItem}>
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>

          <div className={`${styles.timelineDot} ${visibleCards.has(index) ? styles.dotActive : ''}`}></div>
        </div>
      );
    });
  }, [stages, visibleCards, setRef]);

  return (
    <section className={styles.stages} name="stages" id="stages">
      <div className={styles[container]}>
        <Title subtitle="Этапы работы" title="Подробно объясним процесс работы" />
        <div className={styles.stagesContainer}>
          <div className={styles.timeline}></div>
          <div className={styles.stagesCards}>{memoizedCards}</div>
        </div>
      </div>
    </section>
  );
};

export default Stages;
