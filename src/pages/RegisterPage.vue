<template>
    <div class="row justify-content-center">
        <div class="col-sm-4 pt-5">
            <div class="card card-box-shadow">
                <div class="card-body text-center">
                    <h5 class="card-title">Register</h5>
                    <p class="card-text">Use these awesome forms to register your account.</p>
                    <form @submit.prevent="onRegister()"
                        class="h-100 d-flex flex-column align-items-center justify-content-center needs-validation @">
                        <div class="col-sm-10 mb-2">
                            <input type="text" class="form-control" id="name" autocomplete="off" name="name"
                                placeholder="Name" v-model="name" v-bind:class="(errors.name)?'is-invalid':''" value="">
                            <div class="invalid-feedback">
                                {{ errors.name }}
                            </div>
                        </div>
                        <div class="col-sm-10 mb-2">
                            <input type="text" class="form-control" id="email" autocomplete="off" name="email"
                                placeholder="Email" v-model="email" v-bind:class="(errors.email)?'is-invalid':''" value="">
                            <div class="invalid-feedback">
                                {{ errors.email }}
                            </div>
                        </div>
                        <div class="col-sm-10 mb-2">
                            <input type="password" class="form-control" id="password" name="password"
                                v-model="password" v-bind:class="(errors.password)?'is-invalid':''"
                                placeholder="Password">
                            <div class="invalid-feedback">
                                {{ errors.password }}
                            </div>
                        </div>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="password_confirmation"
                                v-model="password_confirmation" v-bind:class="(errors.password_confirmation)?'is-invalid':''"
                                name="password_confirmation" placeholder="Password Confirmation">
                            <div class="invalid-feedback">
                                {{ errors.password_confirmation }}
                            </div>
                        </div>
                        <br>
                        <button type="submit" class="btn btn-primary col-sm-10">Register</button>
                    </form>

                    <p>Already have account? <router-link to="/login">Login</router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RegisterValidations from '@/services/RegisterValidation';
import { REGISTER_ACTION } from '@/store/storeconstants';
import { mapActions } from 'vuex';


export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: [],
        }
    },
    methods: {
        ...mapActions('auth', {
            register: REGISTER_ACTION
        }),
        async onRegister() {
            let validations = new RegisterValidations(this.name, this.email, this.password, this.password_confirmation);

            this.errors = validations.checkValidations();
            const keysToCheck = ['email', 'password', 'password_confirmation', 'name'];

            if (keysToCheck.some(key => key in this.errors)) {
                return false;
            } else {
                let [response, error] = await this.register({ name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation })

                if (error) {
                    for (let key in response.errors) {
                        this.errors[key] = response.errors[key][0];
                    }
                } else {
                    this.$router.push('/');
                }
            }
        },
    },
}
</script>