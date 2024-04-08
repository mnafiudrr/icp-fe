<template>
  <div class="row justify-content-center">
    <div class="col-sm-4 pt-5">
      <div class="card card-box-shadow">
        <div class="card-body text-center">
          <h5 class="card-title">Login</h5>
          <p class="card-text">Use these awesome forms to login your account.</p>
          <form @submit.prevent="onLogin()"
            class="h-100 d-flex flex-column align-items-center justify-content-center needs-validation @">
            <div class="col-sm-10 mb-2">
              <input type="text" class="form-control" id="email" autocomplete="off" name="email" placeholder="Email"
                value="" v-bind:class="(errors.email)?'is-invalid':''" v-model="email">
              <div class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="password" name="password" placeholder="Password" value=""
                v-bind:class="(errors.password) ? 'is-invalid' : ''" v-model="password">
              <div class="invalid-feedback">
                {{ errors.password }}
              </div>
            </div>
            <br>
            <button type="submit" class="btn btn-primary col-sm-10">Login</button>
          </form>
          <p>Have no account? <router-link to="/register">Register</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginValidations from '@/services/LoginValidation';


export default {
  data() {
    return {
      email: '',
      password: '',
      errors: [],
    }
  },
  methods: {
    onLogin() {
      let validations = new LoginValidations(this.email, this.password);

      this.errors = validations.checkValidations();
      if (this.errors.length) {
        return false;
      }
    },
  },
}
</script>