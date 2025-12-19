import { EmailIcon, LocationIcon, PhoneIcon } from '../../../../assets/icons';
import Card from '../../../common/Card/Card';
import { ContactInfo } from '../../../common/ContactInfo/ContactInfo';
import Title from '../../../common/Title/Title';
import Form from '../../../features/Form/Form';
import styles from './Contacts.module.css';

const Contacts = ({ container }) => {
  return (
    <section className={styles.contacts} id="contacts">
      <div className={styles[container]}>
        <Title subtitle="Контакты" title="Свяжитесь с нами" />
        <div className={styles.contactsWrapp}>
          <Form />
          <Card padding="xlarge">
            <h3>Контактная информация</h3>
            <ContactInfo />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
