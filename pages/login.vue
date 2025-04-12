<template>
  <div class="bg-primary">
    <img src="~/assets/img/login_logo.png" alt="Logo" class="login-logo" />
    <div class="main-container">
      <div class="login-container">
        <h2 class="login-title">
          probusiness
          <img src="~/assets/img/logo.png" alt="Logo" class="login-logo" />
        </h2>
        <div class="login-body">
          <h1 class="login-body-title">¡Bienvenido de nuevo!</h1>
          <span>Ingresa tu correo y contraseña para acceder a tu cuenta </span>
          <form class="login-form">
            <div class="form-group">
              <label for="email">Correo</label>
              <input
                v-model="email"
                type="email"
                id="email"
                placeholder="Ingresa tu correo electrónico"
                :class="{
                  'input-error': formErrors.email,
                }"
                @blur="validateField('email')"
              />
              <small v-if="formErrors.email" class="input-message-error">
                {{ formErrors.email }}
              </small>
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <div class="password-input">
                <input
                  v-model="password"
                  ref="passwordInput"
                  type="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  :class="{
                    'input-error': formErrors.password,
                  }"
                  @blur="validateField('password')"
                />

                <Icon
                  :name="showPassword ? 'lucide:eye' : 'lucide:eye-off'"
                  @click="handleShowPassword"
                  class="password-icon"
                />
              </div>
              <small v-if="formErrors.password" class="input-message-error">
                {{ formErrors.password }}
              </small>
            </div>
            <button
              type="submit"
              class="primary-button"
              @click.prevent="handleLogin"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <div class="flex justify-between mt-4 text-xs text-white">
        <small>Probusiness® 2025</small>
        <small class="mx-2">Version 1.2.6</small>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'no-sidebar'
})
import AuthService from "@/services/auth.service";
const showPassword = ref(false);
const passwordInput = ref(null);
const email = ref("");
const password = ref("");
const validationRules = {
  email: [
    (v: string) => !!v || "El correo es requerido",
    (v: string) => /.+@.+\..+/.test(v) || "El correo debe ser válido",
  ],
  password: [
    (v: string) => !!v || "La contraseña es requerida",
    (v: string) =>
      v.length >= 6 || "La contraseña debe tener al menos 6 caracteres",
  ],
};

// Estado de errores
const formErrors = ref<Record<string, string>>({
  email: "",
  password: "",
});
const validateField = (field: "email" | "password") => {
  const value = field === "email" ? email.value : password.value;
  const error = validationRules[field]
    .map((rule) => rule(value))
    .find((result) => result !== true);

  if (typeof error === "string") {
    formErrors.value[field] = error;
  } else {
    formErrors.value[field] = "";
  }
};
const handleShowPassword = () => {
  showPassword.value = !showPassword.value;
  if (showPassword.value) {
    passwordInput.value.type = "text";
  } else {
    passwordInput.value.type = "password";
  }
};
const validateForm = () => {
  validateField("email");
  validateField("password");

  return !formErrors.value.email && !formErrors.value.password;
};

// Manejar el envío del formulario
const handleLogin = async () => {
  if (validateForm()) {
   await AuthService.login({
      email: email.value,
      password: password.value,
    })
      .then((response) => {
        console.log("Login successful", response);
        // Redirigir a la página de inicio o realizar otra acción
      })
      .catch((error) => {
        console.error("Error en el inicio de sesión", error);
        // Manejar el error de inicio de sesión
      });
  } else {
    console.log("El formulario contiene errores");
  }
};
</script>     
  