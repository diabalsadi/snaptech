// Style package
import cx from 'classnames'
// Components
import Image from 'next/image'
import Link from 'next/link'
// Next hook
import { useRouter } from 'next/router'
// Styles
import styles from './ProductElement.module.scss'

const ProductElement = ({ description, id, name, price, srcImage }) => {
  const { locale } = useRouter()

  return (
    <Link
      href={{
        pathname: `product/${id}`,
        query: { description, id, name, price, srcImage }
      }}
      className={styles.container}
    >
      <Image src={srcImage} width={250} height={250} alt={description}/>
      {name &&
        <div className={styles.text}>
          {name}
        </div>}
      {price &&
        <div className={styles.text}>
          {price}
        </div>}
      {description &&
        <div className={cx(styles.description, styles[locale])}>
          {description}
        </div>}
    </Link>
  )
}

export default ProductElement