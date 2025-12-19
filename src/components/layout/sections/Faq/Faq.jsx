import { useEffect, useState } from "react";
import Spoiler from "../../../common/Spoiler/Spoiler";
import Title from "../../../common/Title/Title";
import styles from "./Faq.module.css";
import { mockApi } from "../../../../api/mockApi";

const Faq = ({ container }) => {
  const [faqs, setFaqs] = useState([]);

  const fetchFaq = async () => {
    try {
      const response = await mockApi.getFaq();
      setFaqs(response.data);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  return (
    <section className={styles.faq} name="faq" id="faq">
      <div className={styles[container]}>
        <Title
          subtitle="Часто задаваемые вопросы"
          title="Клиенты часто спрашивают"
        />
        <Spoiler items={faqs} allowMultiple={false} />
      </div>
    </section>
  );
};

export default Faq;
