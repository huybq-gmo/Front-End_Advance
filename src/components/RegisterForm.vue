<template>
    <div class="register-container">
      <Card class="p-4 shadow-lg">
        <template #content>
          <div class="text-center mb-3">
            <h3>REGISTER</h3>
          </div>
          <form @submit.prevent="handleRegister">

            <div class="mb-3">
              <span class="p-inputgroup w-100">
                
                <InputText v-model="email" type="email" size="large" placeholder="Email" class="w-100 p-inputtext-sm"  />
              </span> 
              <small class="text-danger">{{ errors.email }}</small>
            </div>

            <div class="mb-3">
              <span class="p-inputgroup w-100">
                
                <Password v-model="password" placeholder="Password" size="large" toggleMask class="w-100 p-inputtext-sm input-password"  />
              </span>
              <small class="text-danger">{{ errors.password }}</small>  
            </div>
  

            <div class="mb-3">
              <span class="p-inputgroup w-100">
                
                <Password v-model="confirmPassword" placeholder="Confirm Password" size="large" toggleMask class="w-100 p-inputtext-sm input-password"  />
              </span>
              <small class="text-danger">{{ errors.confirmPassword }}</small>
            </div>

            <Button label="REGISTER" class="w-100 p-button-dark" type="submit" />
          </form>
        </template>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Card from 'primevue/card'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import Button from 'primevue/button'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  interface Error {
    email: string,
    password: string,
    confirmPassword: string
  }
  const errors = ref<Error>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const handleRegister = () => {
    
     if(!email.value.trim()) {
      errors.value.email = 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email.value)) {
      errors.value.email = 'Please enter a valid email';
      
    }
    if(!password.value.trim()) {
      errors.value.password = 'Password is required';
    } 
    if (password.value.length < 6) {
      errors.value.password = 'Password must be at least 6 characters';
    }
    if(!confirmPassword.value.trim()) {
      errors.value.confirmPassword = 'Confirm Password is required';
    }
    if (password.value !== confirmPassword.value) {
      errors.value.confirmPassword= "Passwords do not match!";
    }
    else {
      errors.value.password = '';
      errors.value.email = '';
      errors.value.confirmPassword = '';
      router.push('/')
    }
  }
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
  }
  :deep(.p-password) {
    padding: 0;
  }
  :deep(.p-password input) {
    width: 100%;
  }
  </style>
  