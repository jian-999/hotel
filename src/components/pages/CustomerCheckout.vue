<template>
       <div>
              <table class="table m-4">
                     <thead>
                            <tr>
                                  <th>品名</th>
                                  <th>數量</th>
                                  <th>單價</th>
                            </tr>
                     </thead>
                     <tbody>
                            <tr v-for="item in order.products" :key="item.id">
                                  <td>{{item.product.title}}</td>
                                  <td>{{item.qty}}/{{item.product.unit}}</td>
                                  <td>{{item.product.price*item.qty}}</td>
                            </tr>
                     </tbody>
                     <tfoot>
                         <tr >
                                  <td></td>
                                  <td class="text-right">總計</td>
                                  <td>{{order.total}}</td>
                            </tr>
                     </tfoot>

              </table>
              <table class="table">
                      <tbody>
                             <tr>
                                 <th style="width:100px;">Email</th>
                                 <td>{{order.user.email}}</td>
                             </tr>
                              <tr>
                                 <th>姓名</th>
                                 <td>{{order.user.name}}</td>
                             </tr>
                              <tr>
                                 <th>收件人電話</th>
                                 <td>{{order.user.tel}}</td>
                             </tr>
                              <tr>
                                 <th>收件人地址</th>
                                 <td>{{order.user.address}}</td>
                             </tr>
                              <tr>
                                 <th>付款狀態</th>
                                 <td class="text-primary">
                                     <span v-if="order.is_paid">已付款</span>
                                     <span v-else>尚未付款</span>
                                 </td>
                             </tr>
                      </tbody>
              </table>
              <div class="text-right">
                   <button  type="button" class="btn btn-outline-danger" @click="payOrder()">確認付款去</button>
              </div>
       </div>
</template>
<script>
import $ from 'jquery';
export default {
                  data(){
                         return{ 
                                  orderId:'',
                                  order:{
                                         user:{
                                              
                                         }
                                  },
                              
                         }
                  },
                  methods:{
                             getOrder(){
                                          const vm=this;
                                          const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;                                            
                                          this.$http.get(api).then((response)=>{
                                               console.log(response); 
                                               vm.order=response.data.order;                                                                                                                                  
                                                 });
                                     },
                          payOrder(){
                                        const vm=this;
                                          const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
                                          this.$http.post(api).then((response)=>{
                                                   vm.getOrder();
                                               console.log(response); 
                                             
                                             
                                                                                     
                                                 });
                                    }
                  },
                  created(){
                             const vm =this;
                              vm.orderId=this.$route.params.orderId;
                              vm.getOrder();
                  }
}



</script>