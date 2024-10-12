import React from "react"
import PropTypes from "prop-types"
import s from "@styles/pages/AboutUs/AboutUs.module.scss"
const AboutCard = ({ imgsrc, text }) => {
  return (
    <li>
      <div className={s.card_img_box}>
        <img src={imgsrc} alt={imgsrc} />
      </div>
      <p>{text}</p>
    </li>
  )
}

AboutCard.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default AboutCard
