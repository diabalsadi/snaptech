// React core

// Styles
import cx from 'classnames'
import styles from './NavigationMenu.module.scss'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import universalLinks from '@/data/universalLinks'

const NavigationMenu = ({ isNavBarOpen, onAnimationEnd, closeNavbar }) => {
  const { t } = useTranslation('common')

  return (
    <div
      className={cx(styles.container, { [styles.opened]: isNavBarOpen })}
      onAnimationEnd={onAnimationEnd}
    >
      <div className={styles.menuWrapper}>
        {universalLinks.map(({ link, text }, index) =>
          <Link
            href={link}
            key={`link-${index}`}
            className={styles.navLink}
            onClick={closeNavbar}
          >
            {t(text)}
          </Link>
        )}
      </div>
    </div>
  )
}

export default NavigationMenu
