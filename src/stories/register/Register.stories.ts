import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Register from './Register.vue';

export default {
  title: 'Components/Register',
  component: Register,
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the register form'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state of the form'
    },
    onSubmit: { action: 'submit' }
  }
};


export const Default = {
  args: {
    title: 'Register'
  }
};


export const Loading = {
  args: {
    ...Default.args,
    loading: true
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const emailInput = canvasElement.querySelector('input[type="email"]');
    const passwordInput = canvasElement.querySelectorAll('input[type="password"]')[0];
    const confirmPasswordInput = canvasElement.querySelectorAll('input[type="password"]')[1];
    const agreeCheckbox = canvasElement.querySelector('input[type="checkbox"]');

    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'test@example.com';
      await emailInput.dispatchEvent(new Event('input'));
    }

    if (passwordInput) {
      (passwordInput as HTMLInputElement).value = 'password123';
      await passwordInput.dispatchEvent(new Event('input'));
    }

    if (confirmPasswordInput) {
      (confirmPasswordInput as HTMLInputElement).value = 'password123';
      await confirmPasswordInput.dispatchEvent(new Event('input'));
    }

    if (agreeCheckbox) {
      await (agreeCheckbox as HTMLInputElement).click();
    }
  }
};


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

    const confirmPasswordError = document.createElement('div');
    confirmPasswordError.className = 'invalid-feedback';
    confirmPasswordError.innerText = 'Confirm password is required';

    const emailInput = canvasElement.querySelector('input[type="email"]');
    const passwordInput = canvasElement.querySelectorAll('input[type="password"]')[0];
    const confirmPasswordInput = canvasElement.querySelectorAll('input[type="password"]')[1];

    if (emailInput) {
      emailInput.classList.add('is-invalid');
      emailInput.parentElement?.appendChild(emailError);
    }
    if (passwordInput) {
      passwordInput.classList.add('is-invalid');
      passwordInput.parentElement?.appendChild(passwordError);
    }
    if (confirmPasswordInput) {
      confirmPasswordInput.classList.add('is-invalid');
      confirmPasswordInput.parentElement?.appendChild(confirmPasswordError);
    }

  }
};


export const Filled = {
  args: {
    ...Default.args
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const emailInput = canvasElement.querySelector('input[type="email"]');
    const passwordInput = canvasElement.querySelectorAll('input[type="password"]')[0];
    const confirmPasswordInput = canvasElement.querySelectorAll('input[type="password"]')[1];
    const agreeCheckbox = canvasElement.querySelector('input[type="checkbox"]');

    if (emailInput) {
      (emailInput as HTMLInputElement).value = 'test@example.com';
      await emailInput.dispatchEvent(new Event('input'));
    }

    if (passwordInput) {
      (passwordInput as HTMLInputElement).value = 'password123';
      await passwordInput.dispatchEvent(new Event('input'));
    }

    if (confirmPasswordInput) {
      (confirmPasswordInput as HTMLInputElement).value = 'password123';
      await confirmPasswordInput.dispatchEvent(new Event('input'));
    }

    if (agreeCheckbox) {
      await (agreeCheckbox as HTMLInputElement).click();
    }
  }
};
