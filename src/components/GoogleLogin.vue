<template>
  <button class="google-btn" @click="googleAuth">
    Sign in with Google
    <img
      class="u-img-small"
      src="https://img.icons8.com/fluent/48/000000/google-logo.png"
    />
  </button>
</template>
 
<script>
export default {
  data(){
    return{
      loader: null
    }
  },
  computed:{
    user(){
      return this.$store.getters["user/user"]
    }
  },
  methods: {
    async googleAuth() {
      this.loader = this.$loading.show({
        color: "#ec407a",
        loader: "spinner",
      });
      try{
        await this.$store.dispatch("user/signInWithGoogle")
      } catch(e) {
        console.log(e)
      }
    },
  },
  watch:{
    user(){
      if(this.user){
        this.$router.replace("home")
        this.loader.hide();
      }
    }
  }
};
</script>