import Logo from "@ui/Logo/Logo"
import React from "react"
import { useTranslation } from "react-i18next"
import s from "@styles/pages/PageNotFound/PageNotFound.module.scss"
import Header from "@layout/Header/Header"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

const PageNotFound = () => {
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <main>
        <section className={s.NotFoundBlock}>
          <div className={s.logo}>
            <Logo />
          </div>
          <h1>{t("notFoundText")}</h1>
          <h2 id={s.error}>
            Error 404<span id={s.smile}>:(</span>
          </h2>
          <Link to="/">
            <button className={s.home_btn}>
              <FaArrowLeft className={s.arrow_left} /> <span>На главную</span>
            </button>
          </Link>
        </section>
      </main>
    </>
  )
}

export default PageNotFound
