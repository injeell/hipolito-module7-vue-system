import { describe, it, expect } from 'vitest'

import {
  filterAttendanceRecords,
  calculateAttendanceRate,
  countAttendanceStatuses,
  getFeedbackTitle
} from './attendanceUtils'

const records = [
  {
    id: 1,
    studentID: '62112024',
    studentName: 'Aicelle Joy Carreon',
    date: '2026-08-27',
    status: 'Present',
    section: 'BSCS 3A'
  },
  {
    id: 2,
    studentID: '62112025',
    studentName: 'Angel A. Hipolito',
    date: '2026-08-27',
    status: 'Late',
    section: 'BSCS 3A'
  },
  {
    id: 3,
    studentID: '62112026',
    studentName: 'Maria Santos',
    date: '2026-08-27',
    status: 'Absent',
    section: 'BSCS 3B'
  }
]

describe('Attendance Utilities', () => {

  it('finds an existing student by name', () => {
    const result = filterAttendanceRecords(
      records,
      'Aicelle'
    )

    expect(result).toHaveLength(1)

    expect(result[0].studentName)
      .toBe('Aicelle Joy Carreon')
  })


  it('performs a case-insensitive search', () => {
    const result = filterAttendanceRecords(
      records,
      'ANGEL'
    )

    expect(result).toHaveLength(1)

    expect(result[0].studentName)
      .toBe('Angel A. Hipolito')
  })


  it('returns no results for an unknown student', () => {
    const result = filterAttendanceRecords(
      records,
      'Unknown Student'
    )

    expect(result).toHaveLength(0)
  })


  it('calculates the attendance rate correctly', () => {
    const rate = calculateAttendanceRate(records)

    expect(rate).toBe(33)
  })


  it('counts Present, Late, and Absent correctly', () => {
    const counts = countAttendanceStatuses(records)

    expect(counts.present).toBe(1)
    expect(counts.late).toBe(1)
    expect(counts.absent).toBe(1)
  })


  /*
   * DEFECT TEST
   *
   * This test verifies that editing an existing
   * attendance record displays "Attendance Updated".
   *
   * The current defective implementation returns
   * "Student Successfully Added", so this test
   * should fail before the correction.
   */

  it('shows Attendance Updated after editing a record', () => {
    const result = getFeedbackTitle('update')

    expect(result).toBe('Attendance Updated')
  })

})