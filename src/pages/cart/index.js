// Translation Packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
// Style packages
import cx from 'classnames'
// Redux components
import { useDispatch, useSelector } from 'react-redux'
import { getProductsCart } from '@/redux/selectors/cart'
// Component
import ProductElement from '@/components/ProductElement'
// Styles
import styles from './Cart.module.scss'
import GoogleMapComponent from '@/components/Map'
import Button from '@/components/Button/Index'
import { removeAll } from '@/redux/slices/cart'

export default function Cart ({ locale }) {
  const cart = useSelector(getProductsCart)
  const { t } = useTranslation('common')
  const dispatcher = useDispatch()

  return (
    <div>
      <Button
        className={cx(styles.button, styles[locale])}
        displayName={t('Buy_All')}
        onClick={() => {
          window.alert('Buyed all')
          dispatcher(removeAll())
        }}
      />
      <h1 className={cx(styles[locale])}>
        {t('Cart_Title')}
      </h1>
      <div className={cx(styles.container, styles[locale])}>
        {cart.map((product, index) =>
          <ProductElement {...product} key={`cart-product-${index}`} />
        )}
      </div>

      <GoogleMapComponent />
    </div>
  )
}

export async function getServerSideProps ({ locale }) {
  return {
    props: {
      locale: locale,
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  }
}
