<template>
    <div class="login-container">
      <Card class="p-4 shadow-lg">
        <template #content>
          <div class="text-center mb-3">
            <h3>Login</h3>
          </div>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <span class="p-input-icon-left input-left w-100">
                <i class="pi pi-user"></i>
                <div class="input-email"><InputText v-model="email" type="email" placeholder="E-mail address" class="w-100" required /></div>
              </span>
            </div>
            <div class="mb-3">
              <span class="p-input-icon-left w-100">
                <i class="pi pi-lock"></i>
                <div class="input-password">
                <Password  v-model="password" placeholder="Password" toggleMask class="w-100" required  />
                </div>
              </span>
              
            </div>
            <Button label="Login" class="w-100 p-button-info text-white" type="submit" />
          </form>
          <div class="text-center mt-3">
            <span>Don't have an account? <a href="#" class="text-primary">Register</a></span>
          </div>
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
  
  const handleLogin = () => {
    alert(`Logging in with: ${email.value}`)
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
  }
  .input-email{
    width: 100%;
  }
  :deep(.p-password input) {
  padding-left: 40px !important;
  width: 100%;
}
  .p-input-icon-left {
  position: relative;
  display: block;
}

.p-input-icon-left i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.75rem;
  color: #6c757d;
  z-index: 1;
}

.p-input-icon-left input {
  padding-left: 2.5rem !important; 
  width: 100%;
}
.p-input-icon-left:hover i {
  color: #495057;
}
  </style>
  