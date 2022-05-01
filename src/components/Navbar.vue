<template>
       <div>
                <nav class="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
                     <a class="navbar-brand">Logo</a>
                     <button type="button"  class="navbar-toggler"  data-toggle="collapse"   data-target="#sidebar-menu"
                                aria-expanded="false" aria-label="btn">
                                <span class="navbar-toggler-icon"></span>
                     </button>
                     <input type="search" class="bg-dark form-control">
                     <button type="button" class="btn btn-outline-success text-nowrap" @click="login">登出</button>
                </nav>
       </div>
</template>
<script>
 export default {
                 data(){
                          return{
                             
                             }
                  },
                  methods:{
                            login(){
                                     const vm=this;
                                     const api=`${process.env.APIPATH}/logout`;
                                     this.$http.post(api).then((response)=>{
                                          vm.$router.push(`/login`);
                                         console.log(response.data);
                                     });
                            }
                  },
                  created(){

                  }
 }

</script>