import styles from './Form.module.css';
import { useForm } from '../../../hooks/useForm';
import { ErrorIcon, SuccessIcon } from '../../../assets/icons';
import Button from '../../common/Button/Button';
import { useNotification } from '../../../context/AppContext';
import Card from '../../common/Card/Card';

const Form = () => {
  const { openNotification } = useNotification();

  const minMinutes = 0;
  const maxMinutes = 10;
  const randomMinutes = Math.floor(Math.random() * (maxMinutes - minMinutes + 1) + minMinutes);

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handlePhoneKeyPress,
    getInputClassName,
  } = useForm();

  const handleFormSuccess = () => {
    openNotification('Мы свяжемся с вами в течении ' + randomMinutes + `${randomMinutes === 1 ? ' минуту' : ' минут'}`);
  };

  const handleFormSubmit = e => {
    handleSubmit(e, null, handleFormSuccess);
  };

  const fields = [
    {
      name: 'firstName',
      type: 'text',
      placeholder: 'Ваше имя',
      label: 'Имя',
    },
    {
      name: 'lastName',
      type: 'text',
      placeholder: 'Ваша фамилия',
      label: 'Фамилия',
    },
    {
      name: 'phone',
      type: 'text',
      placeholder: 'Ваш телефон',
      label: 'Телефон',
      props: {
        maxLength: 11,
        inputMode: 'numeric',
        pattern: '[0-9]*',
        onKeyDown: handlePhoneKeyPress,
      },
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Ваш E-mail (необязательно)',
      label: 'Email',
      optional: true,
    },
  ];

  const getFieldError = fieldName => {
    if (fieldName === 'email' && !values.email.trim()) {
      return null;
    }
    return errors[fieldName];
  };

  const isFieldValid = fieldName => {
    if (fieldName === 'email' && !values.email.trim()) {
      return false;
    }
    return touched[fieldName] && !errors[fieldName];
  };

  return (
    <>
      <Card padding="xlarge">
        <form className={styles.form} noValidate>
          <h3>Форма заполнения</h3>
          <div className={styles.formWrapp}>
            {fields.map(field => (
              <div className={styles.fieldWrapp} key={field.name}>
                <input
                  name={field.name}
                  type={field.type}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName(field.name, styles)}
                  placeholder={field.placeholder}
                  disabled={isSubmitting}
                  required={!field.optional}
                  {...(field.props || {})}
                />

                {/* Отображение ошибок */}
                {getFieldError(field.name) && touched[field.name] && (
                  <div className={`${styles.validMsg} ${styles.error}`}>
                    <ErrorIcon />
                    <div>{getFieldError(field.name)}</div>
                  </div>
                )}

                {/* Отображение успеха */}
                {isFieldValid(field.name) && (
                  <div className={`${styles.validMsg} ${styles.success}`}>
                    <SuccessIcon />
                    <div>Поле заполнено корректно</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.btnWrapp}>
            <Button
              variant="primary"
              size="large"
              text={isSubmitting ? 'Отправка' : 'Отправить заявку'}
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={handleFormSubmit}
            />
            <p className={styles.formNote}>
              Мы свяжемся с вами в ближайшее время для уточнения деталей и назначения консультации. Благодарим за
              обращение!
            </p>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Form;
