import { getUserInfo } from '@/redux/selectors/user'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './add-content.module.scss'
import axios from 'axios'
import Button from '@/components/Button/Index'

const AddContent = ({ categories }) => {
  // useEffect(() => {
  //     if (!user?.admin) {
  //       router.push('/cms/login');
  //     }
  //   }, [user, router]);
  const user = useSelector(getUserInfo)
  const router = useRouter()
  const formRef = useRef(null)

  const defaultImg =
    'https://i.ibb.co/pdTpsKd/placeholder-images-image-large.webp'

  const [type, setType] = useState('category')
  const [action, setAction] = useState('add')

  const handleSubmit = () => {
    const values = {}
    for (const control of formRef.current.elements) {
      values[control.name] = control.value
    }
    console.log(values)

    if (values.types === 'category') {
      const data = {
        categoryName: values.name,
        image: values.img || defaultImg,
        link: values.link
      }
      if (action === 'update') data.id = values.id
      axios.post(`/api/add/category`, data).then(response => {
        window.alert(response.data.result)
      })
    } else {
      const data = {
        category: values.category,
        description: values.description,
        name: values.name,
        price: `${values.price}$`,
        srcImage: values.img || defaultImg
      }
      if (action === 'update') {
        data.id = values.id
      }

      axios.post(`/api/add/product`, data).then(response => {
        window.alert(response.data.result)
      })
    }
  }

  return (
    <div>
      <form className={styles.form} ref={formRef}>
        {action === 'update' &&
          <div className={styles.inputContainer}>
            <span className={styles.label}>ID:</span>
            <input
              name='id'
              className={styles.input}
              placeholder='id of the category or product'
              type='text'
              required
            />
          </div>}
        <div className={styles.inputContainer}>
          <span className={styles.label}>Choose what to add/update:</span>
          <select
            name='types'
            onChange={e => {
              setType(e.target.value)
            }}
          >
            {['category', 'product'].map(type => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              )
            })}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.label}>Set action:</span>
          <select
            onChange={e => {
              setAction(e.target.value)
            }}
          >
            {['add', 'update'].map(type => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              )
            })}
          </select>
        </div>
        {type === 'product' &&
          <div className={styles.inputContainer}>
            <span className={styles.label}>Category:</span>
            <select name='category'>
              {categories.map(cat => {
                return (
                  <option value={cat.link} key={cat.link}>
                    {cat.link}
                  </option>
                )
              })}
            </select>
          </div>}
        {type === 'product' &&
          <div className={styles.inputContainer}>
            <span className={styles.label}>Description:</span>
            <input
              name='description'
              className={styles.input}
              placeholder='Description Link'
              type='text'
            />
          </div>}
        {type === 'category' &&
          <div className={styles.inputContainer}>
            <span className={styles.label}>Category Link:</span>
            <input
              name='link'
              className={styles.input}
              placeholder='Category Link'
              type='text'
              required
            />
          </div>}

        <div className={styles.inputContainer}>
          <span className={styles.label}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Image:
          </span>
          <input
            name='img'
            className={styles.input}
            placeholder='Category Image:'
            type='text'
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.label}>Name:</span>
          <input
            name='name'
            className={styles.input}
            placeholder='Name'
            type='text'
            required
          />
        </div>
        {type === 'product' &&
          <div className={styles.inputContainer}>
            <span className={styles.label}>Price:</span>
            <input
              name='price'
              className={styles.input}
              placeholder='Price'
              type='number'
              required
            />
          </div>}
        <Button
          onClick={e => {
            if (formRef.current.checkValidity()) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          displayName={'Submit'}
        />
      </form>
    </div>
  )
}

export async function getServerSideProps ({ locale }) {
  const categories = (await axios.get('https://snaptech.vercel.app/api/get/category'))
    .data.result

  return {
    props: {
      categories,
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  }
}
export default AddContent
