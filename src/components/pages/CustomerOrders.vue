<template>
     <div>
           <loading :active.sync="isLoading" v-if="isLoading"></loading>
           <div class="row mt-3">
                <div class="col-md-4" v-for="item in products" :key='item.id'>
                     <div class="card">
                           <div style="height:150px;"  :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
                           <div class="card-body">
                                      <div class="float-right   badge badge-success">{{item.category}}</div>
                                      <div>{{item.title}}</div>
                                       <div> {{item.content}}</div>
                                       <div class="d-flex justify-content-between">
                                          <del> {{item.origin_price}}</del>
                                          <div> {{item.price}}</div>
                                      </div>
                            </div>
                            <div class="card-footer text-right">
                                  <button type="button" class="btn btn-outline-secondary"  @click="getProduct(item.id)" >
                                      <i class="fas fa-spinner fa-spin" v-if="status.loading==item.id"></i>
                                       查看更多</button>
                                  <button type="button" class="btn btn-outline-danger" @click="getToCart(item.id)">
                                      <i class="fas fa-spinner fa-spin" v-if="status.loading==item.id"></i>
                                      加到購物車</button>

                            </div>
                    </div>
                </div>
          </div>

          <div class="modal fade" id="modal1">
                 <div class="modal-dialog">
                        <div class="modal-content" >
                             <div class="modal-header">
                                  <h4 class="modal-title">
                                      {{product.title}}
                                  </h4>
                                  <button class="close" data-dismiss="modal">
                                      &times;
                                  </button>
                             </div>
                             <div class="modal-body">
                                 <img style="height=150px;">
                                <div class="blockqutoe">
                                       <div>     {{product.content}}</div>
                                       <div class="blockquote-footer text-right">  {{product.description}}</div>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                      <div>{{product.origin_price}}</div>
                                       <div>{{product.price}}</div>

                                 </div>
                                 <select class="form-control mt-3"  v-model="product.num">
                                     <option :value="num" v-for="num in 10" :key="num.id">選購{{num}}{{product.unit}}</option>
                                 </select>

                             </div>
                             <div class="modal-footer">
                                     <span>小計{{product.price*product.num}}元</span>
                                     <button type="button" class="btn btn-outline-danger" @click=" getToCart(product.id,product.num)">加入購物車</button>
                             </div>


                        </div>


                 </div>
          </div>
          
           <ul class="pagination flex-wrap">
                    <li class="page-item" :class="{'disabled':!pagination.has_pre}">
                        <a class="page-link" @click="getProducts(pagination.current_page-1)"><<</a>
                    </li>
                      <li class="page-item"   v-for="page in pagination.total_pages"  :key="page.id"  :class="{'active':pagination.current_page==page}">
                        <a class="page-link" @click="getProducts(page)">{{page}}</a>
                    </li>
                     <li class="page-item" :class="{'disabled':!pagination.has_next}">
                        <a class="page-link"  @click="getProducts(pagination.current_page+1)">>></a>
                    </li>
            </ul>


    
          <table class="table">
                         <thead>
                                <tr>
                                   <th></th>
                                   <th>品名</th>
                                   <th>數量</th>
                                   <th>單價</th>
                                </tr>
                        </thead>
                       <tbody>
                                <tr v-for="item in cart.carts" :key="item.id">
                                     <td @click="delCart(item.id)"><button type="button"><i class="far fa-trash-alt"> </i></button></td>
                                     <td>
                                         <div>{{item.product.title}}</div>
                                         <div v-if="item.coupon">已套用折價劵</div>
                                     </td>
                                     <td>{{item.qty}}/{{item.product.unit}}</td>
                                     <td>{{item.product.price}}</td>
                                </tr>
                      </tbody>
                      <tfoot>
                              <td colspan="3" class="text-right">總計{{cart.total}}</td>
                              <td v-if="cart.total!=cart.final_total">折扣價{{cart.final_total}}</td>
                      </tfoot>

           </table>

           <div class="input-group">
                      <input type="text" class="form-control" placeholder="請輸入優惠碼"  v-model="coupon_code.code">
                      <button type="button" class="btn btn-outline-secondary" @click="addCoupon()">套用優惠碼</button>
            </div>

           <div class="row justify-content-center">
                      <div class="col-6">
                          <form class="mt-5" @submit.prevent="submitOrder()">
                                <div>
                                    <label>Email</label>
                                    <input type="email" class="form-control" placeholder="請輸入email" v-model="users.user.email"  v-validate="'required|email'"  name="email">

                                    <span class="text-danger"  v-if="errors.has('email')">{{errors.first('email')}}</span>

                                  
                                </div>
                                <div>
                                    <label>收件人姓名</label>
                                    <input type="name" class="form-control" placeholder="請輸入姓名" v-model="users.user.name"    name="name"
                                     v-validate="'required'">
                                     <span class="text-danger"  v-if="errors.has('name')">必須填寫姓名</span>
                                </div>
                                <div>
                                    <label>收件人電話</label>
                                    <input type="tel" class="form-control" placeholder="請輸入電話" v-model="users.user.tel" name="tel"  v-validate="'required'">
                                    <span class="text-danger"  v-if="errors.has('tel')">{{errors.first('tel')}}</span>
                                 </div>
                                 <div>
                                     <label>收件人地址</label>
                                     <input type="address" class="form-control" placeholder="請輸入地址" v-model="users.user.address"  v-validate="'required'" name="address">
                                        <span class="text-danger"  v-if="errors.has('address')">{{errors.first('address')}}</span>
                                 </div>
                                 <div>
                                     <label>留言</label>
                                     <textarea rows="5" class="form-control" v-model="users.message"></textarea>
                                 </div>
                                 <div class="text-right">
                                      <button type="submit" class="btn btn-outline-danger">送出訂單</button>
                                </div>
                            </form>
                       </div>
            </div>
        
    </div>
