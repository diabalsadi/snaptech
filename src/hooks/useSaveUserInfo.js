// React core
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// Redux
import { checkUserInfo } from '@/redux/slices/user'
import { waitForUser } from '@/services/AuthService'
import { setProduct } from '@/redux/slices/cart'

const useSaveUserInfo = () => {
  const dispatcher = useDispatch()

  useEffect(
    () => {
      waitForUser()
      dispatcher(checkUserInfo())
      dispatcher(setProduct())
    },
    [dispatcher]
  )
}

export default useSaveUserInfo
