import type { FC } from "react";
import { useState, useEffect } from "react";
import type { DoctorCardProps } from "./types";
import { Button } from "../button";
import "./Card.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const Card: FC<DoctorCardProps> = ({
  imgSrc,
  extra,
  name,
  profession,
  education,
}) => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const timeSlots = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0]);
  const [showAll, setShowAll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleSlots = showAll
    ? timeSlots
    : timeSlots.slice(0, windowWidth < 767 ? 9 : 11);

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const monthGenitiveMap: Record<number, string> = {
    0: "января",
    1: "февраля",
    2: "марта",
    3: "апреля",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря",
  };

  const days: {
    day: number;
    monthGenitive: string;
    label: string;
    dateObj: Date;
  }[] = [];

  for (let i = 0; i < daysInMonth; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i
    );

    let label = date.toLocaleDateString("ru-RU", { weekday: "short" });
    if (i === 0) label = "Сегодня";
    else if (i === 1) label = "Завтра";

    const monthGenitive = monthGenitiveMap[date.getMonth()];

    days.push({
      day: date.getDate(),
      monthGenitive,
      label,
      dateObj: date,
    });
  }

  return (
    <article className="card">
      <div className="info">
        <div className="info__top">
          <div className="info__img">
            <img src={imgSrc} alt={name}></img>
          </div>
          <div className="info__extra">
            {extra.map((item) => (
              <p key={crypto.randomUUID()} className="info__extra__item">
                {item}
              </p>
            ))}
          </div>
        </div>
        <p className="info__name">{name}</p>
        <p className="info__profession">{profession}</p>
        <div className="info__education">
          {education.map((item) => (
            <div key={crypto.randomUUID()}>
              <p className="info__education__title">{item.title}</p>
              {item.text.map((line) => (
                <p className="info__education__text" key={crypto.randomUUID()}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="booking">
        <div className="booking__wrapper">
          <div>
            <p className="booking__title">Выберите дату и время приема</p>
            <div className="booking__dates">
              <Swiper
                modules={[Navigation]}
                navigation
                breakpoints={{
                  0: {
                    slidesPerView: "auto",
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
              >
                {days.map((d) => (
                  <SwiperSlide key={d.day}>
                    <div
                      className={`booking__dates__date${
                        d.day === selectedDay
                          ? " booking__dates__date--active"
                          : ""
                      }`}
                      onClick={() => setSelectedDay(d.day)}
                    >
                      <p className="booking__dates__date-day-month">
                        {d.day} {d.monthGenitive}
                      </p>

                      <p className="booking__dates__date-label">{d.label}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="booking__times">
              {visibleSlots.map((time) => (
                <div
                  key={time}
                  className={`booking__time-slot${
                    selectedTime === time ? " booking__time-slot--active" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </div>
              ))}
              {!showAll && (
                <div
                  className="booking__time-slot booking__time-slot--expand"
                  onClick={() => setShowAll(true)}
                ></div>
              )}
            </div>
          </div>
          <Button />
        </div>
      </div>
    </article>
  );
};
