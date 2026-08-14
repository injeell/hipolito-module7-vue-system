<script setup>
import { ref, computed, onMounted } from 'vue'

import AppHeader from './components/AppHeader.vue'
import AttendanceForm from './components/AttendanceForm.vue'
import AttendanceList from './components/AttendanceList.vue'
import AppFooter from './components/AppFooter.vue'

const records = ref([])
const searchTerm = ref('')
const editingId = ref(null)
const editingRecord = ref(null)

const message = ref('')
const messageType = ref('success')

onMounted(() => {
  const saved = localStorage.getItem('attendance-records')

  if (saved) {
    records.value = JSON.parse(saved)
  }
})

function saveRecords() {
  localStorage.setItem(
    'attendance-records',
    JSON.stringify(records.value)
  )
}

function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type

  setTimeout(() => {
    message.value = ''
  }, 3500)
}

function addRecord(newRecord) {
  records.value.push({
    id: Date.now(),
    ...newRecord
  })

  saveRecords()

  showMessage(
    `${newRecord.studentName} was successfully added as ${newRecord.status}.`
  )
}

function updateRecord(updatedRecord) {
  const index = records.value.findIndex(
    record => record.id === editingId.value
  )

  if (index !== -1) {
    records.value[index] = {
      id: editingId.value,
      ...updatedRecord
    }
  }

  saveRecords()

  editingId.value = null
  editingRecord.value = null

  showMessage(
    `${updatedRecord.studentName}'s attendance was successfully updated.`
  )
}

function handleSave(record) {
  if (editingId.value !== null) {
    updateRecord(record)
  } else {
    addRecord(record)
  }
}

function editRecord(record) {
  editingId.value = record.id
  editingRecord.value = { ...record }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function cancelEdit() {
  editingId.value = null
  editingRecord.value = null
}

function deleteRecord(id) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this attendance record?'
  )

  if (!confirmed) return

  records.value = records.value.filter(
    record => record.id !== id
  )

  saveRecords()

  showMessage(
    'The attendance record has been deleted.',
    'delete'
  )
}

const filteredRecords = computed(() => {
  const keyword = searchTerm.value.toLowerCase().trim()

  if (!keyword) {
    return records.value
  }

  return records.value.filter(record =>
    record.studentID.toLowerCase().includes(keyword) ||
    record.studentName.toLowerCase().includes(keyword) ||
    record.section.toLowerCase().includes(keyword) ||
    record.status.toLowerCase().includes(keyword)
  )
})

const totalRecords = computed(() => records.value.length)

const presentCount = computed(() =>
  records.value.filter(
    record => record.status === 'Present'
  ).length
)

const lateCount = computed(() =>
  records.value.filter(
    record => record.status === 'Late'
  ).length
)

const absentCount = computed(() =>
  records.value.filter(
    record => record.status === 'Absent'
  ).length
)

const attendanceRate = computed(() => {
  if (totalRecords.value === 0) return 0

  return Math.round(
    (presentCount.value / totalRecords.value) * 100
  )
})

const presentPercentage = computed(() => {
  if (totalRecords.value === 0) return 0

  return Math.round(
    (presentCount.value / totalRecords.value) * 100
  )
})

const latePercentage = computed(() => {
  if (totalRecords.value === 0) return 0

  return Math.round(
    (lateCount.value / totalRecords.value) * 100
  )
})

const absentPercentage = computed(() => {
  if (totalRecords.value === 0) return 0

  return Math.round(
    (absentCount.value / totalRecords.value) * 100
  )
})
</script>

