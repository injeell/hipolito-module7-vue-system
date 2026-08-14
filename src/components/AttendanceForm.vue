<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingRecord: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({
  studentID: '',
  studentName: '',
  date: '',
  status: 'Present',
  section: ''
})

const error = ref('')

watch(
  () => props.editingRecord,
  record => {
    if (record) {
      form.value = {
        studentID: record.studentID,
        studentName: record.studentName,
        date: record.date,
        status: record.status,
        section: record.section
      }

      error.value = ''
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

function resetForm() {
  form.value = {
    studentID: '',
    studentName: '',
    date: '',
    status: 'Present',
    section: ''
  }

  error.value = ''
}

function submitForm() {
  error.value = ''

  if (
    !form.value.studentID.trim() ||
    !form.value.studentName.trim() ||
    !form.value.date ||
    !form.value.status ||
    !form.value.section.trim()
  ) {
    error.value = 'Please complete all required fields.'
    return
  }

  emit('save', {
    studentID: form.value.studentID.trim(),
    studentName: form.value.studentName.trim(),
    date: form.value.date,
    status: form.value.status,
    section: form.value.section.trim()
  })

  resetForm()
}

function cancelEdit() {
  emit('cancel')
}
</script>

<template>
  <div class="form-card animate-card">

    <!-- HEADER -->
    <div
      class="form-header"
      :class="
        editingRecord
          ? 'editing-header'
          : 'normal-header'
      "
    >

      <div class="flex items-center gap-3">

        <div
          class="form-header-icon"
          :class="
            editingRecord
              ? 'editing-icon'
              : 'normal-icon'
          "
        >
          {{ editingRecord ? '✎' : '+' }}
        </div>

        <div>

          <p
            class="form-kicker"
            :class="
              editingRecord
                ? 'text-[#7180A0]'
                : 'text-[#A0645A]'
            "
          >
            {{ editingRecord
              ? 'EDIT RECORD'
              : 'QUICK RECORD'
            }}
          </p>

          <h2 class="form-title">
            {{ editingRecord
              ? 'Edit Attendance'
              : 'Record Attendance'
            }}
          </h2>

          <p class="form-subtitle">
            {{ editingRecord
              ? 'Update the selected student attendance record.'
              : 'Add a new student attendance record.'
            }}
          </p>

        </div>

      </div>

      <span
        class="ready-badge"
        :class="
          editingRecord
            ? 'editing-badge'
            : 'ready-badge-green'
        "
      >

        <span
          class="ready-dot"
          :class="
            editingRecord
              ? 'bg-[#8798C1]'
              : 'bg-[#83A87E]'
          "
        ></span>

        {{ editingRecord ? 'Editing' : 'Ready' }}

      </span>

    </div>

    <!-- EDITING STUDENT -->
    <div
      v-if="editingRecord"
      class="editing-banner"
    >

      <div class="editing-avatar">
        {{ editingRecord.studentName.charAt(0).toUpperCase() }}
      </div>

      <div class="min-w-0">

        <p class="editing-label">
          CURRENTLY EDITING
        </p>

        <p class="editing-name">
          {{ editingRecord.studentName }}
        </p>

        <p class="editing-info">
          {{ editingRecord.studentID }}
          ·
          {{ editingRecord.section }}
        </p>

      </div>

    </div>

    <!-- FORM -->
    <div class="p-5 sm:p-6">

      <div
        v-if="error"
        class="error-box"
      >
        {{ error }}
      </div>

      <form
        @submit.prevent="submitForm"
        class="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        <!-- STUDENT ID -->
        <div>

          <input
            v-model="form.studentID"
            type="text"
            placeholder="Enter Student ID"
            aria-label="Student ID"
            class="field-input"
          />

        </div>

        <!-- STUDENT NAME -->
        <div>

          <input
            v-model="form.studentName"
            type="text"
            placeholder="Enter Student Name"
            aria-label="Student Name"
            class="field-input"
          />

        </div>

        <!-- DATE -->
        <div>

          <input
            v-model="form.date"
            type="date"
            aria-label="Attendance Date"
            class="field-input"
          />

        </div>

        <!-- STATUS -->
        <div>

          <select
            v-model="form.status"
            aria-label="Attendance Status"
            class="field-input cursor-pointer"
          >

            <option value="Present">
              Present
            </option>

            <option value="Late">
              Late
            </option>

            <option value="Absent">
              Absent
            </option>

          </select>

        </div>

        <!-- SECTION -->
        <div class="md:col-span-2">

          <input
            v-model="form.section"
            type="text"
            placeholder="Enter Section"
            aria-label="Section"
            class="field-input"
          />

        </div>

        <!-- BUTTONS -->
        <div
          class="md:col-span-2
                 flex flex-col
                 sm:flex-row
                 justify-end
                 gap-3 pt-2"
        >

          <button
            type="button"
            class="reset-button"
            @click="resetForm"
          >
            Reset
          </button>

          <button
            type="submit"
            class="save-button"
            :class="
              editingRecord
                ? 'bg-[#7D91B9] hover:bg-[#6D80A8]'
                : 'bg-[#8B3F37] hover:bg-[#77322C]'
            "
          >
            {{ editingRecord
              ? 'Save Changes'
              : 'Save Record'
            }}
          </button>

          <button
            v-if="editingRecord"
            type="button"
            class="cancel-button"
            @click="cancelEdit"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>

  </div>
</template>

<style scoped>
@reference "../style.css";

.form-card {
  @apply bg-white rounded-2xl border border-[#E8DDD5] shadow-sm overflow-hidden;
}

.form-header {
  @apply px-5 sm:px-6 py-5 flex items-start justify-between gap-4;
}

.normal-header {
  background: linear-gradient(90deg, #FBEEE6, #F9E5DE);
  border-bottom: 1px solid #EEDDD4;
}

.editing-header {
  background: linear-gradient(90deg, #EEF0F8, #F2EDF7);
  border-bottom: 1px solid #E0E3EE;
}

.form-header-icon {
  @apply w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm;
}

.normal-icon {
  @apply bg-[#F3D0BA] text-[#8B4A3E];
}

.editing-icon {
  @apply bg-[#D9E0F1] text-[#697B9F];
}

.form-kicker {
  @apply text-[10px] tracking-[0.14em] font-bold;
}

.form-title {
  @apply text-xl font-bold text-[#3F302D] mt-0.5;
}

.form-subtitle {
  @apply text-xs sm:text-sm text-[#907F78] mt-1;
}

.ready-badge {
  @apply hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold;
}

.ready-badge-green {
  @apply bg-[#E8F2E6] text-[#688364];
}

.editing-badge {
  @apply bg-[#E4E9F4] text-[#697A9E];
}

.ready-dot {
  @apply w-2 h-2 rounded-full;
}

.editing-banner {
  @apply mx-5 mt-5 bg-[#F8F9FC] border border-[#E0E4EE] rounded-2xl px-4 py-3 flex items-center gap-3;
}

.editing-avatar {
  @apply w-10 h-10 rounded-full bg-[#DCE3F1] text-[#697A9E] flex items-center justify-center font-bold;
}

.editing-label {
  @apply text-[9px] tracking-wider font-bold text-[#9A9DAA];
}

.editing-name {
  @apply text-sm font-bold text-[#413B3B] mt-0.5;
}

.editing-info {
  @apply text-[11px] text-[#8D878E] mt-0.5;
}

.error-box {
  @apply mb-5 bg-[#FFF0ED] border border-[#F1D1CB] rounded-xl px-4 py-3 text-[#A15C52] text-sm font-medium;
}

.field-input {
  @apply w-full px-4 py-3.5 bg-[#FFFDFC] border border-[#E4D8CF] rounded-xl outline-none text-sm text-[#4A3A36] transition-all duration-200;
}

.field-input:focus {
  @apply bg-white border-[#B77F74] ring-2 ring-[#F0DFD9] -translate-y-[1px];
}

.field-input::placeholder {
  color: #B0A098;
}

.save-button {
  @apply px-7 py-3.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all;
}

.reset-button {
  @apply px-6 py-3.5 rounded-xl border border-[#E1D4CB] bg-white text-[#765E56] text-sm font-semibold hover:bg-[#FCF6F2] transition-all;
}

.cancel-button {
  @apply px-6 py-3.5 rounded-xl bg-[#F0EEF1] text-[#6B6267] text-sm font-semibold hover:bg-[#E6E1E6] transition-all;
}
</style>