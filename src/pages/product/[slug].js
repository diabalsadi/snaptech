// Translation package
import { translate } from '@/config/translate'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Style package
import cx from 'classnames'
// Redux
import { useSelector } from 'react-redux'
import { getUserInfo } from '@/redux/selectors/user'
// Component
import GoogleMapComponent from '@/components/Map'
import Image from 'next/image'
// Styles
import styles from './Product.module.scss'
import AddToBasket from '@/components/AddToBasket'
import { useRouter } from 'next/router'
import DeleteFromBasket from '@/components/DeleteFromBasket'


const Product = ({ product: { id, srcImage, name, price, description } }) => {
  const user = useSelector(getUserInfo)

  const {locale} = useRouter()

  const { t } = useTranslation('common')

  return (
    <div>
      <h1 className={cx(styles.title, styles[locale])}>
        {name}
      </h1>
      <div className={styles.container}>
        <Image
        className={styles.img}
          src={srcImage}
          width={500}
          height={600}
          quality={100}
          alt={name}
        />
        <div className={styles.description}>
          {description && <div className={cx(styles.itemDescription, styles[locale])}>
            <b>{t("Description")}:</b> {description}
          </div>}
          {price && <div className={cx(styles[locale])}>
            <b>{t("Price")}:</b> {price}
          </div>}
          <AddToBasket product={{id, srcImage, name, price, description}}/>
          <DeleteFromBasket productId={id}/>
        </div>
      </div>
      {user && <GoogleMapComponent />}
    </div>
  )
}

export async function getServerSideProps (context) {
  const { locale, query } = context

  if (!query.id) {
    return {
      notFound: true
    }
  }

  const translateProduct = {
    ...query,
    category: await translate(query?.category, locale),
    description: await translate(query?.description, locale),
    name: await translate(query?.name, locale)
  }

  return {
    props: {
      product: translateProduct,
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  }
}

export default Product
