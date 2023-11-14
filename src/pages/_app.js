import '@/styles/globals.scss'
// Redux
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { appWithTranslation } from 'next-i18next'
import 'bootstrap/dist/css/bootstrap.min.css'

import PageWrapper from '@/components/PageWrapper'

function App ({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </Provider>
  )
}

export default appWithTranslation(App)
