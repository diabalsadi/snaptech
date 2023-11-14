import { useEffect, useState } from 'react'

import styles from './InfiniteScroll.module.scss'

const InfiniteScroll = ({ children, setData, allData = [] }) => {
  const [index, setIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isMoreData, setIsMoreData] = useState(true)

  const handleOnScroll = () => {
    if (
      window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight - 400 &&
      !isLoading &&
      isMoreData
    ) {
      setIsLoading(true)
      setTimeout(() => {
        setIndex(prev => ++prev)
        setData(allData.slice(0, 5 * index))
        setIsLoading(false)
        if (allData.length <= 5 * index) {
          setIsMoreData(false)
        }
      }, 1000)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll)
    return () => {
      window.removeEventListener('scroll', handleOnScroll)
    }
  })

  return (
    <div>
      {children}
      {isLoading && <h2 className={styles.statusMessage}>Loading .... :)</h2>}
      {!isMoreData && <h2 className={styles.statusMessage}>No more data :(</h2>}
    </div>
  )
}

export default InfiniteScroll
