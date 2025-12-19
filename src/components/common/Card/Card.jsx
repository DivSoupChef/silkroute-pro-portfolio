import { forwardRef, memo } from 'react';
import styles from './Card.module.css';

/**
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children - Контент карточки
 * @property {boolean} [animated] - Включить анимацию при наведении
 * @property {'left' | 'center' | 'right' | 'justify'} [align] - Выравнивание текста
 * @property {boolean} [disabled] - Неактивное состояние
 * @property {boolean} [interactive] - Интерактивная карточка (курсор pointer)
 * @property {boolean} [bordered] - Добавить границу
 * @property {boolean} [shadow] - Добавить тень
 * @property {boolean} [hoverable] - Эффект при наведении (даже без анимации)
 * @property {'small' | 'medium' | 'large' | 'xlarge'} [padding] - Размер отступов
 * @property {'default' | 'primary' | 'success' | 'warning' | 'error'} [variant] - Вариант карточки
 * @property {boolean} [dot] - Показать индикатор (точку) - спорный проп
 * @property {string} [className] - Дополнительные CSS классы
 * @property {React.CSSProperties} [style] - Инлайн стили
 */

const Card = memo(
  forwardRef(
    (
      {
        children,
        animated = false,
        align = 'left',
        disabled = false,
        interactive = false,
        bordered = true,
        shadow = true,
        hoverable = false,
        padding = 'medium',
        variant = 'default',
        dot = false,
        className = '',
        style,
        ...restProps
      },
      ref,
    ) => {
      const cardClasses = [
        styles.card,
        styles[padding],
        styles[variant],
        align && styles[`align-${align}`],
        animated && styles.animated,
        disabled && styles.disabled,
        interactive && styles.interactive,
        bordered && styles.bordered,
        shadow && styles.shadow,
        hoverable && styles.hoverable,
        dot && styles.dot,
        styles[className],
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <div
          ref={ref}
          className={cardClasses}
          style={style}
          aria-disabled={disabled}
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          {...restProps}>
          {dot && <span className={styles.dotIndicator} aria-hidden="true" />}
          {children}
        </div>
      );
    },
  ),
);

Card.displayName = 'LegacyCard';

export default Card;
