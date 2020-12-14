<template>
  <div class="register container">
    <div class="row">
      <register-sidebar></register-sidebar>
      <register-form @Register="Register" :feedback="feedback"></register-form>
    </div>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm"
import RegisterSidebar from '@/components/RegisterSidebar.vue';

export default {
  name: "Register",
  components:{
      RegisterForm,
      RegisterSidebar
  },
  data() {
    return {
      feedback: null,
    };
  },
  methods: {
    async Register(user) {
      if (!user.email || !user.password || !user.name) {
        this.feedback = "Please fill all fields";
      } else {
        if (user.password.length < 6)
          return (this.feedback = "Password too short (at least 6 characters)");
        this.feedback = "";

        let loader = this.$loading.show({
          color: "#ec407a",
          loader: "spinner",
        })
        await this.$store
          .dispatch("user/registerUser", {
            name: user.name,
            email: user.email,
            password: user.password,
          })
          .then(() => {
            user.password = null
            this.$router.push({ name: "Home" })
            loader.hide()
          })
          .catch((err) => {
            this.feedback = err
            if (err.type == 400) {
              this.feedback = "Email already used";
            }
          });
      }
    },
  },
};
</script>