<template>
  <nav>
    <div class="nav-wrapper pink">
      <a href="#" class="brand-logo">Todo Manager</a>
    </div>
  </nav>
</template>

<script>
export default {
    props:["user"],
    methods:{
    async Logout(){
      await this.$store.dispatch("user/logout", this.user).then(this.$router.push({name: "Login"}))
    }
  }

}
</script>

<style>

</style>