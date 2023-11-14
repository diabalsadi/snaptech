import { Carousel } from 'react-bootstrap'
import cx from 'classnames'
import styles from './BannerSlider.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const BannerSlider = ({ categories }) => {
  // { image, categoryName, link }
  return (
    <Carousel className={styles.container} variant='dark'>
      {categories.map((category, index) => {
        const { image, categoryName, link } = category
        return (
          <Carousel.Item interval={200000} key={index} va>
            <Link
              className={styles.link}
              href={`/${link}`}
              key={`${categoryName}-link`}
            >
              <div className={styles.headerText}>
                {categoryName}
              </div>
              <Image
                width={1000}
                height={300}
                className={cx(styles.image, 'd-block w-100')}
                src={image}
                alt={`${categoryName}-slide`}
              />
            </Link>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default BannerSlider
