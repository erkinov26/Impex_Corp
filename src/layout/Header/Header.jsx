import BurgerMenu from "@components/BurgerMenu/BurgerMenu"
import s from "@styles/layout/Header.module.scss"
import Logo from "@ui/Logo/Logo"
import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet"
import LangSwitcher from "@ui/LangSwitcher/LangSwitcher"
import PropTypes from "prop-types"

const Header = ({ contacts }) => {
  const [screenWidth, setScreenWidth] = useState(
    window.matchMedia("(min-width: 769px)").matches,
  )
  const { t } = useTranslation()
  const location = useLocation()
  const ref = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.matchMedia("(min-width: 769px)").matches)
    }

    const handleScroll = () => {
      if (window.matchMedia("(min-width: 769px)").matches) {
        const headerHeight = ref.current.offsetHeight
        const scrollThreshold = 1.7 * headerHeight
        if (window.scrollY > scrollThreshold) {
          ref.current.classList.add(s.fixed)
        } else {
          ref.current.classList.remove(s.fixed)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getMetaTags = () => {
    switch (location.pathname) {
      case "/about":
        return {
          title: t("header.MetaTags.ourcompany"),
          description: t("header.MetaTags.description"),
        }
      case "/catalog":
        return {
          title: t("header.MetaTags.catalogue"),
          description: t("header.MetaTags.description"),
        }
      default:
        return {
          title: t("header.MetaTags.home"),
          description: t("header.MetaTags.description"),
        }
    }
  }

  const metaTags = getMetaTags()

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
      </Helmet>
      {screenWidth ? (
        <>
          <header className="header" ref={ref}>
            <nav className={s.pc_nav}>
              <div className={s.row}>
                <div className={s.col_6}>
                  <Logo />
                </div>
                <div className={s.col_6}>
                  <div className={s.Links}>
                    <LangSwitcher />
                    <Link to="catalog">{t("header.catalogue")}</Link>
                    <Link to="about">{t("header.ourcompany")}</Link>
                    <a
                      href={
                        contacts &&
                        `https://api.whatsapp.com/send?phone=` +
                          contacts.whatsapp_number
                      }
                      rel="noreferrer"
                      className={s.header_phone}>
                      <p>
                        {contacts && contacts.call_number}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M15.0504 5C16.0272 5.19056 16.9248 5.66826 17.6285 6.37193C18.3322 7.07561 18.8099 7.97326 19.0004 8.95M15.0504 1C17.0797 1.22544 18.972 2.13417 20.4167 3.57701C21.8613 5.01984 22.7724 6.91101 23.0004 8.94M22.0004 16.92V19.92C22.0015 20.1985 21.9445 20.4742 21.8329 20.7293C21.7214 20.9845 21.5577 21.2136 21.3525 21.4019C21.1473 21.5901 20.905 21.7335 20.6412 21.8227C20.3773 21.9119 20.0978 21.9451 19.8204 21.92C16.7433 21.5856 13.7874 20.5341 11.1904 18.85C8.77425 17.3147 6.72576 15.2662 5.19042 12.85C3.5004 10.2412 2.44866 7.27099 2.12042 4.18C2.09543 3.90347 2.1283 3.62476 2.21692 3.36162C2.30555 3.09849 2.44799 2.85669 2.63519 2.65162C2.82238 2.44655 3.05023 2.28271 3.30421 2.17052C3.5582 2.05833 3.83276 2.00026 4.11042 2H7.11042C7.59573 1.99522 8.06621 2.16708 8.43418 2.48353C8.80215 2.79999 9.0425 3.23945 9.11042 3.72C9.23704 4.68007 9.47187 5.62273 9.81042 6.53C9.94496 6.88792 9.97408 7.27691 9.89433 7.65088C9.81457 8.02485 9.62928 8.36811 9.36042 8.64L8.09042 9.91C9.51398 12.4135 11.5869 14.4864 14.0904 15.91L15.3604 14.64C15.6323 14.3711 15.9756 14.1858 16.3495 14.1061C16.7235 14.0263 17.1125 14.0555 17.4704 14.19C18.3777 14.5285 19.3204 14.7634 20.2804 14.89C20.7662 14.9585 21.2098 15.2032 21.527 15.5775C21.8441 15.9518 22.0126 16.4296 22.0004 16.92Z"
                            stroke="#379E1E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </>
      ) : (
        <BurgerMenu />
      )}
    </>
  )
}

Header.propTypes = {
  contacts: PropTypes.any.isRequired,
}

export default Header
