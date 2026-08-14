<script setup>
defineProps({
  records: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'edit',
  'delete'
])
</script>

<template>

  <div class="records-card">

    <!-- EMPTY -->
    <div
      v-if="records.length === 0"
      class="empty-state"
    >

      <div class="empty-icon">
        —
      </div>

      <h3 class="empty-title">
        No attendance records
      </h3>

      <p class="empty-text">
        Add a student record using the form above.
      </p>

    </div>

    <!-- DESKTOP -->
    <div
      v-else
      class="hidden md:block overflow-x-auto"
    >

      <table class="w-full">

        <thead>

          <tr class="table-head">

            <th>
              Student
            </th>

            <th>
              Student ID
            </th>

            <th>
              Date
            </th>

            <th>
              Status
            </th>

            <th>
              Section
            </th>

            <th>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="record in records"
            :key="record.id"
            class="table-row"
          >

            <!-- STUDENT -->
            <td class="table-cell">

              <div class="student-info">

                <div class="student-avatar">
                  {{ record.studentName.charAt(0).toUpperCase() }}
                </div>

                <div>

                  <p class="student-name">
                    {{ record.studentName }}
                  </p>

                  <p class="student-caption">
                    Student
                  </p>

                </div>

              </div>

            </td>

            <!-- ID -->
            <td class="table-cell text-sm text-[#665650]">
              {{ record.studentID }}
            </td>

            <!-- DATE -->
            <td class="table-cell text-sm text-[#81736D]">
              {{ record.date }}
            </td>

            <!-- STATUS -->
            <td class="table-cell">

              <span
                v-if="record.status === 'Present'"
                class="status-badge present"
              >
                <span class="status-dot"></span>
                Present
              </span>

              <span
                v-else-if="record.status === 'Late'"
                class="status-badge late"
              >
                <span class="status-dot"></span>
                Late
              </span>

              <span
                v-else
                class="status-badge absent"
              >
                <span class="status-dot"></span>
                Absent
              </span>

            </td>

            <!-- SECTION -->
            <td class="table-cell">

              <span class="section-badge">
                {{ record.section }}
              </span>

            </td>

            <!-- ACTIONS -->
            <td class="table-cell">

              <div class="action-group">

                <button
                  @click="emit('edit', record)"
                  class="edit-action"
                  title="Edit record"
                >
                  ✎
                </button>

                <button
                  @click="emit('delete', record.id)"
                  class="delete-action"
                  title="Delete record"
                >
                  ×
                </button>

              </div>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <!-- MOBILE -->
    <div
      v-if="records.length > 0"
      class="md:hidden p-3 space-y-3"
    >

      <div
        v-for="record in records"
        :key="record.id"
        class="mobile-record"
      >

        <div class="flex items-center justify-between gap-3">

          <div class="student-info">

            <div class="student-avatar">
              {{ record.studentName.charAt(0).toUpperCase() }}
            </div>

            <div class="min-w-0">

              <p class="student-name truncate">
                {{ record.studentName }}
              </p>

              <p class="student-caption">
                {{ record.studentID }}
              </p>

            </div>

          </div>

          <span
            v-if="record.status === 'Present'"
            class="status-badge present"
          >
            <span class="status-dot"></span>
            Present
          </span>

          <span
            v-else-if="record.status === 'Late'"
            class="status-badge late"
          >
            <span class="status-dot"></span>
            Late
          </span>

          <span
            v-else
            class="status-badge absent"
          >
            <span class="status-dot"></span>
            Absent
          </span>

        </div>

        <div class="mobile-details">

          <div>
            <p class="mobile-detail-label">
              Date
            </p>

            <p class="mobile-detail-value">
              {{ record.date }}
            </p>
          </div>

          <div>
            <p class="mobile-detail-label">
              Section
            </p>

            <span class="section-badge">
              {{ record.section }}
            </span>
          </div>

        </div>

        <div class="grid grid-cols-2 gap-2 mt-4">

          <button
            @click="emit('edit', record)"
            class="mobile-edit"
          >
            Edit Record
          </button>

          <button
            @click="emit('delete', record.id)"
            class="mobile-delete"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>
@reference "../style.css";

.records-card {
  @apply bg-white rounded-b-2xl border-x border-b border-[#E8DDD5] shadow-sm overflow-hidden;
}

.empty-state {
  @apply px-5 py-16 text-center;
}

.empty-icon {
  @apply w-14 h-14 mx-auto rounded-2xl bg-[#F4E8DF] text-[#8B4B45] flex items-center justify-center text-2xl font-bold;
}

.empty-title {
  @apply text-base font-bold text-[#463732] mt-4;
}

.empty-text {
  @apply text-sm text-[#988780] mt-1;
}

.table-head {
  @apply bg-[#FFF9F5] border-b border-[#EEE3DC] text-left;
}

.table-head th {
  @apply px-5 py-4 text-[10px] uppercase tracking-[0.12em] font-bold text-[#9A8880];
}

.table-row {
  @apply border-b border-[#F0E7E1] last:border-b-0 hover:bg-[#FFFDFB] transition-colors;
}

.table-cell {
  @apply px-5 py-4;
}

.student-info {
  @apply flex items-center gap-3;
}

.student-avatar {
  @apply w-9 h-9 rounded-full bg-[#8B3F37] text-white flex items-center justify-center text-xs font-bold;
}

.student-name {
  @apply text-sm font-semibold text-[#40332F];
}

.student-caption {
  @apply text-[10px] text-[#A1948E] mt-0.5;
}

.status-badge {
  @apply inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold;
}

.status-dot {
  @apply w-2 h-2 rounded-full;
}

.present {
  @apply bg-[#E6F0E4] text-[#648364];
}

.present .status-dot {
  background: #79A479;
}

.late {
  @apply bg-[#FBF0D9] text-[#A77A2F];
}

.late .status-dot {
  background: #D39A39;
}

.absent {
  @apply bg-[#F8E3E1] text-[#AA5D59];
}

.absent .status-dot {
  background: #C75C57;
}

.section-badge {
  @apply inline-flex px-3 py-1.5 rounded-lg bg-[#EDE8E1] text-[#7A685F] text-xs font-semibold;
}

.action-group {
  @apply flex items-center gap-2;
}

.edit-action {
  @apply w-9 h-9 rounded-lg border border-[#E6D6CD] bg-[#FFF9F5] text-[#8B4B45] flex items-center justify-center hover:bg-[#F7E9E0] hover:-translate-y-0.5 transition-all;
}

.delete-action {
  @apply w-9 h-9 rounded-lg border border-[#F0D8D4] bg-[#FFF7F5] text-[#B75F57] flex items-center justify-center hover:bg-[#FAE7E3] hover:-translate-y-0.5 transition-all;
}

.mobile-record {
  @apply bg-[#FFFCF9] border border-[#E9DED6] rounded-2xl p-4;
}

.mobile-details {
  @apply grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#EEE5DF];
}

.mobile-detail-label {
  @apply text-[10px] uppercase tracking-wider font-semibold text-[#A0928B] mb-1;
}

.mobile-detail-value {
  @apply text-xs font-medium text-[#6C5D56];
}

.mobile-edit {
  @apply py-2.5 rounded-xl bg-[#F1E3DC] text-[#7F4C43] text-xs font-semibold hover:bg-[#E9D7CF] transition;
}

.mobile-delete {
  @apply py-2.5 rounded-xl bg-[#FAE4E2] text-[#A25D58] text-xs font-semibold hover:bg-[#F2D5D2] transition;
}
</style>