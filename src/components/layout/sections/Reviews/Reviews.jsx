import { useEffect, useState } from "react";

import { mockApi } from "../../../../api/mockApi";
import styles from "./Reviews.module.css";

import Title from "../../../common/Title/Title";
import ReviewCard from "../../../features/ReviewCard/ReviewCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { ArrowNav } from "../../../../assets/icons";

const Reviews = ({ container }) => {
  const [reviews, setReviews] = useState([]);

  const params = {
    modules: [Navigation, Pagination],
    spaceBetween: 20,
    slidesPerView: 1,
    grabCursor: true,
    navigation: {
      nextEl: `.${styles.swiperButtonNext}`,
      prevEl: `.${styles.swiperButtonPrev}`,
    },
    pagination: {
      el: `.${styles.swiperPagination}`,
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  };

  const fetchReviews = async () => {
    try {
      const response = await mockApi.getReviews();
      setReviews(response.data);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section className={styles.reviews}>
      <div className={styles[container]}>
        <Title title="О нас говорят клиенты" subtitle="Отзывы" />
        <Swiper {...params} className={styles.swiper}>
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.sliderControls}>
          <div
            className={`${styles.swiperButtonPrev} ${styles.navigationButton}`}
          >
            <ArrowNav width={24} height={24} />
          </div>
          <div className={styles.swiperPagination}></div>
          <div
            className={`${styles.swiperButtonNext} ${styles.navigationButton}`}
          >
            <ArrowNav width={24} height={24} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