<template>
  <div class="min-h-screen bg-[#FFF9F4]">

    <AppHeader />

    <div class="lg:pl-[270px] transition-all duration-300">

      <main class="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        <!-- TITLE -->
        <section
          id="dashboard"
          class="scroll-mt-24 mb-7"
        >

          <div
            class="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5"
          >

            <div class="animate-page-enter">

              <p class="section-kicker">
                STUDENT INFORMATION SYSTEM
              </p>

              <h1 class="page-title">
                Dashboard
              </h1>

              <p class="page-subtitle">
                Overview of your student attendance system.
              </p>

            </div>

            <div
              class="admin-card animate-page-enter"
              style="animation-delay: .1s"
            >

              <div class="admin-avatar">
                A
              </div>

              <div class="min-w-0">

                <p class="admin-name">
                  Administrator
                </p>

                <p class="admin-role">
                  Attendance Management
                </p>

              </div>

            </div>

          </div>

        </section>

        <!-- STATISTICS -->
        <section
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7"
        >

          <!-- TOTAL -->
          <div class="dashboard-card animate-card">

            <div class="card-top-row">

              <div>

                <p class="card-label">
                  Total Records
                </p>

                <p class="card-number">
                  {{ totalRecords }}
                </p>

                <p class="card-meta neutral">
                  Attendance records
                </p>

              </div>

              <div class="icon-box maroon-soft">
                #
              </div>

            </div>

            <div class="mini-line maroon-line"></div>

          </div>

          <!-- PRESENT -->
          <div
            class="dashboard-card animate-card"
            style="animation-delay: .08s"
          >

            <div class="card-top-row">

              <div>

                <p class="card-label">
                  Present
                </p>

                <p class="card-number green-number">
                  {{ presentCount }}
                </p>

                <p class="card-meta green-meta">
                  {{ presentPercentage }}% of records
                </p>

              </div>

              <div class="icon-box green-soft">
                ✓
              </div>

            </div>

            <div class="mini-line green-line"></div>

          </div>

          <!-- LATE -->
          <div
            class="dashboard-card animate-card"
            style="animation-delay: .16s"
          >

            <div class="card-top-row">

              <div>

                <p class="card-label">
                  Late
                </p>

                <p class="card-number amber-number">
                  {{ lateCount }}
                </p>

                <p class="card-meta amber-meta">
                  {{ latePercentage }}% of records
                </p>

              </div>

              <div class="icon-box amber-soft">
                ◷
              </div>

            </div>

            <div class="mini-line amber-line"></div>

          </div>

          <!-- ABSENT -->
          <div
            class="dashboard-card animate-card"
            style="animation-delay: .24s"
          >

            <div class="card-top-row">

              <div>

                <p class="card-label">
                  Absent
                </p>

                <p class="card-number red-number">
                  {{ absentCount }}
                </p>

                <p class="card-meta red-meta">
                  {{ absentPercentage }}% of records
                </p>

              </div>

              <div class="icon-box red-soft">
                ×
              </div>

            </div>

            <div class="mini-line red-line"></div>

          </div>

        </section>

        <!-- ATTENDANCE FORM + OVERVIEW -->
        <section
          class="grid grid-cols-1 xl:grid-cols-[1.45fr_0.95fr] gap-5 mb-6"
        >

          <!-- FORM -->
          <div
            id="add-attendance"
            class="scroll-mt-24"
          >

            <!-- SUCCESS MESSAGE ABOVE THE FORM -->
            <Transition name="success">

              <div
                v-if="message"
                class="success-message mb-4"
                :class="
                  messageType === 'delete'
                    ? 'success-delete'
                    : 'success-add'
                "
              >

                <div class="success-icon">
                  {{ messageType === 'delete' ? '!' : '✓' }}
                </div>

                <div class="min-w-0">

                  <p class="success-title">
                    {{ messageType === 'delete'
                      ? 'Record Deleted'
                      : editingRecord
                        ? 'Attendance Updated'
                        : 'Student Successfully Added'
                    }}
                  </p>

                  <p class="success-text">
                    {{ message }}
                  </p>

                </div>

              </div>

            </Transition>

            <AttendanceForm
              :editing-record="editingRecord"
              @save="handleSave"
              @cancel="cancelEdit"
            />

          </div>

          <!-- OVERVIEW -->
          <div class="overview-card">

            <div class="overview-header">

              <div>

                <p class="section-kicker">
                  WEEKLY SUMMARY
                </p>

                <h2 class="overview-title">
                  Attendance Overview
                </h2>

                <p class="overview-subtitle">
                  Current attendance distribution
                </p>

              </div>

              <div class="overview-icon">
                ◇
              </div>

            </div>

            <div class="overview-content">

              <div
                class="donut"
                :style="{
                  background: `conic-gradient(
                    #8AB58F 0 ${presentPercentage}%,
                    #E8B35B ${presentPercentage}% ${presentPercentage + latePercentage}%,
                    #C95E5E ${presentPercentage + latePercentage}% 100%
                  )`
                }"
              >

                <div class="donut-hole">

                  <span class="donut-number">
                    {{ totalRecords }}
                  </span>

                  <span class="donut-label">
                    Total
                  </span>

                </div>

              </div>

              <div class="legend">

                <div class="legend-row">

                  <span class="legend-left">
                    <span class="legend-dot green-bg"></span>
                    Present
                  </span>

                  <strong>
                    {{ presentCount }}
                  </strong>

                </div>

                <div class="legend-row">

                  <span class="legend-left">
                    <span class="legend-dot amber-bg"></span>
                    Late
                  </span>

                  <strong>
                    {{ lateCount }}
                  </strong>

                </div>

                <div class="legend-row">

                  <span class="legend-left">
                    <span class="legend-dot red-bg"></span>
                    Absent
                  </span>

                  <strong>
                    {{ absentCount }}
                  </strong>

                </div>

              </div>

            </div>

            <div class="rate-box">

              <div class="rate-top">

                <span>
                  Attendance Rate
                </span>

                <strong>
                  {{ attendanceRate }}%
                </strong>

              </div>

              <div class="progress-track">

                <div
                  class="progress-fill"
                  :style="{ width: attendanceRate + '%' }"
                ></div>

              </div>

            </div>

          </div>

        </section>

        <!-- MOTIVATION -->
        <section class="motivation-card mb-6">

          <div class="motivation-icon">
            ★
          </div>

          <div class="flex-1">

            <p class="motivation-title">
              Keep up the good work!
            </p>

            <p class="motivation-text">
              Your current attendance rate is
              <strong>{{ attendanceRate }}%</strong>.
            </p>

          </div>

          <div class="motivation-rate">
            {{ attendanceRate }}%
          </div>

        </section>

        <!-- RECORDS -->
        <section
          id="records"
          class="records-section scroll-mt-24"
        >

          <div class="records-header">

            <div>

              <p class="section-kicker">
                ATTENDANCE MANAGEMENT
              </p>

              <h2 class="records-title">
                Recent Attendance Records
              </h2>

              <p class="records-subtitle">
                View, search, edit, and manage student attendance.
              </p>

            </div>

            <div class="search-wrap">

              <span>
                🔍
              </span>

              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search records..."
              />

            </div>

          </div>

          <AttendanceList
            :records="filteredRecords"
            @edit="editRecord"
            @delete="deleteRecord"
          />

        </section>

        <!-- ABOUT -->
        <section
          id="about"
          class="about-card scroll-mt-24"
        >

          <div class="about-mark">
            A
          </div>

          <div>

            <p class="section-kicker">
              ABOUT THE SYSTEM
            </p>

            <h2 class="about-title">
              Campus Attendance Management
            </h2>

            <p class="about-text">
              A responsive Vue.js attendance management prototype
              with CRUD operations, search, validation, and
              browser localStorage persistence.
            </p>

            <div class="tech-list">

              <span class="tech-badge">
                Vue.js
              </span>

              <span class="tech-badge">
                Tailwind CSS
              </span>

              <span class="tech-badge">
                localStorage
              </span>

              <span class="tech-badge">
                CRUD
              </span>

            </div>

          </div>

        </section>

      </main>

      <AppFooter />

    </div>

  </div>
