import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { IoIosArrowUp } from "react-icons/io"
import { motion, AnimatePresence } from "framer-motion"
import s from "@styles/pages/Catalog/Catalog.module.scss"
import { useFilter } from "@store/store"
import { useTranslation } from "react-i18next"
import { MdErrorOutline } from "react-icons/md"

export const Select = ({ title, options, filterId, onChange }) => {
  const [openSelect, setOpenSelect] = useState(false)
  const [showError, setShowError] = useState(false)
  const [label, setLabel] = useState(null)
  const { values, getData } = useFilter()
  const { t } = useTranslation()

  const handleSelect = (value, label) => {
    setLabel(label)
    setOpenSelect(false)
    getData(value, filterId)
    if (onChange) onChange(value)
  }

  useEffect(() => {
    if (values.car_brand.length > 0) {
      setShowError(false)
    }
  }, [values.car_brand])

  const handleOpen = () => {
    if (filterId !== "car_model") {
      setOpenSelect((prev) => !prev)
    } else if (values.car_brand.length !== 0) {
      setOpenSelect((prev) => !prev)
    } else {
      setShowError(true)
    }
  }

  return (
    <div>
      <div className={s.characteristic} onClick={() => handleOpen()}>
        <p>{label ? label : title}</p>
        <IoIosArrowUp
          cursor="pointer"
          className={openSelect ? s.rotates : s.rotate}
        />
      </div>
      <AnimatePresence>
        {openSelect && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}>
            <div className={s.select}>
              <div className={s.options_container}>
                {options.map((option) => (
                  <p
                    key={option.value}
                    className={s.option}
                    onClick={() => handleSelect(option.value, option.label)}>
                    {option.label}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showError && (
        <p className={s.brandError}>
          <MdErrorOutline color="#db202c" />
          {t("Catalog.brandError")}
        </p>
      )}
    </div>
  )
}

Select.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filterId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default Select
