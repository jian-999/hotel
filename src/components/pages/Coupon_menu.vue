<template>
       <div>
               <table class="table">
                        <thead>
                                <tr>
                                      <th>名稱</th>
                                      <th>折扣百分比</th>
                                      <th>到期日</th>
                                      <th>是否啟用</th>
                                      <th>編輯</th>
                                </tr>
                        </thead>
                         <tbody>
                                <tr v-for="item in coupons" :key="item.id">
                                      <td>{{item.title}}</td>
                                      <td>{{item.percent}}</td>
                                      <td> {{item.due_date}}</td>
                                      <td>
                                          <span v-if="item.is_enabled">已啟用</span>
                                           <span v-else>尚未啟用</span>
                                      </td>
                                      <td>
                                          <button type="button" class="btn btn-outline-secondary" @click="openCouponModal(item)">編輯</button>  
                                            <button type="button" class="btn btn-outline-danger" @click="delCouponModal(item)">刪除</button> 
                                      </td>
                                  
                                </tr>
                        </tbody>
               </table>
                
                <div class="modal fade" id="couponModal">
                          <div class="modal-dialog">
                               <div class="modal-content">
                                       <div class="modal-header">
                                            <div class="modal-title">優惠劵</div>
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                       </div>
                                         <div class="modal-body">
                                              <div class="form-group">
                                                   <label>標題</label>
                                                   <input  type="text"  class="form-control" v-model="tempCoupon.title">
                                              </div>
                                                <div class="form-group">
                                                   <label>折扣百分比</label>
                                                   <input   type="text"   class="form-control" v-model="tempCoupon.percent">
                                              </div>
                                                <div class="form-group">
                                                   <label>日期</label>
                                                   <input  type="date"  class="form-control" v-model="tempCoupon.due_date">
                                              </div>
                                              <div class="form-check">
                                                  <input type="checkbox" class="form-check-input" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                                                  <label  class="form-check-label">是否啟用</label>
                                              </div>
                                       </div>
                                       <div class="modal-footer">
                                             <button data-dismiss="modal" class="btn btn-outline-secondary">取消</button>
                                               <button class="btn btn-outline-danger"  @click="coupon()">確定</button>
                                        </div>
                               </div>
                          </div>
               </div>

                  <ul class="pagination">
                    <li class="page-item" :class="{'disabled':!pagination.has_pre}">
                        <a class="page-link" @click="getCoupon(pagination.current_page-1)"><<</a>
                    </li>
                      <li class="page-item"   v-for="page in pagination.total_pages"  :key="page.id"  :class="{'active':pagination.current_page==page}">
                        <a class="page-link" @click="getCoupon(page)">{{page}}</a>
                    </li>
                     <li class="page-item" :class="{'disabled':!pagination.has_next}">
                        <a class="page-link"  @click="getCoupon(pagination.current_page+1)">>></a>
                    </li>
            </ul>


             <div class="modal fade" id="delModal">
                          <div class="modal-dialog">
                               <div class="modal-content">
                                       <div class="modal-header">
                                            <div class="modal-title">優惠劵</div>
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                       </div>
                                         <div class="modal-body">
                                              是否要刪除<span class="text-danger">{{tempCoupon.title}}</span>優惠劵
                                       </div>
                                       <div class="modal-footer">
                                             <button data-dismiss="modal" class="btn btn-outline-secondary">取消</button>
                                               <button class="btn btn-outline-danger"  @click="delCoupon()">確定</button>
                                        </div>
                               </div>
                          </div>
               </div>

       </div>
</template>
<script>
import $ from 'jquery';
export default {
                 data(){
                         return{
                                 coupons:[],
                                 pagination:{},
                                 tempCoupon:{}
                         }
                 },
                 methods:{
                           getCoupon(page=1){
                                               const vm=this;
                                               const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
                                               this.$http.get(api).then((response)=>{
                                                  vm.coupons=response.data.coupons;
                                                  vm.pagination=response.data.pagination;
                                                  console.log(response); 
                                             
                                             
                                                                                     
                                                 });
                                             },
                      openCouponModal(item){
                                              const vm=this;
                                              vm.tempCoupon=Object.assign({},item);
                                              $("#couponModal").modal("show");
                                       },
                             coupon(){
                                            const vm=this;
                                               const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
                                               this.$http.put(api,{data:vm.tempCoupon}).then((response)=>{
                                                    $("#couponModal").modal("hide");
                                                  console.log(response); 
                                              
                                             
                                                                                     
                                                 });
                                       },
                    delCouponModal(item){
                                               const vm=this;
                                               vm.tempCoupon=Object.assign({},item);
                                               $("#delModal").modal('show');
                                         },
                            delCoupon(){
                                                   const vm=this;
                                                     const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
                                                   this.$http.delete(api).then((response)=>{
                                                     $("#delModal").modal('hide');
                                                    console.log(response.data); 
                                              
                                             
                                                                                     
                                                 });
                                          }   
                 },
                 created(){
                                 this.getCoupon();
                 }
}
</script>