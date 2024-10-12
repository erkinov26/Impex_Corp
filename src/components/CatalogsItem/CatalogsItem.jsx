import React, { useEffect, useState } from "react"
import s from "@styles/pages/Home/Catalogs.module.scss"
import CarCard from "@components/CarCard/CarCard"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"

export const CatalogsItem = ({ catalogTitle, data }) => {
  const AnimBottom = {
    hidden: {
      y: 150,
      opacity: 0,
    },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: custom * 0.2 },
    }),
  }
  const [bodyWidth, setBodyWidth] = useState(0)
  useEffect(() => {
    const updateBodyWidth = () => {
      setBodyWidth(document.body.clientWidth)
    }

    window.addEventListener("resize", updateBodyWidth)

    updateBodyWidth()

    return () => {
      window.removeEventListener("resize", updateBodyWidth)
    }
  }, [])

  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={s.catalogs_item}>
      <motion.h2 variants={AnimBottom} className={s.catalog_type_title}>
        {catalogTitle}
      </motion.h2>
      <motion.ul variants={AnimBottom} custom={1} className={s.car_card_list}>
        {data.length > 0 && (
          <Swiper
            slidesPerView={
              bodyWidth > 1024
                ? 3.1
                : bodyWidth > 768
                  ? 2.3
                  : bodyWidth > 490
                    ? 1.5
                    : bodyWidth > 410
                      ? 1.1
                      : 1.1
            }
            style={{ width: "100%" }}
            freeMode={true}
            modules={[FreeMode]}>
            {[...data]
              .filter((item) => item.images?.length != 0)
              .reverse()
              .slice(0, 10)
              .map((car) => (
                <SwiperSlide key={car.id}>
                  <CarCard
                    images={
                      car.images &&
                      import.meta.env.VITE_API + car.images[0].image
                    }
                    car_name={car.car_brand + " " + car.car_model}
                    price={car.price}
                    volume={car.volume}
                    transmission={car.transmission}
                    mileage={car.mileage}
                    year={car.release_period}
                    battery_capacity={car.battery_capacity}
                    fuel={car.fuel_type}
                    country={car.country}
                    id={car.id}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </motion.ul>
    </motion.li>
  )
}

CatalogsItem.propTypes = {
  catalogTitle: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}
