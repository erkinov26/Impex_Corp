import CharacterCard from "@components/CharacterCard/CharacterCard"
import Icon2 from "@images/Vector4.svg"
import Icon1 from "@images/Vector5.svg"
import Icon3 from "@images/flag.svg"
import imgPlaceholder from "@images/car_placeholder.webp"
import { useAutoInfo, useSliderState } from "@store/store"
import s from "@styles/pages/CardInfo/CardInfo.module.scss"
import "@styles/pages/CardInfo/swiper.scss"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { FaAngleLeft, FaAngleRight, FaRegCalendar } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { IoShareSocial } from "react-icons/io5"
import { LuFuel } from "react-icons/lu"
import { MdOutlineElectricalServices } from "react-icons/md"
import { MdOutlineSpeed } from "react-icons/md"
import { Link, useParams } from "react-router-dom"
import { FreeMode } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const CardInfo = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const { data, fetchData, setEmptyData } = useAutoInfo()
  const placeholderImage = [imgPlaceholder]
  const [bodyWidth, setBodyWidth] = useState(0)

  useEffect(() => {
    const handleRouteChange = () => {
      setEmptyData()
    }
    return () => {
      handleRouteChange()
    }
  }, [setEmptyData])

  useEffect(() => {
    fetchData(i18n.language, id)
  }, [i18n.language, id])

  const images = data.images

  const [mainImg, setMainImg] = useState("placeholderImage")
  const { nextSlide, prevSlide, slide, setSlide } = useSliderState()

  useEffect(() => {
    try {
      setMainImg(data.images[slide].image)
    } catch {
      return
    }
  }, [data.images])

  useEffect(() => {
    const updateBodyWidth = () => {
      setBodyWidth(document.body.clientWidth)
    }

    window.addEventListener("resize", updateBodyWidth)

    updateBodyWidth()

    return () => {
      window.removeEventListener("resize", updateBodyWidth)
    }
  }, [])

  const prevFunc = () => {
    if (slide <= 0) {
      setSlide(images.length - 1)
      setMainImg(images[images.length - 1].image)
    } else {
      prevSlide()
      setMainImg(images[slide - 1].image)
    }
  }
  const nextFunc = () => {
    if (slide >= images.length - 1) {
      setSlide(0)
      setMainImg(images[0].image)
    } else {
      nextSlide()
      setMainImg(images[slide + 1].image)
    }
  }

  const [thisUrl, setThisUrl] = useState("")
  const [thisTitle, setThisTitle] = useState("")

  useEffect(() => {
    setThisUrl(window.location.href)
    setThisTitle(document.title)
  }, [])

  const shareHandler = () => {
    navigator
      .share({
        title: thisTitle,
        url: thisUrl,
      })
      .catch(console.error)
  }

  return (
    <main className="CardInfo">
      <Helmet>
        <title>
          {`IMPEX CORP || 
          ${data.car_model != undefined ? data.car_brand + " " + data.car_model : ""}`}
        </title>
      </Helmet>
      <div className={s.card_info_section}>
        <Link to="/" className={s.back}>
          <IoIosArrowBack size={25} color="#19746b" />
          <p>{t("backBtn")}</p>
        </Link>
        <div className={s.card_slide_block}>
          <div className={s.card_slide}>
            <div className={s.card_slide_main}>
              {images != undefined && images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      prevFunc()
                    }}
                    className={s.left}>
                    <FaAngleLeft />
                  </button>
                  <button
                    onClick={() => {
                      nextFunc()
                    }}
                    className={s.right}>
                    <FaAngleRight />
                  </button>
                </>
              )}
              {data.images == undefined ? (
                <img src={placeholderImage} alt={"Placeholder Image"} />
              ) : (
                <img
                  src={import.meta.env.VITE_API + mainImg}
                  alt={data.car_name}
                />
              )}
            </div>
            {images != undefined && images.length > 1 && (
              <div className={s.card_slide_list}>
                <Swiper
                  freeMode={true}
                  modules={[FreeMode]}
                  slidesPerView={
                    bodyWidth > 768 && images.length >= 4
                      ? 4
                      : bodyWidth < 768 && images.length > 4
                        ? 3.2
                        : "auto"
                  }>
                  {(images == undefined ? placeholderImage : images).map(
                    (item, i) => (
                      <SwiperSlide key={i}>
                        <div
                          onClick={() => {
                            setMainImg(item.image)
                            setSlide(
                              images.map((el) => el.image).indexOf(item.image),
                            )
                          }}
                          className={s.card_slide_item}>
                          <img
                            src={import.meta.env.VITE_API + item.image}
                            alt="car photo"
                          />
                        </div>
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>
            )}
          </div>
          <div className={s.card_info_card}>
            <h1>
              {data.car_model != undefined &&
                data.car_brand + " " + data.car_model}
            </h1>
            <h2 className={s.car_price}>$ {data.price}</h2>
            <ul className={s.car_struct_list}>
              <li className={s.car_struct_list_item}>
                <FaRegCalendar color="black" />
                <p className={s.car_struct_text}>{data.release_period}</p>
              </li>
              <li className={s.car_struct_list_item}>
                <img
                  className={s.car_struct_image}
                  src={Icon2}
                  alt="struct-img"
                />
                <p className={s.text_transmission + " " + s.car_struct_text}>
                  {data.drive}
                </p>
              </li>
              <li className={s.car_struct_list_item}>
                <LuFuel color="black" />
                <p className={s.car_struct_text}>{data.fuel_type}</p>
              </li>
              <li className={s.car_struct_list_item}>
                <MdOutlineSpeed color="black" />
                <p className={s.car_struct_text}>
                  {data.mileage + " " + t("Catalog.km")}
                </p>
              </li>
              {data.country && (
                <li className={s.car_struct_list_item}>
                  <img
                    className={s.car_struct_image}
                    src={Icon3}
                    alt="country"
                  />
                  <p className={s.car_struct_text}>
                    {t("Catalog.characteristics.country." + data.country)}
                  </p>
                </li>
              )}
              {data.fuel_type != t("Catalog.characteristics.fuel.electro") ? (
                <li className={s.car_struct_list_item}>
                  <img
                    className={s.car_struct_image}
                    src={Icon1}
                    alt="struct-img"
                  />
                  <p className={s.car_struct_text}>
                    {data.volume + " " + t("Catalog.liter")}
                  </p>
                </li>
              ) : (
                <li className={s.car_struct_list_item}>
                  <MdOutlineElectricalServices color="black" />
                  <p className={s.car_struct_text}>
                    {data.battery_capacity + " " + t("Catalog.kwh")}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className={s.share} onClick={shareHandler}>
          <IoShareSocial />
          <span>{t("CarInfo.titles.common.share")}</span>
        </div>

        <h2 className={s.character_main_title}>
          {t("CarInfo.titles.common.characteristics")}
        </h2>
        <div className={s.character_cards}>
          <CharacterCard data={data} />
        </div>
      </div>
    </main>
  )
}

export default CardInfo
