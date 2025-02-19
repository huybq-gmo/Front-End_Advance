<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-lg p-4" style="width: 400px;">
      <h4 class="text-center mb-3">{{ title }}</h4>
      <form @submit.prevent="handleSubmit">
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
          <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }" v-model="form.email"
            placeholder="E-mail address" required />
          <div class="invalid-feedback" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
          <input :type="showPassword ? 'text' : 'password'" class="form-control"
            :class="{ 'is-invalid': errors.password }" v-model="form.password" placeholder="Password" required />
          <button class="input-group-text btn btn-outline-secondary" type="button" @click="togglePassword">
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
          <div class="invalid-feedback" v-if="errors.password">
            {{ errors.password }}
          </div>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
          <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control"
            :class="{ 'is-invalid': errors.confirmPassword }" v-model="form.confirmPassword"
            placeholder="Confirm Password" required />
          <button class="input-group-text btn btn-outline-secondary" type="button" @click="toggleConfirmPassword">
            <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
          <div class="invalid-feedback" v-if="errors.confirmPassword">
            {{ errors.confirmPassword }}
          </div>
        </div>



        <p v-if="errorMessage" class="text-danger text-center mb-3">{{ errorMessage }}</p>

        <button type="submit" class="btn btn-success w-100" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>

      <div class="text-center mt-3">
        <span>Already have an account? </span>
        <a href="#" class="text-primary">Login</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

export default defineComponent({
  name: 'RegisterForm',
  props: {
    title: {
      type: String,
      default: 'Register'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const form = reactive<FormData>({
      email: '',
      password: '',
      confirmPassword: '',
      agree: false
    });

    const errors = reactive<FormErrors>({
      email: '',
      password: '',
      confirmPassword: ''
    });

    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const errorMessage = ref('');

    const validateForm = (): boolean => {
      let isValid = true;
      errors.email = '';
      errors.password = '';
      errors.confirmPassword = '';
      errorMessage.value = '';

      if (!form.email) {
        errors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Please enter a valid email';
        isValid = false;
      }

      if (!form.password) {
        errors.password = 'Password is required';
        isValid = false;
      } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        isValid = false;
      }

      if (!form.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
        isValid = false;
      } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }

      if (!form.agree) {
        errorMessage.value = 'You must agree to the terms and conditions';
        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        emit('submit', { ...form });
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    const toggleConfirmPassword = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };

    return {
      form,
      errors,
      errorMessage,
      showPassword,
      showConfirmPassword,
      handleSubmit,
      togglePassword,
      toggleConfirmPassword
    };
  }
});
</script>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
}

.input-group-text {
  background-color: white;
}

.bi {
  font-size: 1.1rem;
}

.btn-success {
  background-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
}
</style>
