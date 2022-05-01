<template>
 
       <div class="row justify-content-center mt-4">
         
           
           <div class="col-md-4">
                   <h4>請先登入</h4>
                   <form  @submit.prevent="sigin">
                         <div>
                              <input type="email" class="form-control" placeholder="請輸入電子信箱" v-model="users.username">
                        </div>
                         <div>
                               <input type="password" class="form-control" placeholder="請輸入密碼" v-model="users.password">
                         </div>
                        
                         <div class="mt-4">
                               <button type="submit"   class="form-control   btn btn-outline-primary">登入</button>
                         </div>
                
                    </form>
                    <div class="mt-5">
                        &copy;2020
                    </div>
          </div>
    
       </div>
</template>
<script>
 export default {
                  data(){
                          return{
                                 users:{
                                       username:'',
                                       password:''
                                       }
                             }
                  },
                  methods:{
                            sigin(){
                                     const vm=this;
                                     const api=`${process.env.APIPATH}/admin/signin`;
                                     this.$http.post(api,vm.users).then((response)=>{
                                               console.log(response.data);
                                           if(response.data.success){
                                           const token = response.data.token; 
                                            const expired = response.data.expired;
                                               document.cookie=`hexToken=${token};expires=${new Date(expired)}`;   
                                          vm.$router.push(`/admin`);

                                     
                                         }
                                     });
                            }
                  },
                  created(){
                              const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'); 
                                console.log('myCookie',myCookie);
                                this.$http.defaults.headers.common.Authorization = myCookie;   
                  }
 }

</script>