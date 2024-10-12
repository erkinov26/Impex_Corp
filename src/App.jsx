import Layout from "@layout/Layout"
import Home from "@pages/Home/Home"
import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import AboutUs from "@pages/AboutUs/AboutUs"
import PageNotFound from "@pages/PageNotFound/PageNotFound"
import { Catalog } from "@pages/Catalog/Catalog"
import { useAutosList, useContactInfo } from "@store/store"
import { useTranslation } from "react-i18next"
import CardInfo from "@pages/CardInfo/CardInfo"

const App = () => {
  const { i18n } = useTranslation()
  const { fetchData } = useAutosList()
  const { fetchData: fetchContacts } = useContactInfo()
  useEffect(() => {
    fetchData(i18n.language)
    fetchContacts(i18n.language)
  }, [fetchData, fetchContacts, i18n.language])

  const router = [
    {
      path: "/about",
      element: <AboutUs />,
    },
    {
      path: "/catalog",
      element: <Catalog />,
    },
    {
      path: "/carInfo/:id/:car",
      element: <CardInfo />,
    },
  ]

  return (
    <div id="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {router.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
