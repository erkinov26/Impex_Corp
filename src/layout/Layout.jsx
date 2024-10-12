import React from "react"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import BackToTop from "@ui/BackToTop/BackToTop"
import { Outlet } from "react-router-dom"
import { useContactInfo } from "@store/store"

const Layout = () => {
  const { data: contacts } = useContactInfo()

  return (
    <>
      <Header contacts={contacts} />
      <Outlet />
      <BackToTop />
      <Footer contacts={contacts} />
    </>
  )
}
export default Layout
