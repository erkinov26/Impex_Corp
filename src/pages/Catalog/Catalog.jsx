import React, { useEffect, useState } from "react"
import { FiltrModal } from "./ui/FilterModal/FilterModal"
import { useAutosList, useFilter, useFilterStore } from "@store/store"
import CarCard from "@components/CarCard/CarCard"
import s from "@styles/pages/Catalog/Catalog.module.scss"
import { IoIosArrowBack, IoIosArrowUp } from "react-icons/io"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "react-i18next"

export const Catalog = () => {
  const { t } = useTranslation()
  const { data } = useAutosList()
  const { filteredCars, setFilteredCars } = useFilterStore()
  const { setInitial } = useFilter()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      setInitial()
    }
    return () => {
      handleRouteChange()
    }
  }, [setInitial])

  const showCars = () => {
    if (filteredCars != "empty" && filteredCars.length > 0) {
      return filteredCars
    } else if (filteredCars == "empty") {
      return filteredCars
    } else {
      return data
    }
  }

  const onShowModal = () => {
    setOpenModal((show) => !show)
  }

  return (
    <main className={s.Catalog}>
      <div className={s.main_title}>
        <Link to="/" className={s.back}>
          <IoIosArrowBack size={25} color="#19746b" />
          <p>{t("backBtn")}</p>
        </Link>
        <h1 className={s.title}>{t("Catalog.title")}</h1>
      </div>
      <section className={s.catalog_block}>
        <div className={s.filtration_block}>
          <div className={s.filtration} onClick={onShowModal}>
            <p>{t("Catalog.filter")}</p>
            <IoIosArrowUp
              cursor="pointer"
              className={openModal ? s.rotates : s.rotate}
            />
          </div>
        </div>

        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: openModal ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden" }}>
              {openModal && (
                <FiltrModal
                  setOpenModal={setOpenModal}
                  setFilteredCars={setFilteredCars}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className={s.row_catalog}>
          {showCars() != "empty" ? (
            showCars()
              .filter((item) => item.images.length !== 0)
              .reverse()
              .map((car) => (
                <div className={s.col_4_catalog} key={car.id}>
                  <CarCard
                    width="100%"
                    images={import.meta.env.VITE_API + car.images[0].image}
                    id={car.id}
                    car_name={car.car_brand + " " + car.car_model}
                    price={car.price}
                    volume={car.volume}
                    transmission={car.transmission}
                    mileage={car.mileage}
                    country={car.country}
                    fuel={car.fuel_type}
                    year={car.release_period}
                    battery_capacity={car.battery_capacity}
                  />
                </div>
              ))
          ) : (
            <h1 className={s.title}>{t("notFoundData")}</h1>
          )}
          {data.length == 0 && (
            <h1 className={s.title + " " + s.title_notfound}>
              {t("notFoundData")}
            </h1>
          )}
        </div>
      </section>
    </main>
  )
}
