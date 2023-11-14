// Footer.js
import React from 'react'
import styles from './Footer.module.scss' // Import your SCSS file
import { useTranslation } from 'next-i18next'
import universalLinks from '@/data/universalLinks'
import Link from 'next/link'

const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <footer className={styles.footer}>
      <p className={styles.date}>© 2023 SnapTech</p>
      <div className={styles.linkContainer}>
        {universalLinks.map(({ link, text }) =>
          <Link href={link} key={text} className={styles.link}>
            {t(text)}
          </Link>
        )}
      </div>
    </footer>
  )
}

export default Footer
