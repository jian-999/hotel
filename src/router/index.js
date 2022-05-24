import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import CustomerOrders from '@/components/pages/CustomerOrders'
import CustomerCheckout from '@/components/pages/CustomerCheckout'
import Order_menu from '@/components/pages/Order_menu'
import Coupon_menu from '@/components/pages/Coupon_menu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children:[{
                   path: 'products',
                   name: 'Products',
                   component: Products,
                   meta:{requiresAuth:true}
              
               }]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children:[
                {
                   path: 'customerOrders',
                   name: 'CustomerOrders',
                   component: CustomerOrders,                 
                },
                {
                  path: 'customerCheckout/:orderId',
                  name: 'CustomerCheckout',
                  component: CustomerCheckout,                 
               },

            ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children:[
                {
                   path: 'order_menu',
                   name: 'Order_menu',
                   component: Order_menu,                 
                },
                {
                  path: 'coupon_menu',
                  name: 'Coupon_menu',
                  component: Coupon_menu,                 
               },

            ]
    }

  ]
})
