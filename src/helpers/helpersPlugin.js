import helpers from './helpers'
export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    $helpers: {
      get () {
        return helpers
      }
    }
  })
}
