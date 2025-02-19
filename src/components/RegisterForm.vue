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
                
                <InputText v-model="email" type="email" size="large" placeholder="Email" class="w-100 p-inputtext-sm" required />
              </span> 
            </div>

            <div class="mb-3">
              <span class="p-inputgroup w-100">
                
                <Password v-model="password" placeholder="Password" size="large" toggleMask class="w-100 p-inputtext-sm input-password" required />
              </span>
            </div>
  

            <div class="mb-3">
              <span class="p-inputgroup w-100">
                
                <Password v-model="confirmPassword" placeholder="Confirm Password" size="large" toggleMask class="w-100 p-inputtext-sm input-password" required />
              </span>
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
  
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  const handleRegister = () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!")
    } else {
      alert(`Registering with email: ${email.value}`)
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
  