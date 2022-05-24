<template>
       <div class="collapse sidebar d-block mt-3"  id="sidebar-menu">
                <div class="sidebar-sticky">
                                  <h6 class="sidebar-heading">
                                      管理員
                                  </h6>
                                  <ul class="nav">
                                      <li class="nav-item">
                                          <a class="nav-link">
                                               <router-link to="/admin/products"> 產品列表</router-link>
                                            </a>
                                             <a class="nav-link">
                                               <router-link to="/order_menu"> 訂單列表</router-link>
                                            </a>
                                              <a class="nav-link">
                                               <router-link to="/coupon_menu"> 優惠劵列表</router-link>
                                            </a>
                                      </li>
                                  </ul>
                                    <h6 class="sidebar-heading mt-3">
                                     模擬功能
                                  </h6>
                                   <ul class="nav">
                                      <li class="nav-item">
                                          <a class="nav-link"> <router-link to="/customerOrders"> 模擬訂單</router-link></a>
                                      </li>
                                  </ul>

               </div>             
       </div>
</template>