</template>
<script>
import $ from 'jquery';
export default {
                 data(){
                         return{
                                products:[],
                                pagination:{},
                                product:{},
                                cart:{},
                                coupon_code:{
                                           code:''
                                            },
                                 users:{
                                         user:{
                                                name: "",
                                                email: "",
                                                tel: "",
                                                address: ""
                                               },
                                         message:""

                                       }  ,
                                isLoading:false,    
                                status:{
                                        loading:''
                                }     

                               
                         }
                 },
                 methods:{
                                getProducts(page=1){
                                                const vm=this;
                                                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
                                                vm.isLoading=true;
                                                this.$http.get(api).then((response)=>{
                                                    vm.products=response.data.products;
                                                    vm.pagination=response.data.pagination;
                                                vm.isLoading=false;
                                                console.log(response.data);
                                     });
                                },
                                 getProduct(id){
                                                const vm=this;
                                                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
                                                 vm.status.loading=id;
                                                this.$http.get(api).then((response)=>{
                                                    vm.product=response.data.product;
                                                   $("#modal1").modal('show');
                                                    vm.status.loading='';
                                                console.log(response.data);
                                     });
                                },
                                getToCart(id,qty=1){
                                                const vm=this;
                                                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                                                const user={
                                                             product_id:id,
                                                             qty
                                                }
                                                vm.status.loading=id;
                                                this.$http.post(api,{data:user}).then((response)=>{   
                                                      vm.status.loading='';                                            
                                                console.log(response.data);
                                     });
                                },
                                getCarts(){
                                                const vm=this;
                                                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                                           
                                                this.$http.get(api).then((response)=>{    
                                                    vm.cart=response.data.data;                                           
                                                console.log(response.data);
                                              });
                                },
                                newCoupon(){
                                                const vm=this;
                                                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
                                                const form={
                                                              title: "特惠價格",
                                                              is_enabled: 1,
                                                              percent: 50,
                                                              due_date: "2021/10/9",
                                                              code: "code50"
                                                           }
                                                this.$http.post(api,{data:form}).then((response)=>{                                                                                             
                                                     console.log(response.data);
                                              });
                                },
                                addCoupon(){
                                                const vm=this;
                                                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
                                                  vm.isLoading=true;
                                                this.$http.post(api,{data:vm.coupon_code}).then((response)=>{ 
                                                      vm.isLoading=false;                                                                                            
                                                     console.log(response.data);
                                              });
                                },
                                delCart(id){
                                                const vm=this;
                                                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
                                                   vm.isLoading=true;
                                                this.$http.delete(api).then((response)=>{ 
                                                     vm.isLoading=false;                                                  
                                                console.log(response.data);
                                                 });
                                },
                                submitOrder(){
                                                 const vm=this;
                                                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
                                        
                                                    this.$validator.validate().then((result) => {

                                                        if(result){

                                                                   this.$http.post(api,{data:vm.users}).then((response)=>{
                                                    if(response.data.success){
                                                        this.$router.push(`/customerCheckout/${response.data.orderId}`);
                                                        console.log(response.data);
                                                         
                                                    }else{
                                                          console.log(response.data);
                                                             vm.isLoading=false;    
                                                    }                                               
                                                
                                                   
                                                 });
                                                         }else{
                                                                console.log("欄位未填寫")
                                                              }
                                                    });            


                                                
                                }
                 },
                 created(){
                                const vm=this;
                                vm.getProducts();
                                vm.getCarts();
                                vm.newCoupon();
                 } 
}
</script>