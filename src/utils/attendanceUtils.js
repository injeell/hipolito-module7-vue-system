export function filterAttendanceRecords(records, keyword) {
  const term = String(keyword ?? '')
    .toLowerCase()
    .trim()

  if (!term) {
    return records
  }

  return records.filter(record =>
    String(record.studentID ?? '')
      .toLowerCase()
      .includes(term) ||
    String(record.studentName ?? '')
      .toLowerCase()
      .includes(term) ||
    String(record.section ?? '')
      .toLowerCase()
      .includes(term) ||
    String(record.status ?? '')
      .toLowerCase()
      .includes(term)
  )
}

export function calculateAttendanceRate(records) {
  if (!records.length) {
    return 0
  }

  const present = records.filter(
    record => record.status === 'Present'
  ).length

  return Math.round(
    (present / records.length) * 100
  )
}

export function countAttendanceStatuses(records) {
  return {
    present: records.filter(
      record => record.status === 'Present'
    ).length,

    late: records.filter(
      record => record.status === 'Late'
    ).length,

    absent: records.filter(
      record => record.status === 'Absent'
    ).length
  }
}

/*
 * DEFECT REPRODUCTION
 *
 * The application currently displays
 * "Student Successfully Added" after editing
 * an existing attendance record.
 *
 * This incorrect value is intentional for the
 * failed-test demonstration.
 */
export function getFeedbackTitle(action) {
  if (action === 'update') {
    return 'Attendance Updated'
  }

  if (action === 'delete') {
    return 'Record Deleted'
  }

  return 'Student Successfully Added'
}