</template>

<style scoped>
@reference "./style.css";

.section-kicker {
  @apply text-[10px] sm:text-[11px] tracking-[0.16em] font-bold text-[#8B4B45];
}

.page-title {
  @apply text-3xl sm:text-4xl font-bold text-[#3B2928] mt-1;
}

.page-subtitle {
  @apply text-sm sm:text-base text-[#8A7470] mt-2;
}

.admin-card {
  @apply flex items-center gap-3 bg-white border border-[#E7DCD4] rounded-2xl px-4 py-3 shadow-sm;
}

.admin-avatar {
  @apply w-10 h-10 rounded-full bg-[#8B3F37] text-white flex items-center justify-center text-sm font-bold;
}

.admin-name {
  @apply text-sm font-semibold text-[#3E2B2A];
}

.admin-role {
  @apply text-[11px] text-[#998780] mt-0.5;
}

.dashboard-card {
  @apply bg-white rounded-2xl border border-[#E8DDD5] p-5 shadow-sm;
}

.card-top-row {
  @apply flex items-start justify-between gap-4;
}

.card-label {
  @apply text-xs sm:text-sm text-[#8F7C76];
}

.card-number {
  @apply text-3xl font-bold text-[#3F302D] mt-1;
}

.card-meta {
  @apply text-[11px] mt-1.5;
}

.neutral {
  @apply text-[#9C8B84];
}

.green-number {
  @apply text-[#628567];
}

.green-meta {
  @apply text-[#76947A];
}

.amber-number {
  @apply text-[#AC7C30];
}

.amber-meta {
  @apply text-[#AF8B50];
}

.red-number {
  @apply text-[#A96060];
}

.red-meta {
  @apply text-[#AF7772];
}

.icon-box {
  @apply w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold;
}

.maroon-soft {
  @apply bg-[#F2E2DC] text-[#8B493F];
}

.green-soft {
  @apply bg-[#E3F0E2] text-[#66876A];
}

.amber-soft {
  @apply bg-[#FAEED7] text-[#A97D2F];
}

.red-soft {
  @apply bg-[#F7E0DD] text-[#A95D5D];
}

.mini-line {
  @apply h-1 rounded-full mt-5;
}

.maroon-line {
  background: linear-gradient(90deg, #8B3F37, #D9A59A);
}

.green-line {
  background: linear-gradient(90deg, #79A77F, #C1DCC0);
}

.amber-line {
  background: linear-gradient(90deg, #D89C3D, #F3D99A);
}

.red-line {
  background: linear-gradient(90deg, #BA6565, #E8B1AC);
}

.overview-card {
  @apply bg-white rounded-2xl border border-[#E8DDD5] shadow-sm p-5 sm:p-6;
}

.overview-header {
  @apply flex items-start justify-between gap-4;
}

.overview-title {
  @apply text-xl font-bold text-[#3F302D] mt-1;
}

.overview-subtitle {
  @apply text-xs text-[#97857E] mt-1;
}

.overview-icon {
  @apply w-10 h-10 rounded-xl bg-[#F3E7DF] text-[#8B4B45] flex items-center justify-center;
}

.overview-content {
  @apply flex flex-col sm:flex-row items-center justify-center gap-8 mt-7;
}

.donut {
  @apply w-40 h-40 rounded-full flex items-center justify-center shrink-0;
}

.donut-hole {
  @apply w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center;
}

.donut-number {
  @apply text-3xl font-bold text-[#3F302D];
}

.donut-label {
  @apply text-xs text-[#9B8981] mt-1;
}

.legend {
  @apply w-full sm:w-auto min-w-[150px] space-y-4;
}

.legend-row {
  @apply flex items-center justify-between gap-5 text-sm text-[#655751];
}

.legend-left {
  @apply flex items-center gap-2;
}

.legend-dot {
  @apply w-2.5 h-2.5 rounded-full;
}

.green-bg {
  background: #8AB58F;
}

.amber-bg {
  background: #E8B35B;
}

.red-bg {
  background: #C95E5E;
}

.rate-box {
  @apply mt-7 rounded-2xl bg-[#FCF7F3] border border-[#EEE2D9] p-4;
}

.rate-top {
  @apply flex items-center justify-between text-xs text-[#78665F];
}

.rate-top strong {
  @apply text-sm text-[#814039];
}

.progress-track {
  @apply h-2 bg-[#EBDDD4] rounded-full mt-3 overflow-hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8B3F37, #D37C6E);
  border-radius: 999px;
  transition: width 900ms cubic-bezier(.22,1,.36,1);
}

/* SUCCESS MESSAGE ABOVE FORM */
.success-message {
  @apply flex items-center gap-3 rounded-2xl px-4 py-4 border shadow-sm;
}

.success-add {
  @apply bg-[#F0F7ED] border-[#D3E5CB] text-[#5E7857];
}

.success-delete {
  @apply bg-[#FFF0ED] border-[#F0D3CD] text-[#9F5D52];
}

.success-icon {
  @apply w-10 h-10 shrink-0 rounded-xl bg-white flex items-center justify-center font-bold shadow-sm;
}

.success-title {
  @apply text-sm font-bold;
}

.success-text {
  @apply text-xs mt-0.5 opacity-80;
}

.success-enter-active,
.success-leave-active {
  transition: all .3s ease;
}

.success-enter-from,
.success-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.motivation-card {
  @apply flex items-center gap-4 bg-gradient-to-r from-[#FAEEE2] to-[#F8E2DB] border border-[#EED8CD] rounded-2xl px-5 py-4 shadow-sm;
}

.motivation-icon {
  @apply w-11 h-11 rounded-xl bg-[#8B3F37] text-[#FFF7ED] flex items-center justify-center font-bold;
}

.motivation-title {
  @apply text-sm font-bold text-[#543630];
}

.motivation-text {
  @apply text-xs text-[#836D66] mt-1;
}

.motivation-rate {
  @apply ml-auto text-lg font-bold text-[#8B3F37];
}

.records-section {
  @apply bg-white border border-[#E8DDD5] rounded-2xl shadow-sm overflow-hidden;
}

.records-header {
  @apply px-5 sm:px-6 py-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 border-b border-[#EEE3DC];
}

.records-title {
  @apply text-xl sm:text-2xl font-bold text-[#3F302D] mt-1;
}

.records-subtitle {
  @apply text-sm text-[#938079] mt-1;
}

.search-wrap {
  @apply relative w-full lg:w-80;
}

.search-wrap span {
  @apply absolute left-4 top-1/2 -translate-y-1/2 text-[#A08F87];
}

.search-wrap input {
  @apply w-full pl-11 pr-4 py-3 rounded-xl bg-[#FFFDFC] border border-[#E3D8D0] text-sm text-[#4D403B] outline-none transition;
}

.search-wrap input:focus {
  @apply border-[#B88178] ring-2 ring-[#F1E1DB];
}

.about-card {
  @apply mt-6 flex items-start gap-4 bg-white border border-[#E8DDD5] rounded-2xl shadow-sm p-5 sm:p-6;
}

.about-mark {
  @apply w-11 h-11 shrink-0 rounded-xl bg-[#8B3F37] text-white flex items-center justify-center font-bold;
}

.about-title {
  @apply text-lg font-bold text-[#3F302D] mt-1;
}

.about-text {
  @apply text-sm text-[#8A7670] mt-2 leading-6 max-w-3xl;
}

.tech-list {
  @apply flex flex-wrap gap-2 mt-4;
}

.tech-badge {
  @apply px-3 py-1.5 rounded-full bg-[#F4E8DE] text-[#7F6259] text-xs font-semibold;
}

.animate-page-enter {
  animation: pageEnter .55s ease both;
}

.animate-card {
  animation: cardEnter .55s cubic-bezier(.22,1,.36,1) both;
}

@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .motivation-rate {
    display: none;
  }
}
</style>