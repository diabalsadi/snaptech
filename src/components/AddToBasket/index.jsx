import { useDispatch, useSelector } from 'react-redux'
import styles from './AddToBasket.module.scss'
import { getUserInfo } from '@/redux/selectors/user'
import { addToProduct } from '@/redux/slices/cart'
import { getProductsCart } from '@/redux/selectors/cart'

const AddToBasket = ({ product }) => {
  const user = useSelector(getUserInfo)
  const cart = useSelector(getProductsCart)
  const dispatcher = useDispatch()

  const handleClick = () => {
    if (!Object.keys(user || {})) {
      window.alert('You need to Log in first')
    } else {
      if (cart.includes(product)) {
        window.alert('Already There !!')
      } else dispatcher(addToProduct(product))
    }
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      +
    </button>
  )
}

export default AddToBasket
