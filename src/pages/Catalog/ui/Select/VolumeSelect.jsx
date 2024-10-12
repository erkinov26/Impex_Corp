import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { IoIosArrowUp } from "react-icons/io"
import { AnimatePresence, motion } from "framer-motion"
import s from "@styles/pages/Catalog/Catalog.module.scss"
import { useFilter } from "@store/store"

export const VolumeSelect = ({ title, filterId, volumes }) => {
  const [openSelect, setOpenSelect] = useState(false)
  const [selectedValue, setSelectedValue] = useState()
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 769)

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 769)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleSelect = (value) => {
    setSelectedValue(value)
    setOpenSelect(false)
  }

  const { getData } = useFilter()
  return (
    <div className={s.select_input_container}>
      <div
        className={isSmallScreen ? s.volume_select_adaptive : s.volume_select}
        onClick={() => setOpenSelect((show) => !show)}>
        <p>{selectedValue ? selectedValue : title}</p>
        <IoIosArrowUp
          cursor="pointer"
          className={openSelect ? s.rotates : s.rotate}
        />
      </div>
      <AnimatePresence>
        {openSelect && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            exit={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: openSelect ? "auto" : 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}>
            <div className={s.select}>
              <div className={s.options_container}>
                {volumes?.map((volume, id) => (
                  <p
                    key={id}
                    className={s.option}
                    onClick={() => {
                      handleSelect(volume)
                      getData(volume, filterId)
                    }}>
                    {volume}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

VolumeSelect.propTypes = {
  title: PropTypes.string.isRequired,
  volumes: PropTypes.array.isRequired,
  filterId: PropTypes.string.isRequired,
}
