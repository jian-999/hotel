<template>
       <div>
               <table class="table">
                        <thead>
                                <tr>
                                      <th>購買時間</th>
                                      <th>Email</th>
                                      <th>購買款項</th>
                                      <th>應付金額</th>
                                      <th>是否付款</th>
                                </tr>
                        </thead>
                         <tbody>
                                <tr v-for="item in orders" :key="item.id">
                                      <td>{{item.create_at}}</td>
                                      <td>{{item.user.email}}</td>
                                      <td> <div v-for="item2 in item.products" :key="item2.id"> {{item2.product.title}}X{{item2.qty}}</div></td>
                                      <td>{{item.total}}元</td>
                                      <td class="text-primary">
                                           <div v-if="item.is_paid">已付款</div>
                                           <div v-else>尚未付款</div>
                                      </td>
                                  
                                </tr>
                        </tbody>
               </table>
               <ul class="pagination">
                    <li class="page-item" :class="{'disabled':!pagination.has_pre}">
                        <a class="page-link" @click="getOrders(pagination.current_page-1)"><<</a>
                    </li>
                      <li class="page-item"   v-for="page in pagination.total_pages"  :key="page.id"  :class="{'active':pagination.current_page==page}">
                        <a class="page-link" @click="getOrders(page)">{{page}}</a>
                    </li>
                     <li class="page-item" :class="{'disabled':!pagination.has_next}">
                        <a class="page-link"  @click="getOrders(pagination.current_page+1)">>></a>
                    </li>
            </ul>
       </div>
</template>
<script>
import $ from 'jquery';
export default {
                 data(){
                         return{
                                orders:[],
                                pagination:{}
                         }
                 },
                 methods:{
                           getOrders(page=1){
                                               const vm=this;
                                               const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`;
                                               this.$http.get(api).then((response)=>{
                                                  vm.orders=response.data.orders;
                                                  vm.pagination=response.data.pagination;
                                                  console.log(response); 
                                             
                                             
                                                                                     
                                                 });
                                    },
                            
                 },
                 created(){
                                 this.getOrders();
                              
                 }
}
</script>