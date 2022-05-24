<template>
        <div class="alert-message">
                <div class="alert alert-dismissible" v-for="item in messages"  :key="item.id" :class="'alert-'+item.status">
                    {{item.message}}
                    <span @click="removeMessage(item.id)">&times;</span>

                </div>
        </div>
</template>
<script>
import $ from 'jquery'
export default {
                 data(){
                        return{
                                     messages:[]
                        }
                 },
                 methods:{
                          updateMessage(message,status){
                                           const vm=this;
                                           const timestamp=Math.floor(new Date()/1000);
                                           vm.messages.push({
                                                             message,
                                                             status,
                                                             timestamp
                                           })
                                           vm.removeMessageWithTiming(timestamp);
                          },
                          removeMessageWithTiming(timestamp){
                                          setTimeout(()=>{
                                                        this.messages.forEach((item,i)=>{
                                                            if(item.timestamp===timestamp){
                                                                this.messages.splice(i,1);
                                                            }
                                                        })
                                          },5000);

                          },
                          removeMessage(num){
                                          this.messages.splice(num,1);
                          }
                 },
                 created(){
                              const vm=this;
                                this.$bus.$on('message:push',(message,status='warning')=>{
                                         vm.updateMessage(message,status);
                             })
                 }
}
</script>
<style>
  .alert-message{position:fixed;z-index:1100;top:1rem;right:2rem;}
</style>
