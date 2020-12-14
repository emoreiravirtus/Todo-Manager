<template>
  <div class="login container">
    <div class="row">
      <login-form @Login="Login" :feedback="feedback"></login-form>
      <login-sidebar></login-sidebar>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm"
import LoginSidebar from "@/components/LoginSidebar"

export default {
  name: "Login",
  components:{
      LoginForm,
      LoginSidebar
  },
  data() {
    return {
      feedback: null,
    };
  },
  methods: {
    async Login(user) {
      if (!user.email || !user.password) {
        this.feedback = "Values are missing";
      } else {
        let loader = this.$loading.show({
          color: "#ec407a",
          loader: "spinner",
        });
        this.feedback = null;
        await this.$store
          .dispatch("user/login", {
            email: user.email,
            password: user.password,
          })
          .then(
            setTimeout(() => {
              this.$router.push({ name: "Home" })
              loader.hide()
            }, 3000)
          )
          .catch((err) => (this.feedback = err));
      }
    },
  },
};
</script>