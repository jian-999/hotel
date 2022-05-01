// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './bus'
import Loading from 'vue-loading-overlay'; 
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component('Loading',Loading);


import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', 
  i18n,
  dictionary: {
    zhTW
  }
})

axios.defaults.withCredentials = true;
Vue.use(VueAxios,axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to,from,next)=>{
                        if(to.meta.requiresAuth){
                                                     const vm=this;
                                                     const api=`${process.env.APIPATH}/api/user/check`;
                                                     axios.post(api).then((response)=>{
                                                               if(response.data.success){
                                                                                          next();
                                                               }else{
                                                                      next({path:'/login'});
                                                                    }
                                                      });
                          }else{
                                 next();
                                }
})