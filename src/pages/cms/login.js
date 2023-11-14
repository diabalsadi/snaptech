import React, { useEffect, useState } from 'react'
import styles from './login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logInWithEmail, makeItAdmin } from '@/redux/slices/user'
import { getUserInfo } from '@/redux/selectors/user'
import axios from 'axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  const user = useSelector(getUserInfo)

  const dispatcher = useDispatch()

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatcher(logInWithEmail({ email, password }))
  }

  useEffect(() => {
    if(user?.admin) {
      router.push('/cms/control-content');
    }
      if (user?.uid) {
        axios.get(`http://localhost:3000/api/get/users/?id=${user.uid}`)
          .then((credentials) => {
            if(credentials.data.result.role) {
              dispatcher(makeItAdmin())
              router.push('/cms/control-content');
            } else{
              throw('Not An Admin !!')
            }
          })
          .catch((error) => {
            window.alert(error)
          })
      }
    },
    [user]
  )

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email:
          <input
            type='email'
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
            required
          />
        </label>
        <br />
        <label className={styles.label}>
          Password:
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
            required
          />
        </label>
        <br />
        <button type='submit' className={styles.button}>
          Login
        </button>
      </form>
    </div>
  )
}

export async function getServerSideProps ({ locale }) {
  return {
    props: {
      locale: locale,
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  }
}


export default Login
