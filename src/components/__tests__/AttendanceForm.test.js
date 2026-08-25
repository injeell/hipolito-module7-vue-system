import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AttendanceForm from '../AttendanceForm.vue'

describe('AttendanceForm', () => {
  it('renders the attendance form correctly', () => {
    const wrapper = mount(AttendanceForm)

    expect(wrapper.text()).toContain('Record Attendance')
    expect(wrapper.get('input[aria-label="Student ID"]').exists()).toBe(true)
    expect(wrapper.get('input[aria-label="Student Name"]').exists()).toBe(true)
    expect(wrapper.get('input[aria-label="Attendance Date"]').exists()).toBe(true)
    expect(wrapper.get('select[aria-label="Attendance Status"]').exists()).toBe(true)
    expect(wrapper.get('input[aria-label="Section"]').exists()).toBe(true)
  })

  it('shows an error when required fields are empty', async () => {
    const wrapper = mount(AttendanceForm)

    await wrapper.get('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain(
      'Please complete all required fields.'
    )
  })

  it('emits save when all required fields are completed', async () => {
    const wrapper = mount(AttendanceForm)

    await wrapper.get('input[aria-label="Student ID"]').setValue('2026-001')
    await wrapper.get('input[aria-label="Student Name"]').setValue('Juan Dela Cruz')
    await wrapper.get('input[aria-label="Attendance Date"]').setValue('2026-08-25')
    await wrapper.get('select[aria-label="Attendance Status"]').setValue('Present')
    await wrapper.get('input[aria-label="Section"]').setValue('BSIT-3A')

    await wrapper.get('form').trigger('submit.prevent')

    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')[0][0]).toEqual({
      studentID: '2026-001',
      studentName: 'Juan Dela Cruz',
      date: '2026-08-25',
      status: 'Present',
      section: 'BSIT-3A'
    })
  })

  it('resets the form when Reset is clicked', async () => {
    const wrapper = mount(AttendanceForm)

    await wrapper.get('input[aria-label="Student ID"]').setValue('2026-001')
    await wrapper.get('input[aria-label="Student Name"]').setValue('Juan Dela Cruz')
    await wrapper.get('input[aria-label="Section"]').setValue('BSIT-3A')

    const buttons = wrapper.findAll('button')
    const resetButton = buttons.find(button => button.text() === 'Reset')

    await resetButton.trigger('click')

    expect(
      wrapper.get('input[aria-label="Student ID"]').element.value
    ).toBe('')

    expect(
      wrapper.get('input[aria-label="Student Name"]').element.value
    ).toBe('')

    expect(
      wrapper.get('input[aria-label="Section"]').element.value
    ).toBe('')
  })

  it('displays editing data when editingRecord is provided', () => {
    const editingRecord = {
      studentID: '2026-002',
      studentName: 'Maria Santos',
      date: '2026-08-24',
      status: 'Late',
      section: 'BSIT-3B'
    }

    const wrapper = mount(AttendanceForm, {
      props: {
        editingRecord
      }
    })

    expect(wrapper.text()).toContain('Edit Attendance')
    expect(wrapper.text()).toContain('Maria Santos')

    expect(
      wrapper.get('input[aria-label="Student ID"]').element.value
    ).toBe('2026-002')

    expect(
      wrapper.get('input[aria-label="Student Name"]').element.value
    ).toBe('Maria Santos')

    expect(
      wrapper.get('select[aria-label="Attendance Status"]').element.value
    ).toBe('Late')
  })

  it('emits cancel when Cancel is clicked', async () => {
    const editingRecord = {
      studentID: '2026-002',
      studentName: 'Maria Santos',
      date: '2026-08-24',
      status: 'Late',
      section: 'BSIT-3B'
    }

    const wrapper = mount(AttendanceForm, {
      props: {
        editingRecord
      }
    })

    const buttons = wrapper.findAll('button')
    const cancelButton = buttons.find(button => button.text() === 'Cancel')

    await cancelButton.trigger('click')

    expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})
