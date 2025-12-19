import { useState, useEffect, useCallback } from 'react';

//  Хук для отслеживания размеров элемента с троттлингом
//  @param {React.RefObject} ref - Ref элемента
//  @param {number} throttleDelay - Задержка троттлинга в мс (по умолчанию 100)
//  @returns {Object} Размеры элемента { width, height }

export const useElementSize = (ref, throttleDelay = 100) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const updateSize = useCallback(() => {
    if (ref.current) {
      const { offsetWidth: width, offsetHeight: height } = ref.current;
      setSize({ width, height });
    }
  }, [ref]);

  useEffect(() => {
    updateSize();

    let timeoutId;
    const throttledUpdateSize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(updateSize, throttleDelay);
    };

    let resizeObserver;
    if (ref.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(throttledUpdateSize);
      resizeObserver.observe(ref.current);
    } else {
      window.addEventListener('resize', throttledUpdateSize);
    }
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateSize();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', throttledUpdateSize);
      }

      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [ref, updateSize, throttleDelay]);

  return size;
};
