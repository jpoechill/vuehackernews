// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import DotdotLoader from './mixins/dotdot-loader.js'
import MyPlugin from './mixins/my-vue-plugin.js'

Vue.config.productionTip = true;
Vue.use(DotdotLoader);
Vue.use(MyPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
