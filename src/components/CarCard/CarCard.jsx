import React from "react"
import s from "@styles/components/CarCard.module.scss"
import { useTranslation } from "react-i18next"
import Icon1 from "@images/Vector5.svg"
import Icon2 from "@images/Vector4.svg"
import Icon3 from "@images/flag.svg"
import { FaRegCalendar } from "react-icons/fa"
import { MdOutlineSpeed } from "react-icons/md"
import PropTypes from "prop-types"
import { MdOutlineElectricalServices } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const CarCard = ({
  car_name,
  id,
  images,
  price,
  mileage,
  volume,
  transmission,
  width,
  year,
  battery_capacity,
  country,
  fuel,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <li className={s.carCardItem} style={{ width: width }}>
      <div>
        <img src={images} className={s.car_image} alt={car_name} />
        <h2 className={s.car_name}>{car_name}</h2>
        <ul className={s.car_struct_list}>
          <li className={s.car_struct_list_item}>
            <FaRegCalendar color="black" />
            <p className={s.car_struct_text}>{year}</p>
          </li>
          <li className={s.car_struct_list_item}>
            <img
              className={s.car_struct_image}
              src={Icon2}
              alt="transmission"
            />
            <p className={s.text_transmission + " " + s.car_struct_text}>
              {transmission}
            </p>
          </li>
          <li className={s.car_struct_list_item}>
            <MdOutlineSpeed color="black" />
            <p className={s.car_struct_text}>
              {mileage + " " + t("Catalog.km")}
            </p>
          </li>
          {country && (
            <li className={s.car_struct_list_item}>
              <img
                className={s.car_struct_image + " " + s.flag_icon}
                src={Icon3}
                alt="country"
              />
              <p className={s.car_struct_text}>
                {t("Catalog.characteristics.country." + country)}
              </p>
            </li>
          )}
          {fuel != t("Catalog.characteristics.fuel.electro") ? (
            <li className={s.car_struct_list_item}>
              <img className={s.car_struct_image} src={Icon1} alt="volume" />
              <p className={s.car_struct_text}>
                {volume + " " + t("Catalog.liter")}
              </p>
            </li>
          ) : (
            <li className={s.car_struct_list_item}>
              <MdOutlineElectricalServices color="black" />
              <p className={s.car_struct_text}>{battery_capacity}</p>
            </li>
          )}
        </ul>
      </div>
      <div>
        <hr />
        <div className={s.car_info}>
          <h3 className={s.car_price}>$ {price}</h3>
          <button
            onClick={() => {
              navigate(`/carInfo/${id}/${car_name.replace(/ /g, "_")}`)
            }}
            className={s.moreButton}>
            {t("HomePage.CatalogBlock.buttonText")}
          </button>
        </div>
      </div>
    </li>
  )
}

CarCard.propTypes = {
  car_name: PropTypes.string.isRequired,
  fuel: PropTypes.string.isRequired,
  battery_capacity: PropTypes.number,
  images: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  mileage: PropTypes.number.isRequired,
  country: PropTypes.string,
  volume: PropTypes.number,
  transmission: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.string,
}

export default CarCard
