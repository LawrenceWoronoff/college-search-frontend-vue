<template>
  <div>
    <h1>Log In</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary mt-5">Log In</button>
          </form>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import config from "../config"


export default {
  data() {
      return {
        email: '',
        password: ''
      };
  },
  methods: {
    onSubmit () {

      const params = new URLSearchParams(); // Add params for api endpoint
      params.append('email', this.email);   // Add email
      params.append('password', this.password); // Add password

      // Call Sign In API to check credentials and perform login module

      this.axios.post(config.API_LOCATION + '/Auth/sign_in', params, {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }})
      .then((response) => {
          if(response.data != "failed") // if log in success set variables in Local storage
          {
            localStorage.setItem('authenticated', true);  // authenticated flag
            localStorage.setItem('userEmail', this.email);  // current logged in user email
            localStorage.setItem('userId', response.data);  // currently logged in user id
            this.$router.push({ name: 'card' });    // After finish login, go to card page
          }else{
            alert("Wrong Credentials!");
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }
}
</script>
