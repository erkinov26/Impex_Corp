import slide1 from "@images/frame1.webp"
import slide2 from "@images/frame2.webp"
import slide3 from "@images/frame3.webp"
import "@styles/components/Carousels.scss"
import React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const Carousels = () => {
  let slides = [slide1, slide2, slide3]

  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper">
        {slides.map((item, id) => (
          <SwiperSlide key={id}>
            <img src={item} alt="Slide" />
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev">
          <FaChevronLeft color="white" />
        </div>
        <div className="swiper-button-next">
          <FaChevronRight color="white" />
        </div>
      </Swiper>
    </div>
  )
}

export default Carousels
