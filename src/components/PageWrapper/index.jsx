import cx from 'classnames'

import Navbar from '../Navbar'

import styles from './PageWrapper.module.scss'
import useSaveUserInfo from '@/hooks/useSaveUserInfo'
import Footer from '../Footer'

const PageWrapper = ({ children }) => {
  useSaveUserInfo()

  return (
    <div>
      <Navbar />
      <div className={cx(styles.container)}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default PageWrapper
