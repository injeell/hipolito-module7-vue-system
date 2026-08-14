<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}

function goTo(section) {
  closeMenu()

  setTimeout(() => {
    const element = document.getElementById(section)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, 100)
}
</script>

<template>
  <!-- DESKTOP SIDEBAR -->
  <aside
    class="hidden lg:flex fixed left-0 top-0 bottom-0 w-[270px] z-50 flex-col bg-gradient-to-b from-[#8B3F37] via-[#7D2F2A] to-[#68211D] text-white shadow-xl"
  >

    <!-- BRAND -->
    <div class="px-6 py-7 border-b border-white/10">

      <button
        @click="goTo('dashboard')"
        class="flex items-center gap-3 text-left w-full"
      >

        <div class="brand-logo">
          A
        </div>

        <div>

          <p class="text-lg font-bold tracking-wide">
            CAMPUS
          </p>

          <p class="text-lg font-bold tracking-wide -mt-1">
            ATTENDANCE
          </p>

          <p class="text-[10px] text-white/60 mt-1">
            Student Information System
          </p>

        </div>

      </button>

    </div>

    <!-- NAVIGATION -->
    <nav class="flex-1 px-4 py-6 overflow-y-auto">

      <p class="sidebar-heading">
        MAIN
      </p>

      <button
        @click="goTo('dashboard')"
        class="sidebar-link active-link"
      >
        <span class="sidebar-icon">⌂</span>
        Dashboard
      </button>

      <button
        @click="goTo('add-attendance')"
        class="sidebar-link"
      >
        <span class="sidebar-icon">＋</span>
        Record Attendance
      </button>

      <button
        @click="goTo('records')"
        class="sidebar-link"
      >
        <span class="sidebar-icon">▣</span>
        Attendance Records
      </button>

      <button
        @click="goTo('about')"
        class="sidebar-link"
      >
        <span class="sidebar-icon">i</span>
        About System
      </button>

      <div class="sidebar-divider"></div>

      <p class="sidebar-heading">
        SYSTEM
      </p>

      <div class="sidebar-info">

        <span class="sidebar-info-dot"></span>

        <div>
          <p class="text-xs font-semibold">
            System Online
          </p>

          <p class="text-[10px] text-white/50 mt-1">
            All systems operational
          </p>
        </div>

      </div>

    </nav>

    <!-- ADMINISTRATOR -->
    <div class="px-4 pb-4">

      <div class="admin-sidebar-card">

        <div class="admin-sidebar-avatar">
          A
        </div>

        <div class="min-w-0 flex-1">

          <p class="text-sm font-semibold">
            Administrator
          </p>

          <p class="text-[10px] text-white/55 mt-0.5">
            Attendance Management
          </p>

        </div>

      </div>

    </div>

  </aside>

  <!-- MOBILE HEADER -->
  <header
    class="lg:hidden sticky top-0 z-50 bg-[#FFF9F4]/95 backdrop-blur-md border-b border-[#E8DDD5]"
  >

    <div class="h-[70px] px-4 flex items-center justify-between">

      <!-- HAMBURGER -->
      <button
        @click="menuOpen = !menuOpen"
        class="mobile-menu-button"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
      >

        <span
          class="hamburger-line"
          :class="menuOpen ? 'first-open' : ''"
        ></span>

        <span
          class="hamburger-line"
          :class="menuOpen ? 'second-open' : ''"
        ></span>

        <span
          class="hamburger-line"
          :class="menuOpen ? 'third-open' : ''"
        ></span>

      </button>

      <!-- MOBILE BRAND -->
      <button
        @click="goTo('dashboard')"
        class="mobile-brand"
      >

        <div class="mobile-brand-logo">
          A
        </div>

        <div class="text-left">

          <p class="text-sm font-bold text-[#4A302C]">
            Campus Attendance
          </p>

          <p class="text-[10px] text-[#9A837B]">
            Student Information System
          </p>

        </div>

      </button>

      <!-- MOBILE ADMIN -->
      <div class="mobile-admin-circle">
        A
      </div>

    </div>

    <!-- MOBILE DRAWER -->
    <Transition name="drawer">

      <div
        v-if="menuOpen"
        class="fixed inset-0 z-[60] lg:hidden"
      >

        <!-- OVERLAY -->
        <button
          class="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          @click="closeMenu"
          aria-label="Close menu"
        ></button>

        <!-- DRAWER -->
        <aside
          class="absolute left-0 top-0 bottom-0 w-[290px] max-w-[85vw] bg-gradient-to-b from-[#8B3F37] via-[#7D2F2A] to-[#68211D] text-white shadow-2xl flex flex-col"
        >

          <!-- MOBILE BRAND -->
          <div
            class="px-5 py-6 border-b border-white/10 flex items-center justify-between"
          >

            <div class="flex items-center gap-3">

              <div class="brand-logo small-logo">
                A
              </div>

              <div>

                <p class="font-bold">
                  CAMPUS ATTENDANCE
                </p>

                <p class="text-[10px] text-white/55">
                  Student Information System
                </p>

              </div>

            </div>

            <button
              @click="closeMenu"
              class="drawer-close"
              aria-label="Close menu"
            >
              ×
            </button>

          </div>

          <!-- MOBILE NAVIGATION -->
          <nav class="flex-1 px-4 py-6">

            <p class="sidebar-heading">
              MAIN
            </p>

            <button
              @click="goTo('dashboard')"
              class="sidebar-link active-link"
            >
              <span class="sidebar-icon">⌂</span>
              Dashboard
            </button>

            <button
              @click="goTo('add-attendance')"
              class="sidebar-link"
            >
              <span class="sidebar-icon">＋</span>
              Record Attendance
            </button>

            <button
              @click="goTo('records')"
              class="sidebar-link"
            >
              <span class="sidebar-icon">▣</span>
              Attendance Records
            </button>

            <button
              @click="goTo('about')"
              class="sidebar-link"
            >
              <span class="sidebar-icon">i</span>
              About System
            </button>

            <div class="sidebar-divider"></div>

            <div class="sidebar-info">

              <span class="sidebar-info-dot"></span>

              <div>
                <p class="text-xs font-semibold">
                  System Online
                </p>

                <p class="text-[10px] text-white/50 mt-1">
                  All systems operational
                </p>
              </div>

            </div>

          </nav>

          <!-- MOBILE ADMINISTRATOR -->
          <div class="px-4 pb-5">

            <div class="admin-sidebar-card">

              <div class="admin-sidebar-avatar">
                A
              </div>

              <div class="min-w-0 flex-1">

                <p class="text-sm font-semibold">
                  Administrator
                </p>

                <p class="text-[10px] text-white/55 mt-0.5">
                  Attendance Management
                </p>

              </div>

            </div>

          </div>

        </aside>

      </div>

    </Transition>

  </header>
</template>

<style scoped>
@reference "../style.css";

.brand-logo {
  @apply w-12 h-12 rounded-2xl bg-[#FFF2E8] text-[#8B3F37] flex items-center justify-center font-bold text-xl shadow-sm;
}

.small-logo {
  @apply w-10 h-10 text-base rounded-xl;
}

.sidebar-heading {
  @apply text-[10px] tracking-[0.18em] font-bold text-white/40 px-4 mb-3;
}

.sidebar-link {
  @apply w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/80 transition-all duration-200 mb-1;
}

.sidebar-link:hover {
  @apply bg-white/10 text-white translate-x-1;
}

.active-link {
  background: #FFF4EC;
  color: #6D2924;
  box-shadow: 0 6px 18px rgba(45, 10, 5, 0.12);
}

.active-link:hover {
  background: #FFF4EC;
  color: #6D2924;
  transform: none;
}

.sidebar-icon {
  @apply w-8 text-center text-lg;
}

.sidebar-divider {
  @apply h-px bg-white/10 my-6;
}

.sidebar-info {
  @apply flex items-center gap-3 px-4 py-4 rounded-xl bg-black/10 border border-white/10;
}

.sidebar-info-dot {
  @apply w-2.5 h-2.5 rounded-full bg-[#AFCB9C] shadow-[0_0_12px_rgba(175,203,156,.7)];
}

.admin-sidebar-card {
  @apply flex items-center gap-3 px-4 py-3.5 rounded-xl bg-black/10 border border-white/10;
}

.admin-sidebar-avatar {
  @apply w-10 h-10 rounded-full bg-[#FFF2E8] text-[#8B3F37] flex items-center justify-center font-bold;
}

.mobile-menu-button {
  @apply relative w-10 h-10 rounded-xl bg-[#F3E6DD] flex items-center justify-center;
}

.hamburger-line {
  @apply absolute w-5 h-[2px] rounded-full bg-[#8B3F37] transition-all duration-300;
}

.hamburger-line:nth-child(1) {
  transform: translateY(-6px);
}

.hamburger-line:nth-child(2) {
  transform: translateY(0);
}

.hamburger-line:nth-child(3) {
  transform: translateY(6px);
}

.first-open {
  transform: rotate(45deg) !important;
}

.second-open {
  opacity: 0;
}

.third-open {
  transform: rotate(-45deg) !important;
}

.mobile-brand {
  @apply flex items-center gap-2;
}

.mobile-brand-logo {
  @apply w-9 h-9 rounded-xl bg-[#8B3F37] text-white flex items-center justify-center font-bold;
}

.mobile-admin-circle {
  @apply w-9 h-9 rounded-full bg-[#E7C9BC] text-[#79352F] flex items-center justify-center text-sm font-bold;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-active aside,
.drawer-leave-active aside {
  transition: transform 0.35s cubic-bezier(.22, 1, .36, 1);
}

.drawer-enter-from aside,
.drawer-leave-to aside {
  transform: translateX(-100%);
}

.drawer-close {
  @apply w-9 h-9 rounded-xl bg-white/10 text-white text-2xl flex items-center justify-center hover:bg-white/20 transition;
}
</style>