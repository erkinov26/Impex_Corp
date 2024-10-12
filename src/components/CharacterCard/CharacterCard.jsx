import React from "react"
import PropTypes from "prop-types"
import s from "@styles/pages/CardInfo/CardInfo.module.scss"
import { useTranslation } from "react-i18next"

const CharacterCard = ({ data }) => {
  const { t } = useTranslation()
  const titles = ["CarInfo.titles.common.", "CarInfo.titles.engine."]

  return (
    <>
      {titles.map((item, i) => (
        <div className={s.card} key={i}>
          <h2 className={s.card_title}>{t(item + "title")}</h2>
          <ul className={s.card_info_list}>
            <li>
              <div className={s.keys_list}>
                {item == titles[0] ? (
                  <div>
                    <div>{t(item + "car_type")}</div>
                    <div>{t(item + "number_doors")}</div>
                    <div>{t(item + "number_seats")}</div>
                    <div>{t(item + "mileage")}</div>
                    <div>{t(item + "period")}</div>
                    <div>{t(item + "transmission")}</div>
                    <div>{t(item + "drive")}</div>
                  </div>
                ) : (
                  <div>
                    <div>{t(item + "eng_type")}</div>
                    <div>{t(item + "power")}</div>
                    {data.fuel_type !=
                    t("Catalog.characteristics.fuel.electro") ? (
                      <>
                        <div>{t(item + "volume")}</div>
                        <div>{t(item + "consumption")}</div>
                      </>
                    ) : (
                      <>
                        <div>{t(item + "capacity")}</div>
                        <div>{t(item + "per_charge_milleage")}</div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className={s.values_list}>
                {item == titles[0] ? (
                  <>
                    <div>{data.body_type}</div>
                    <div>{data.number_of_doors}</div>
                    <div>{data.number_of_seats}</div>
                    <div>{data.mileage + " " + t("Catalog.km")}</div>
                    <div>{data.release_period}</div>
                    <div>{data.transmission}</div>
                    <div>{data.drive}</div>
                  </>
                ) : (
                  <>
                    <div>{data.fuel_type}</div>
                    <div>{data.power + " " + t("Catalog.hp")}</div>
                    {data.fuel_type !=
                    t("Catalog.characteristics.fuel.electro") ? (
                      <>
                        <div>{data.volume + " " + t("Catalog.liter")}</div>
                        <div>
                          {data.consumption +
                            " " +
                            t("Catalog.liter") +
                            "/100" +
                            t("Catalog.km")}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          {data.battery_capacity + " " + t("Catalog.kwh")}
                        </div>
                        <div>{data.km_per_charge + " " + t("Catalog.km")}</div>
                      </>
                    )}
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  )
}

CharacterCard.propTypes = {
  data: PropTypes.any.isRequired,
}

export default CharacterCard
