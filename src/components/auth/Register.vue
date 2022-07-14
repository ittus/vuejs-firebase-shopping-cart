<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
      <form id="register-form" role="form" @submit.prevent="onSubmit">
        <h3 class="text-center">Register</h3>
        <div class="form-group">
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="Email Address"
            value
            v-model="email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
        </div>

        <div class="alert alert-danger" role="alert" v-if="v$.$error">
          <span v-for="(errorMessage, i) in errors" :key="i">
            {{ errorMessage }} <br />
          </span>
        </div>

        <div class="form-group">
          <button
            type="submit"
            class="btn btn-success"
            style="width: 100%"
            :disabled="isLoading"
          >
            <i v-if="isLoading" class="fa fa-spinner fa-spin" />
            Register
          </button>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                <router-link to="/login">
                  <a>Login</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useValidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      errors: [],
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    ...mapActions(["clearMessage", "addMessage", "registerByEmail"]),
    onSubmit() {
      this.isLoading = true;
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = {
          email: this.email,
          password: this.password,
        };
        this.registerByEmail(data)
          .then(() => {
            this.clearMessage();
            this.$router.push({ name: "mainpage" });
          })
          .catch((error) => {
            // console.log('register error', error);
            let message_obj = {
              message: error.message,
              messageClass: "danger",
              autoClose: true,
            };
            this.addMessage(message_obj);
          })
          .then(() => {
            this.isLoading = false;
          });
      } else {
        this.errors = [];
        for (let i = 0; i < this.v$.$errors.length; i++) {
          this.errors[
            i
          ] = `${this.v$.$errors[i].$property} : ${this.v$.$errors[i].$message}`;
        }
      }
      this.isLoading = false;
    },
  },
};
</script>
