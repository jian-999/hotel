<template>
   <div> 
            <loading :active.sync="isLoading" v-if="isLoading"></loading>
          <div class="text-right">
              <button type="button" class='btn btn-outline-primary' @click="productModal(true)">建立新的產品</button>
          </div>
           <table class="table mt-3">
                    <thead>
                            <tr>
                                      <th>分類</th>
                                      <th>產品名稱</th>
                                      <th>原價</th>
                                      <th>售價</th>
                                      <th>是否啟用</th>
                                      <th>編輯</th>
                            </tr>
                    </thead>
                    <tbody>
                             <tr v-for="item in products" :key="item.id">
                                      <td>{{item.category}}</td>     
                                      <td>{{item.title}}</td> 
                                      <td>{{item.origin_price}}</td> 
                                      <td>{{item.price}}</td> 
                                      <td>
                                             <div v-if="item.is_enabled" >已啟用</div>      
                                             <div v-else >尚未啟用</div>
                                      </td> 
                                      <td>
                                                <button type="button" class="btn btn-outline-secondary" @click="productModal(false,item)">編輯</button>    
                                                <button type="button" class="btn btn-outline-danger" @click="delProductModal(item)">刪除</button>    
                                      </td> 

                             </tr>
                    </tbody>
            </table>
            <div class="modal fade" id="productModal">
                 <div class="modal-dialog">
                       <div class="modal-content p-2">
                                <div class="modal-header">
                                    <h5 class="modal-title">新增產品</h5>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div classs="modal-body">
                                           <div class="row">
                                                    <div class="col-4 mt-3">
                                                        <div class="form-group">
                                                               <label>輸入圖片網址</label>
                                                               <input type="text" class="form-control" placeholder="請輸入圖片網址" v-model="tempProduct.imageUrl">

                                                        </div>
                                                         <div class="form-group">
                                                               <label>或上傳圖片</label>   <i class="fas fa-spinner fa-spin" v-if="status.loading"></i> 
                                                               <input type="file" ref="files" class="form-control" placeholder="請放入圖片" @change="uploadFile()">

                                                        </div>
                                                     </div>
                                                     <div class="col-8 mt-3">
                                                             <div class="form-group">
                                                                   <label>標題</label>
                                                                   <input type="text" class="form-control" placeholder="請輸入標題"  v-model="tempProduct.title">
                                                             </div>
                                                             <div class="form-row">
                                                                   <div class="col-6">
                                                                          <label>分類</label>
                                                                          <input type="text" class="form-control" placeholder="請輸入分類"  v-model="tempProduct.category">
                                                                   </div>
                                                                    <div class="col-6">
                                                                          <label>單位</label>
                                                                          <input type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                                                                   </div>

                                                             </div>
                                                                <div class="form-row">
                                                                   <div class="col-6">
                                                                          <label>原價</label>
                                                                          <input type="text" class="form-control" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                                                                   </div>
                                                                    <div class="col-6">
                                                                          <label>售價</label>
                                                                          <input type="text" class="form-control" placeholder="請輸入售價" v-model="tempProduct.price">
                                                                   </div>

                                                             </div>
                                                             <div>
                                                                    <label>產品描述</label>
                                                                     <textarea rows="4"  class="form-control" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                                                             </div>
                                                                <div>
                                                                    <label>產品內容</label>
                                                                     <textarea rows="4"  class="form-control" placeholder="請輸入產品內容"  v-model="tempProduct.content"></textarea>
                                                             </div>
                                                             <div class='form-check'>
                                                                     <input type="checkbox" class="form-check-input"  v-model="tempProduct.is_enabled" :true-value="1"  :false-value="0">
                                                                     <label class="form-check-label">是否啟用</label>
                                                             </div>
                                                     </div>


                                           </div>


                                 </div>
                                 <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                                        <button type="button" class="btn btn-outline-danger" @click="updateProduct()" >確定</button>

                                        
                                 </div>
                       </div>
                  </div>
            </div>

             <div class="modal fade" id="delProductModal">
                 <div class="modal-dialog">
                       <div class="modal-content p-0">
                                <div class="modal-header bg-danger ">
                                    <h5 class="modal-title">刪除產品</h5>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div classs="modal-body">
                                          是否刪除<span class="text-danger">{{tempProduct.title}}</span>產品
                                 </div>
                                 <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                                        <button type="button" class="btn btn-outline-danger" @click="delProduct()" >確定</button>

                                        
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
    </div>
</template>
<script>
import $ from 'jquery';
export default {
                 data(){
                        return{
                                 products:[],
                                 pagination:{},
                                 tempProduct:{},
                                 isNew:false,
                                 status:{
                                          loading:false,
                                 },
                                 isLoading:false,
                        }
                 },
                 methods:{
                           getProducts(page=1){
                                          const vm=this;
                                          const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
                                           vm.isLoading=true;
                                          this.$http.get(api).then((response)=>{
                                          vm.products=response.data.products;
                                          vm.pagination=response.data.pagination;
                                            vm.isLoading=false;
                                         console.log(response);
                                     });
                           },
                           productModal(isNew,item){
                                                     if(isNew){
                                                                     const vm=this;
                                                                     vm.tempProduct={};
                                                                     vm.isNew=true;
                                                              }else{
                                                                     const vm=this;
                                                                     vm.tempProduct=Object.assign({},item);
                                                                     vm.isNew=false;  
                                                              }
                                                              $("#productModal").modal('show');
                           },
                           updateProduct(){
                                             const vm=this;
                                             let  api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
                                             let  httpMethod="post";
                                           
                                             if(!vm.isNew){
                                                             api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
                                                             httpMethod="put";
                                             }
                                             this.$http[httpMethod](api,{data:vm.tempProduct}).then((response)=>{
                                                    console.log(response)
                                                      $("#productModal").modal('hide');
                                             })
                           },
                           delProductModal(item){
                                                 const vm=this;
                                                vm.tempProduct=Object.assign({},item);
                                                $("#delProductModal").modal('show');
                           },
                           delProduct(){
                                            const vm=this;
                                            const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
                                            this.$http.delete(api).then((response)=>{
                                                    $("#delProductModal").modal('hide');
                                            console.log(response.data);
                                     });
                           },
                           uploadFile(){
                                          console.log(this);
                                          const uploadedFile=this.$refs.files.files[0];
                                          const vm=this;
                                          const formData=new FormData();
                                          formData.append('file-to-upload',uploadedFile);
                                          const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
                                          vm.status.loading=true;
                                          this.$http.post(api,formData,{
                                                                        headers:{
                                                                               'Content-Type':'multipart/form-data'
                                                                        }
                                          }).then((response)=>{
                                                  if(response.data.success){
                                                         this.$set(vm.tempProduct,'imageUrl',response.data.imageUrl);
                                                          vm.status.loading=false;
                                                  }else{
                                                         this.$bus.$emit('message:push',response.data.message,'danger');
                                                  }
                                          })
                           }
                 },
                 created(){
                           this.getProducts();
                 }
}

</script>