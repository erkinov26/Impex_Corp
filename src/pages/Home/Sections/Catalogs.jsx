import React from "react"
import s from "@styles/pages/Home/Catalogs.module.scss"
import { useTranslation } from "react-i18next"
import { CatalogsItem } from "@components/CatalogsItem/CatalogsItem"
import { useAutosList } from "@store/store"

export const Catalogs = () => {
  const { t } = useTranslation()
  const { data } = useAutosList()

  return (
    <section>
      <div className={s.catalogs}>
        <ul className={s.catalogs_list}>
          {data.length > 0 ? (
            <>
              <CatalogsItem
                catalogTitle={t("HomePage.CatalogBlock.titles.newProducts")}
                data={[...data].filter((item) => item.images?.length != 0)}
              />
              {[...data].filter((item) => item.country == "CH").length > 0 && (
                <CatalogsItem
                  catalogTitle={t("HomePage.CatalogBlock.titles.fromChina")}
                  data={[...data].filter(
                    (item) => item.country == "CH" && item.images?.length != 0,
                  )}
                />
              )}
              {[...data].filter((item) => item.country == "SK").length > 0 && (
                <CatalogsItem
                  catalogTitle={t("HomePage.CatalogBlock.titles.fromKorea")}
                  data={[...data].filter(
                    (item) => item.country == "SK" && item.images?.length != 0,
                  )}
                />
              )}
            </>
          ) : (
            <h1 className={s.catalog_type_title}>{t("notFoundDataCatalog")}</h1>
          )}
        </ul>
      </div>
    </section>
  )
}
