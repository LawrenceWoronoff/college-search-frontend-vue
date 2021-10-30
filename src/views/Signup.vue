<template>
  <div>
    <h1>Sign Up</h1>
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form @submit="formSubmit">
            <div class="form-group">
              <label for="emailField">Email address</label>
              <input type="email" class="form-control" id="emailField" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" required>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="passwordField">Password</label>
              <input type="password" class="form-control" id="passwordField" placeholder="Password" v-model="password" required>
            </div>
            <div class="form-group">
              <label for="confirmPasswordField">Confirm Password</label>
              <input type="password" class="form-control" id="confirmPasswordField" placeholder="Confirm password" v-model="confirm_password" required>
            </div>
            <button type="submit" class="btn btn-primary mt-5">Sign up</button>
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
        mounted() {
            console.log('Singup Component mounted.')
        },
        data() {
            return {
              email: '',
              password: '',
              confirm_password: ''
            };
        },
        methods: {
            formSubmit(e) {
                e.preventDefault();
                
                if(this.password != this.confirm_password)  // If password and confrim password are different
                { 
                  alert("Confirm password dismatch from password.");  // Alert to user
                  this.confirm_password = "";                         // Request to input again.
                  return;
                }

                const params = new URLSearchParams(); // Add params for api endpoint
                params.append('email', this.email);   // Add email
                params.append('password', this.password); // Add password

                // Call Sign Up API to check credentials and perform signup module

                this.axios.post(config.API_LOCATION + '/Auth/sign_up', params, {headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }})
                .then(function (response) {
                    console.log(response.data);
                    if(response.data == "email_exist"){     // If API response is email_exist
                      alert("Your current email is in use now."); // Warn user to use other email
                    }else if(response.data == "success")    // Else if success
                    {
                      alert("You are successfully registered. Please log in."); // Inform user that he registered successfully
                      this.$router.push({ name: 'login' })  

                    }
                })
                .catch(function (error) {
                    console.log(error.data);
                });
            }
        }
    }
</script>