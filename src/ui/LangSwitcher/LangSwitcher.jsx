import ChinaFlag from "@images/china.svg"
import KyrgyzFlag from "@images/kyrgyzstan.svg"
import RussianFlag from "@images/russia.svg"
import UsaFlag from "@images/usa.svg"
import { useBurgerState } from "@store/store"
import s from "@styles/ui/LangSwitcher.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaChevronDown } from "react-icons/fa6"

const LangSwitcher = () => {
  const [showDrop, setShowDrop] = useState(false)
  const { i18n } = useTranslation()
  const { setMenuActive } = useBurgerState()
  let ref = useRef(null)

  const handleClose = (e) => {
    if (!ref.current.contains(e.target)) {
      setShowDrop(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClose)
  }, [])

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const langs = [
    { code: "ru", name: "Русский", flag: RussianFlag },
    { code: "ky", name: "Кыргыз", flag: KyrgyzFlag },
    { code: "en", name: "English", flag: UsaFlag },
    { code: "zh", name: "中國的", flag: ChinaFlag },
  ]

  const handleClick = (item) => {
    changeLanguage(item.code)
    setMenuActive(false)
  }

  return (
    <div
      className={s.dropDown}
      onClick={() => setShowDrop(!showDrop)}
      ref={ref}>
      {langs
        .filter((lang) => lang.code == i18n.language)
        .map((lang) => (
          <button key={lang.code}>
            <img src={lang.flag} alt={lang.name} />
            {lang.name}
            <FaChevronDown
              className={
                showDrop ? `${s.langArrow} ${s.langArrow_active}` : s.langArrow
              }
              alt="arrowDown"
            />
          </button>
        ))}
      <div
        className={
          showDrop
            ? `${s.dropdown_content} ${s.dropdown_content_show}`
            : `${s.dropdown_content}`
        }>
        {langs.map((i, id) => (
          <button key={id} onClick={() => handleClick(i)}>
            <img src={i.flag} alt={i.name} />
            {i.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LangSwitcher
