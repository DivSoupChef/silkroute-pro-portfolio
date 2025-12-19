import { aboutUsImage } from "../../../../assets/images";
import Title from "../../../common/Title/Title";
import styles from "./AboutUs.module.css";

const AboutUs = ({ container }) => {
  return (
    <section className={styles.aboutUs} name="aboutUs" id="aboutUs">
      <div className={styles[container]}>
        <Title subtitle="О нас" title="Расскажем несколько слов о себе" />
        <div className={styles.aboutUsWrapp}>
          <img src={aboutUsImage} alt="О нас" />
          <div className={styles.textContent}>
            <h3>Мы на рынке уже более 10 лет</h3>
            <p>
              Мы — профессиональная логистическая компания, которая уже более 10
              лет создает надежные мосты для бизнеса между Китаем и Россией. За
              это время мы превратили сложный процесс международных поставок в
              отлаженный и прозрачный механизм. Наш опыт — это не просто цифра в
              годах, а тысячи успешно доставленных контейнеров, сотни довольных
              партнеров и глубокие знания всех нюансов таможенного оформления,
              поиска поставщиков и управления цепочками поставок. Мы ценим
              долгосрочные отношения и строим их на фундаменте ответственности,
              честности и безупречного исполнения обязательств
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
