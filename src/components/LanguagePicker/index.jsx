// Next hook
import { useRouter } from 'next/router'

const LanguagePicker = () => {
  const { asPath, locale, pathname, query, replace } = useRouter()
  const options = ['en', 'ar', 'it']

  const handleClick = e => {
    replace({ pathname, query }, asPath, {
      locale: e.target.value
    })
  }

  return (
    <select onChange={handleClick} defaultValue={locale}>
      {options.map(language => {
        return (
          <option key={`option-${language}`} value={language}>
            {language}
          </option>
        )
      })}
    </select>
  )
}

export default LanguagePicker
