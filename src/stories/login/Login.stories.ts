import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Login from './Login.vue';
export default {
  title: 'Components/LoginForm',
  component: Login,
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the login form'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state of the form'
    },
    onSubmit: { action: 'submit' },
    onForgotPassword: { action: 'forgot-password' },
    onRegister: { action: 'register' }
  }
}

export const Default = {
  args: {
    title: 'Login'
  }
}

export const Loading = {
  args: {
    ...Default.args,
    loading: true
  }
}


export const WithErrors = {
  args: {
    ...Default.args
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const submitButton = canvasElement.querySelector('button[type="submit"]');

    if (submitButton) {
      await (submitButton as HTMLButtonElement).click();
    }

    const emailError = document.createElement('div');
    emailError.className = 'invalid-feedback';
    emailError.innerText = 'Email is required';

    const passwordError = document.createElement('div');
    passwordError.className = 'invalid-feedback';
    passwordError.innerText = 'Password is required';

    const emailInput = canvasElement.querySelector('input[type="email"]');
    const passwordInput = canvasElement.querySelector('input[type="password"]');

    if (emailInput) {
      emailInput.classList.add('is-invalid');
      emailInput.parentElement?.appendChild(emailError);
    }

    if (passwordInput) {
      passwordInput.classList.add('is-invalid');
      passwordInput.parentElement?.appendChild(passwordError);
    }
  }
};



export const Filled = {
  args: {
    ...Default.args
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const emailInput = canvasElement.querySelector('input[type="email"]')
    const passwordInput = canvasElement.querySelector('input[type="password"]')
    const rememberMe = canvasElement.querySelector('input[type="checkbox"]')
    
    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'test@example.com'
      await emailInput.dispatchEvent(new Event('input'))
    }
    
    if (passwordInput) {
      (passwordInput as HTMLInputElement).value = 'password123'
      await passwordInput.dispatchEvent(new Event('input'))
    }
    
    if (rememberMe) {
      await (rememberMe as HTMLInputElement).click()
    }
  }
}