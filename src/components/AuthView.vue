<script setup>
import { ref } from 'vue'
import { loginUser, registerUser } from '../utils/authUtils.js'

const props = defineProps({
  initialMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['authenticated'])

const mode = ref('login') // 'login' or 'register'
const errorMessage = ref('')
const successMessage = ref(props.initialMessage || '')

// Login form
const loginForm = ref({
  identifier: '',
  password: ''
})
const showLoginPassword = ref(false)

// Register form
const registerForm = ref({
  fullName: '',
  username: '',
  email: '',
  role: 'Faculty / Instructor',
  password: '',
  confirmPassword: ''
})
const showRegisterPassword = ref(false)

function switchMode(newMode) {
  mode.value = newMode
  errorMessage.value = ''
  successMessage.value = ''
}


function handleLogin() {
  errorMessage.value = ''
  successMessage.value = ''

  const result = loginUser(loginForm.value.identifier, loginForm.value.password)

  if (!result.success) {
    errorMessage.value = result.error || 'Login failed.'
    return
  }

  emit('authenticated', result.session)
}

function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''

  const result = registerUser({
    fullName: registerForm.value.fullName,
    username: registerForm.value.username,
    email: registerForm.value.email,
    role: registerForm.value.role,
    password: registerForm.value.password,
    confirmPassword: registerForm.value.confirmPassword
  })

  if (!result.success) {
    errorMessage.value = result.error || 'Registration failed.'
    return
  }

  // Pre-fill login with the newly created account credentials
  loginForm.value.identifier = registerForm.value.username
  loginForm.value.password = registerForm.value.password

  // Reset register form
  registerForm.value = {
    fullName: '',
    username: '',
    email: '',
    role: 'Faculty / Instructor',
    password: '',
    confirmPassword: ''
  }

  mode.value = 'login'
  successMessage.value = 'Account created successfully! You can now sign in.'
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#FFF9F4]">

    <!-- BRAND / BANNER -->
    <div class="w-full max-w-md text-center mb-8 animate-auth-fade">

      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B3F37] to-[#6A241F] text-white shadow-lg shadow-[#8B3F37]/20 text-2xl font-bold mb-4">
        A
      </div>

      <p class="text-[11px] tracking-[0.2em] font-bold text-[#8B4B45] uppercase">
        Student Information System
      </p>

      <h1 class="text-3xl font-bold text-[#3B2928] mt-1 tracking-tight">
        Campus Attendance
      </h1>

      <p class="text-sm text-[#8A7470] mt-1.5">
        {{ mode === 'login' ? 'Sign in to manage student attendance' : 'Create an account to access the system' }}
      </p>

    </div>

    <!-- MAIN CARD -->
    <div class="w-full max-w-md bg-white rounded-3xl border border-[#E8DDD5] shadow-xl overflow-hidden animate-card">

      <!-- MODE TOGGLE TABS -->
      <div class="grid grid-cols-2 p-1.5 bg-[#F6EDE6] border-b border-[#EADBD1] m-3 rounded-2xl">

        <button
          type="button"
          @click="switchMode('login')"
          class="py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
          :class="mode === 'login' ? 'bg-white text-[#7D2E28] shadow-sm' : 'text-[#8A7470] hover:text-[#3B2928]'"
        >
          Sign In
        </button>

        <button
          type="button"
          @click="switchMode('register')"
          class="py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
          :class="mode === 'register' ? 'bg-white text-[#7D2E28] shadow-sm' : 'text-[#8A7470] hover:text-[#3B2928]'"
        >
          Create Account
        </button>

      </div>

      <!-- ALERTS -->
      <div class="px-6 pt-3">

        <div
          v-if="errorMessage"
          class="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FFF0ED] border border-[#F1D1CB] text-[#A15C52] text-xs sm:text-sm font-medium"
        >
          <span class="text-base leading-none">!</span>
          <span class="flex-1">{{ errorMessage }}</span>
        </div>

        <div
          v-if="successMessage"
          class="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#F0F7ED] border border-[#D3E5CB] text-[#5E7857] text-xs sm:text-sm font-medium"
        >
          <span class="text-base leading-none">✓</span>
          <span class="flex-1">{{ successMessage }}</span>
        </div>

      </div>

      <!-- LOGIN FORM -->
      <div v-if="mode === 'login'" class="p-6 sm:p-7">

        <form @submit.prevent="handleLogin" class="space-y-4">

          <div>
            <label class="block text-xs font-semibold text-[#66544E] mb-1.5">
              Username or Email
            </label>
            <input
              v-model="loginForm.identifier"
              type="text"
              aria-label="Username or Email"
              placeholder="e.g. admin or admin@campus.edu"
              autocomplete="username"
              class="field-input"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold text-[#66544E]">
                Password
              </label>
              <button
                type="button"
                @click="showLoginPassword = !showLoginPassword"
                class="text-[11px] text-[#8B4B45] hover:underline font-medium"
              >
                {{ showLoginPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <input
              v-model="loginForm.password"
              :type="showLoginPassword ? 'text' : 'password'"
              aria-label="Password"
              placeholder="Enter your password"
              autocomplete="current-password"
              class="field-input"
            />
          </div>


          <button
            type="submit"
            class="w-full py-3.5 rounded-xl bg-[#8B3F37] hover:bg-[#77322C] text-white text-sm font-semibold shadow-md shadow-[#8B3F37]/20 transition-all hover:-translate-y-0.5"
          >
            Sign In to System
          </button>

        </form>

        <p class="text-center text-xs text-[#8A7470] mt-6">
          Need an account?
          <button
            type="button"
            @click="switchMode('register')"
            class="text-[#8B3F37] font-semibold hover:underline ml-1"
          >
            Create account
          </button>
        </p>

      </div>

      <!-- REGISTER FORM -->
      <div v-else class="p-6 sm:p-7">

        <form @submit.prevent="handleRegister" class="space-y-4">

          <div>
            <label class="block text-xs font-semibold text-[#66544E] mb-1.5">
              Full Name
            </label>
            <input
              v-model="registerForm.fullName"
              type="text"
              aria-label="Full Name"
              placeholder="e.g. Maria Santos"
              class="field-input"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#66544E] mb-1.5">
                Username
              </label>
              <input
                v-model="registerForm.username"
                type="text"
                aria-label="Username"
                placeholder="e.g. msantos"
                class="field-input"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#66544E] mb-1.5">
                Role
              </label>
              <select
                v-model="registerForm.role"
                aria-label="Role"
                class="field-input cursor-pointer"
              >
                <option value="Attendance Administrator">Administrator</option>
                <option value="Faculty / Instructor">Instructor</option>
                <option value="Staff / Registrar">Staff</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#66544E] mb-1.5">
              Campus Email
            </label>
            <input
              v-model="registerForm.email"
              type="email"
              aria-label="Campus Email"
              placeholder="e.g. msantos@campus.edu"
              class="field-input"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-semibold text-[#66544E]">
                  Password
                </label>
                <button
                  type="button"
                  @click="showRegisterPassword = !showRegisterPassword"
                  class="text-[10px] text-[#8B4B45] hover:underline"
                >
                  {{ showRegisterPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
              <input
                v-model="registerForm.password"
                :type="showRegisterPassword ? 'text' : 'password'"
                aria-label="New Password"
                placeholder="Min 6 characters"
                class="field-input"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#66544E] mb-1.5">
                Confirm
              </label>
              <input
                v-model="registerForm.confirmPassword"
                :type="showRegisterPassword ? 'text' : 'password'"
                aria-label="Confirm Password"
                placeholder="Repeat password"
                class="field-input"
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full py-3.5 mt-2 rounded-xl bg-[#8B3F37] hover:bg-[#77322C] text-white text-sm font-semibold shadow-md shadow-[#8B3F37]/20 transition-all hover:-translate-y-0.5"
          >
            Create Account
          </button>

        </form>

        <p class="text-center text-xs text-[#8A7470] mt-6">
          Already registered?
          <button
            type="button"
            @click="switchMode('login')"
            class="text-[#8B3F37] font-semibold hover:underline ml-1"
          >
            Sign in
          </button>
        </p>

      </div>

    </div>

    <!-- FOOTNOTE -->
    <p class="text-center text-xs text-[#A89690] mt-8">
      Campus Attendance Management System · Module 7 Prototype
    </p>

  </div>
</template>

<style scoped>
@reference "../style.css";

.field-input {
  @apply w-full px-4 py-3 bg-[#FFFDFC] border border-[#E4D8CF] rounded-xl outline-none text-sm text-[#4A3A36] transition-all duration-200;
}

.field-input:focus {
  @apply bg-white border-[#B77F74] ring-2 ring-[#F0DFD9] -translate-y-[1px];
}

.animate-auth-fade {
  animation: authFade .5s ease-out both;
}

.animate-card {
  animation: cardEnter .55s cubic-bezier(.22,1,.36,1) both;
}

@keyframes authFade {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
