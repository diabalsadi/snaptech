import { translate } from '@/config/translate'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from './Category.module.scss'
import ProductElement from '@/components/ProductElement'
import axios from 'axios'
import InfiniteScroll from '@/components/InfiniteScroll'
import { useState } from 'react'

const Category = ({ products = [], categoryName }) => {
  const [data, setData] = useState(products.slice(0, 5))

  return products.length
    ? <InfiniteScroll setData={setData} allData={products}>
      <h1 className={styles.title}>
        {categoryName}
      </h1>
      <div className={styles.categoryGrid}>
        {data.map((product, index) =>
          <ProductElement key={`product-${index}`} {...product} />
          )}
      </div>
    </InfiniteScroll>
    : <h1 className={styles.title}>No data :(</h1>
}

export async function getServerSideProps (context) {
  const { locale, params: { slug } } = context

  const products = (await axios.get(
    `https://snaptech.vercel.app/api/get/product?category=${slug}`
  )).data.result

  const translateProducts = await Promise.all(
    products.map(async product => {
      return {
        ...product,
        href: product.category,
        category: await translate(product.category, locale),
        description: await translate(product.description, locale),
        name: await translate(product.name, locale)
      }
    })
  )

  return {
    props: {
      categoryName: slug,
      products: translateProducts,
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  }
}

export default Category
