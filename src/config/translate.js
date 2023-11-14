const { default: axios } = require('axios')

export const translate = (sourceText, targetLanguage) => {
  var url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=eng&tl=${targetLanguage}&dt=t&q=${encodeURI(
    sourceText
  )}`

  return axios.get(url).then(({ data }) => data[0][0][0])
}
