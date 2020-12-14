<template>
  <div class="col s12 m6">
    <form @submit.prevent="Register">
      <div class="row">
        <div class="col s12">
          <h2 class="center gradient-text">Start using our app</h2>
        </div>

        <div class="row" style="text-align: center">
          <span>Already a member?</span>
          <router-link to="/login"
            ><a class="secondary-btn pink-text">Login</a></router-link
          >
        </div>
      </div>
      <div class="field">
        <label for="name">Name:</label>
        <input type="text" name="name" v-model="user.name" />
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
        <button class="btn pink">Send</button>
      </div>
      <div class="row center">
          <google-login></google-login>
      </div>
    </form>
  </div>
</template>

<script>
import GoogleLogin from "@/components/GoogleLogin"
export default {
    props:["feedback"],
    components:{
      GoogleLogin
    },
    data(){
        return{
            user: {
                name: null,
                email: null,
                password: null
            }
        }
    },
    methods:{
        Register(){
            this.$emit("Register", this.user)
        }
    }
};
</script>

<style>
</style>