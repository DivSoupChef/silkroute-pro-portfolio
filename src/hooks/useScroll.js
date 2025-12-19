import { useCallback } from 'react';
import { scroller } from 'react-scroll';

//  Хук для плавного скролла с учетом высоты хедера
//  @param {number} headerHeight - Высота фиксированного хедера
//  @returns {Function} Функция для скролла к секции

export const useScroll = (headerHeight = 0) => {
  const scrollToSection = useCallback(
    (sectionId, additionalOffset = 0) => {
      const totalOffset = headerHeight + additionalOffset;

      scroller.scrollTo(sectionId, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -totalOffset,
      });
    },
    [headerHeight],
  );

  return scrollToSection;
};
