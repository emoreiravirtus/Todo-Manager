<template>
  <div id="app">
    <navbar v-if="user" :user="user"></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components:{
    Navbar
  },
  computed:{
    user(){
      return this.$store.getters["user/user"]
    }
  },
  async created(){
      await this.$store.dispatch("user/listenUserData")
  },
}
</script>

<style lang="scss">
@import "@/style/main.scss";
</style>
