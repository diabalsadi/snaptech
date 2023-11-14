import { getUserInfo } from '@/redux/selectors/user'
import { useDispatch, useSelector } from 'react-redux'

import styles from './DeleteFromBasket.module.scss'
import { removeFromProduct } from '@/redux/slices/cart'

const DeleteFromBasket = ({ productId }) => {
  const user = useSelector(getUserInfo)
  const dispatcher = useDispatch()

  const handleClick = () => {
    if (!Object.keys(user || {})) {
      window.alert('You need to Log in first')
    } else {
      dispatcher(removeFromProduct({ id: productId }))
    }
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      -
    </button>
  )
}

export default DeleteFromBasket
