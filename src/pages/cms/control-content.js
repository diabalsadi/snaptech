import { getUserInfo } from "@/redux/selectors/user";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { translate } from "@/config/translate";
import axios from "axios";

import styles from './control-content.module.scss'
import Button from "@/components/Button/Index";
import { useTranslation } from 'next-i18next'

const Control = ({products, categories}) => {
  const user = useSelector(getUserInfo);
  const router = useRouter();

  const { t } = useTranslation('common')


  useEffect(() => {
    if (!user?.admin) {
      router.push('/cms/login');
    }
  }, [user, router]);

  return <div className={styles.container}>
    {
      [...products, ...categories].map((element, index) => {
        return <div key={`element-${index}`} className={styles.row}>
          {<div className={styles.cell}>{element.id}</div>}
          {element?.name && <div className={styles.cell}>{element.name}</div>}
          {element?.price && <div className={styles.cell}>{element.price}</div>}
          {element?.category && <div className={styles.cell}>{element.category}</div>}
          {element?.categoryName && <div className={styles.cell}>{element.categoryName}</div>}
          {element?.link && <div className={styles.cell}>{element.link}</div>}
          <Button displayName={t('Delete')} onClick={() => {
            console.log('hello')
            axios.get(`/api/delete/${element?.categoryName ? 'category' : 'product'}?id=${element.id}`).then((result) => {
              window.alert(result.data.message)
            })
          }}/>
        </div>
      })
    }
  </div>
};

export async function getServerSideProps ({ locale }) {
  const categories = (await axios.get('http://localhost:3000/api/get/category'))
    .data.result

  const products = (await axios.get('http://localhost:3000/api/get/product'))
  .data.result

  const translateProducts = await Promise.all(
    products?.map(async product => {
      return {
        ...product,
        href: product.category,
        category: await translate(product.category, locale),
        description: await translate(product.description, locale),
        name: await translate(product.name, locale)
      }
    })
  )

  const translateCat = await Promise.all(
    categories.map(async cat => {
      return {
        ...cat,
        categoryName: await translate(cat.categoryName, locale)
      }
    })
  )

  return {
    props: {
      categories: translateCat,
      locale: locale,
      products: translateProducts,
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  }
}

export default Control;
