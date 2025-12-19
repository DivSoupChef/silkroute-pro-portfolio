import { forwardRef } from 'react';
import { BtnArrow } from '../../../assets/icons';
import styles from './Button.module.css';

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} [children]
 * @property {string} [text]
 * @property {'primary'|'secondary'|'outline'|'ghost'|'danger'|'success'} [variant]
 * @property {'small'|'medium'|'large'} [size]
 * @property {boolean} [fullWidth]
 * @property {boolean} [disabled]
 * @property {boolean} [loading]
 * @property {React.ComponentType|string} [startIcon]
 * @property {React.ComponentType|string} [endIcon]
 * @property {boolean} [iconOnly]
 * @property {string} [className]
 * @property {function} [onClick]
 * @property {'button'|'submit'|'reset'} [type]
 */

/**
 * @param {ButtonProps} props
 * @param {React.Ref<HTMLButtonElement>} ref
 */

const Button = forwardRef(
  (
    {
      children,
      text,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      disabled = false,
      loading = false,
      startIcon,
      endIcon,
      iconOnly,
      className = '',
      onClick,
      type = 'button',
      ...restProps
    },
    ref,
  ) => {
    const content = children || text;

    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      loading && styles.loading,
      iconOnly && styles.iconOnly,
      styles[className],
    ]
      .filter(Boolean)
      .join(' ');

    const renderIcon = (icon, position) => {
      if (!icon) return null;

      const IconComponent = icon === 'arrow' ? BtnArrow : icon;

      return (
        <span className={`${styles.icon} ${styles[`icon-${position}`]}`} aria-hidden="true">
          {typeof IconComponent === 'function' ? <IconComponent /> : IconComponent}
        </span>
      );
    };

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={onClick}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...restProps}>
        {loading && <span className={`${styles.content} ${styles.loader}`} >{content}</span>}

        {!loading && (
          <>
            {renderIcon(startIcon, 'start')}

            {iconOnly ? (
              <span className="visually-hidden">{content}</span>
            ) : (
              <span className={styles.content}>{content}</span>
            )}

            {renderIcon(endIcon, 'end')}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
