import { useEffect, useState } from 'react'

import Hamburger from '../../images/svg/burger-menu-svgrepo-com.svg'
import ShoppingBag from '../../images/svg/shopping-bag.svg'
import Link from 'next/link'
import NavigationMenu from '../NavigatonMenu'

import styles from './Navbar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '@/redux/selectors/user'
import { useTranslation } from "next-i18next";
import { logOut, loginWithGoogle } from '@/redux/slices/user'
import LanguagePicker from '../LanguagePicker'
import { getProductsCart } from '@/redux/selectors/cart'

const Navbar = () => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const user = useSelector(getUserInfo)
  const cart = useSelector(getProductsCart)


  const dispatcher = useDispatch()

  const shouldRenderMenu = isNavBarOpen || isTransitioning

  const handleClick = () => {
    setIsTransitioning(true)
    setIsNavBarOpen(prevOpen => !prevOpen)
  }

  const { t } = useTranslation('common')


  useEffect(() => {
      const body = document.body
      if (isNavBarOpen) body.classList.add('noScroll')
      else body.classList.remove('noScroll')
    }, [isNavBarOpen])

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.hamburgerLogo} onClick={handleClick}>
          <Hamburger />
        </div>

        <div className={styles.rightSide}>
          <Link href={{pathname: '/cart', query: cart}}>
            <ShoppingBag className={styles.brandLogo} />
          </Link>
          <div className={styles.signIn}>
            {!user?.uid && <button key={'logIn'} className={styles.signButton} onClick={() => dispatcher(loginWithGoogle())}>{t('SIGN_IN')}</button>}
            {user?.uid && <button key={'logOut'} className={styles.signButton} onClick={() => dispatcher(logOut())}>{t('LOG_OUT')}</button>}
            {user?.displayName && <span key={'displayName'}>{user.displayName}</span>}
            <LanguagePicker />
          </div>
        </div>

        {shouldRenderMenu &&
          <NavigationMenu
            closeNavbar={() => setIsNavBarOpen(false)}
            isNavBarOpen={isNavBarOpen}
            onAnimationEnd={() => setIsTransitioning(false)}
          />}
      </div>
    </nav>
  )
}

export default Navbar
