// Translation Packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { translate } from '@/config/translate'
import { useTranslation } from 'next-i18next'
// Style packages
import cx from 'classnames'
// React components
import BannerSlider from '@/components/BannerSlider'
import ProductElement from '@/components/ProductElement'
// Styles
import styles from './Home.module.scss'
import axios from 'axios'

export default function Home ({ categories, locale, products }) {
  const { t } = useTranslation('common')

  return (
    <div>
      <BannerSlider categories={categories} />
      <p className={cx(styles.introduction, styles[locale])}>
        {t('Home_Desc')}
      </p>
      {!!products.length && <div>
            <h1 className={cx(styles.title, styles[locale])}>
              {t('Home_Page_Title')}:
            </h1>
            <div className={styles.products}>
              {products.map((product, index) => <ProductElement key={`product-${index}`} {...product} />
              )}
          </div>
        </div>}
    </div>
  )
}

export async function getServerSideProps ({ locale }) {
  const categories = (await axios.get('http://localhost:3000/api/get/category'))
    .data.result

  const products = (await axios.get('http://localhost:3000/api/get/product?limit=3'))
  .data.result

  const translateProducts = await Promise.all(
    products?.map(async product => {
      return {
        ...product,
        href: product.category,
        category: await translate(product.category, locale),
        description: await translate(product.description, locale),
        name: await translate(product.name, locale)
      }
    })
  )

  const translateCat = await Promise.all(
    categories.map(async cat => {
      return {
        ...cat,
        categoryName: await translate(cat.categoryName, locale)
      }
    })
  )

  return {
    props: {
      categories: translateCat,
      locale: locale,
      products: translateProducts,
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  }
}
