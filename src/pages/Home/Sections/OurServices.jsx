import React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import searchIcon from "@images/search.svg"
import registrationIcon from "@images/registration.svg"
import autoIcon from "@images/auto.svg"
import insuranceIcon from "@images/insurance.svg"
import s from "@styles/pages/Home/OurServices.module.scss"

const OurServices = () => {
  const { t } = useTranslation()

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

  return (
    <section>
      <div id="Services" className={s.Services}></div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className={s.parentContainer}>
        <motion.h2 variants={AnimBottom} className={s.serviceTitle}>
          {t("HomePage.OurServices.title")}
        </motion.h2>
        <div className={s.row}>
          <motion.div custom={2} variants={AnimBottom} className={s.col_6}>
            <div className={s.imgDiv}>
              <img src={searchIcon} alt="search" />
            </div>
            <div>
              <p className={s.paragraph1}>{t("HomePage.OurServices.search")}</p>
              <p className={s.span1}>{t("HomePage.OurServices.cars")}</p>
            </div>
          </motion.div>
          <motion.div custom={2} variants={AnimBottom} className={s.col_6}>
            <div className={s.imgDiv}>
              <img src={autoIcon} alt="auto" />
            </div>
            <div>
              <p className={s.paragraph3}>
                {t("HomePage.OurServices.delivery")}
              </p>
              <p className={s.span3}>{t("HomePage.OurServices.guarantee")}</p>
            </div>
          </motion.div>
          <motion.div custom={3} variants={AnimBottom} className={s.col_6}>
            <div className={s.imgDiv}>
              <img src={registrationIcon} alt="registration" />
            </div>
            <div>
              <p className={s.paragraph2}>
                {t("HomePage.OurServices.registration")}
              </p>
              <p className={s.span2}>{t("HomePage.OurServices.accounting")}</p>
            </div>
          </motion.div>
          <motion.div custom={3} variants={AnimBottom} className={s.col_6}>
            <div className={s.imgDiv}>
              <img src={insuranceIcon} alt="insurance" />
            </div>
            <div>
              <p className={s.paragraph4}>
                {t("HomePage.OurServices.insurance")}
              </p>
              <p className={s.span4}>{t("HomePage.OurServices.auto")}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default OurServices
