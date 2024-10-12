import React, { useEffect, useRef } from "react"
import { PiCaretDoubleUpThin } from "react-icons/pi"
import s from "@styles/ui/BackToTop.module.scss"
import { useLocation } from "react-router-dom"

const BackToTop = () => {
  const location = useLocation()
  const ref = useRef(null)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      ref.current.classList.toggle(s.active, window.scrollY > 800)
    })
  }, [ref])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    })
  }, [location.key])

  const toTop = () => {
    let currentPosition = window.scrollY
    if (currentPosition > 0) {
      window.requestAnimationFrame(toTop)
      window.scrollTo(0, currentPosition - currentPosition / 9)
    }
  }

  return (
    <div className={s.top_btn} id="top-btn" onClick={toTop} ref={ref}>
      <PiCaretDoubleUpThin alt="top-btn" />
    </div>
  )
}

export default BackToTop
