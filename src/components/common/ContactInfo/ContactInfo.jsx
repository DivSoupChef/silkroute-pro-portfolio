import { memo } from 'react';
import { ContactItem } from './ContactItem';

import styles from './ContactInfo.module.css';
import { CONTACT_INFO } from '../../../constants/contacts';

const ContactInfoComponent = ({
  variant = 'default', // 'default' | 'compact' | 'detailed'
  showIcons = true,
  className = '',
}) => {
  const contacts = CONTACT_INFO[variant] || CONTACT_INFO.default;

  return (
    <address className={`${styles.contactInfo} ${styles[className]}`}>
      {contacts.map(contact => (
        <ContactItem key={contact.id} {...contact} showIcon={showIcons} />
      ))}
    </address>
  );
};

export const ContactInfo = memo(ContactInfoComponent);
