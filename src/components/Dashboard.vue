<template>
       <div>
             <Navbar></Navbar>
             <AlertMessage></AlertMessage>
             <div class="row">
                 <Sidebar class="col-3 col-lg-2 bg-secondary"></Sidebar>
                     <main class="col-9 col-lg-10">
                         <router-view></router-view>
                    </main>
             </div>
       </div>
</template>
<script>
import  Navbar from './Navbar'
import  Sidebar from './Sidebar'
import  AlertMessage from './pages/AlertMessage'
 export default {
               components:{
                           Navbar,
                           Sidebar,
                           AlertMessage
               }  
                             
               
 }

</script>