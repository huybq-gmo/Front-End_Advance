<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { RouterLink } from 'vue-router';

interface FormData {
    email: string;
    password: string;

}

interface FormErrors {
    email: string;
    password: string;
}

export default defineComponent({
    name: 'LoginForm',
    components: {
        RouterLink
    },
    props: {
        title: {
            type: String,
            default: 'Login'
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['submit', 'forgot-password'],
    setup(props, { emit }) {
        const form = reactive<FormData>({
            email: '',
            password: '',
        });

        const errors = reactive<FormErrors>({
            email: '',
            password: ''
        });

        const showPassword = ref(false);
        const errorMessage = ref('');

        const validateForm = (): boolean => {
            let isValid = true;
            errors.email = '';
            errors.password = '';
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

        return {
            form,
            errors,
            errorMessage,
            showPassword,
            handleSubmit,
            togglePassword
        };
    }
});
</script>
<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card shadow-lg p-4" style="width: 400px;">
            <h4 class="text-center mb-3">{{ title }}</h4>
            <form @submit.prevent="handleSubmit">
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
                    <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                        v-model="form.email" placeholder="E-mail address" required />
                    <div class="invalid-feedback" v-if="errors.email">
                        {{ errors.email }}
                    </div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="bi bi-lock"></i></span>
                    <input :type="showPassword ? 'text' : 'password'" class="form-control"
                        :class="{ 'is-invalid': errors.password }" v-model="form.password" placeholder="Password"
                        required />
                    <button class="input-group-text btn btn-outline-secondary" type="button" @click="togglePassword">
                        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                    <div class="invalid-feedback" v-if="errors.password">
                        {{ errors.password }}
                    </div>
                </div>

                <p v-if="errorMessage" class="text-danger text-center mb-3">{{ errorMessage }}</p>

                <button type="submit" class="btn btn-info text-white w-100" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    {{ loading ? 'Logging in...' : 'Login' }}
                </button>
            </form>
            <div class="text-center mt-3">
                <div class="mb-2">

                    <span>
                        Don't have an account?

                    </span>
                    <a href="#" class="text-primary">
                        Register
                    </a>
                </div>

            </div>
        </div>
    </div>
</template>



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

.btn-info {
    background-color: #17a2b8;
}

.btn-info:hover {
    background-color: #138496;
}
</style>