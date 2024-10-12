import React from "react"
import s from "@styles/components/BurgerMenu.module.scss"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import LangSwitcher from "@ui/LangSwitcher/LangSwitcher"

const Menu = ({ active, setActive }) => {
  const { t } = useTranslation()
  return (
    <div className={s.menu}>
      <div
        onClick={() => setActive(!active)}
        className={active ? `${s.blur} ${s.active}` : s.blur}></div>
      <div
        className={active ? `${s.menu_content} ${s.active}` : s.menu_content}>
        <ul>
          <li>
            <Link
              className={s.li_element}
              onClick={() => setActive(!active)}
              to="/">
              {t("header.home")}
            </Link>
          </li>
          <li>
            <Link
              className={s.li_element}
              onClick={() => setActive(!active)}
              to="about">
              {t("header.ourcompany")}
            </Link>
          </li>
          <li>
            <Link
              className={s.li_element}
              onClick={() => setActive(!active)}
              to="catalog">
              {t("header.catalogue")}
            </Link>
          </li>
          <li>
            <LangSwitcher />
          </li>
        </ul>
      </div>
    </div>
  )
}

Menu.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
}

export default Menu
