/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-10-14 13:32:47
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2022-11-10 18:50:27
 * @FilePath: /ones-ph-web/src/lang/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
// import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
// import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
// import elementJaLocale from 'element-ui/lib/locale/lang/ja'// element-ui lang
// import elementTWLocale from 'element-ui/lib/locale/lang/zh-TW'
import enLocale from './en'
import zhLocale from './zh'
// import esLocale from './es'
// import jaLocale from './ja'
// import tcLocale from './tc'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    // ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    // ...elementZhLocale
  },
  // tc: {
  //   ...tcLocale,
  //   // ...elementTWLocale
  // },
  // es: {
  //   ...esLocale,
  //   // ...elementEsLocale
  // },
  // ja: {
  //   ...jaLocale,
  //   // ...elementJaLocale
  // }
}
export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  console.log(language, 'console.log(language)')
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
// console.log(getLanguage(), '000000000')
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
