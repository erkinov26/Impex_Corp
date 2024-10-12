import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import s from "@styles/pages/Home/GreetingBlock.module.scss"
import Carousels from "@components/Carousels/Carousels.jsx"
import { Link } from "react-router-dom"

const GreetingBlock = () => {
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={s.container}>
        <div className={s.row}>
          <div className={s.col_6}>
            <motion.div variants={AnimBottom} className={s.carImg}>
              <Carousels />
            </motion.div>
          </div>
          <div className={s.col_6}>
            <motion.h2 custom={1} variants={AnimBottom} className={s.title}>
              {t("HomePage.GreetingBlock.title")}
            </motion.h2>
            <article>
              <motion.p custom={2} variants={AnimBottom} className={s.text}>
                {t("HomePage.GreetingBlock.text")}
              </motion.p>
            </article>
            <Link to="/about">
              <motion.button
                custom={3}
                variants={AnimBottom}
                className={s.button}>
                {t("HomePage.GreetingBlock.buttonText")}
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default GreetingBlock
