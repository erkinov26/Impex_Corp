import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import s from "@styles/layout/Header.module.scss"

const Logo = ({ onClick }) => {
  const styles = {
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const toTop = () => {
    if (window.scrollY > 0) {
      window.scroll({
        top: 0,
      })
    }
  }

  return (
    <Link to="/">
      <button
        onClick={() => (handleClick(), toTop())}
        style={styles}
        className={s.logo_btn}>
        IMPEXCORP
      </button>
    </Link>
  )
}

Logo.propTypes = {
  onClick: PropTypes.func,
}

export default Logo
