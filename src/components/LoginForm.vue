<template>
  <div class="col s12 m6">
    <form @submit.prevent="Login">
      <div class="row">
        <div class="col s2">
          <img
            id="img-logo"
            src="https://img.icons8.com/cotton/64/000000/apple-watch-apps.png"
          />
        </div>
        <div class="col s10">
          <h2 class="center gradient-text">Welcome to Todo Manager</h2>
        </div>
      </div>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="user.email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="user.password" />
      </div>
      <div class="field center red-text">
        <span v-if="feedback"> {{ feedback }} </span>
      </div>
      <div class="field center">
        <button class="btn pink lighten-1">Enter</button>
      </div>
      <div class="row center">
          <google-login></google-login>
      </div>
      <div class="row" style="text-align: center">
        <span>Don't have an account?</span>
        <router-link to="/register"
          ><a class="secondary-btn pink-text">Create an account</a></router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import GoogleLogin from "@/components/GoogleLogin";

export default {
  props: ["feedback"],
  components: {
    GoogleLogin,
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    Login() {
      this.$emit("Login", this.user);
    },
  },
};
</script>