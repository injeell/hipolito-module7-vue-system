// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AttendanceList from '../AttendanceList.vue'

describe('AttendanceList', () => {
  it('shows the empty state when there are no records', () => {
    const wrapper = mount(AttendanceList, {
      props: {
        records: []
      }
    })

    expect(wrapper.text()).toContain('No attendance records')
    expect(wrapper.text()).toContain(
      'Add a student record using the form above.'
    )
  })

  it('displays attendance records', () => {
    const records = [
      {
        id: 1,
        studentID: '2026-001',
        studentName: 'Juan Dela Cruz',
        date: '2026-08-25',
        status: 'Present',
        section: 'BSIT-3A'
      },
      {
        id: 2,
        studentID: '2026-002',
        studentName: 'Maria Santos',
        date: '2026-08-24',
        status: 'Late',
        section: 'BSIT-3B'
      },
      {
        id: 3,
        studentID: '2026-003',
        studentName: 'Pedro Reyes',
        date: '2026-08-23',
        status: 'Absent',
        section: 'BSIT-3C'
      }
    ]

    const wrapper = mount(AttendanceList, {
      props: {
        records
      }
    })

    expect(wrapper.text()).toContain('Juan Dela Cruz')
    expect(wrapper.text()).toContain('Maria Santos')
    expect(wrapper.text()).toContain('Pedro Reyes')

    expect(wrapper.text()).toContain('2026-001')
    expect(wrapper.text()).toContain('2026-002')
    expect(wrapper.text()).toContain('2026-003')

    expect(wrapper.text()).toContain('Present')
    expect(wrapper.text()).toContain('Late')
    expect(wrapper.text()).toContain('Absent')

    expect(wrapper.text()).toContain('BSIT-3A')
    expect(wrapper.text()).toContain('BSIT-3B')
    expect(wrapper.text()).toContain('BSIT-3C')
  })

  it('applies the correct status classes', () => {
    const records = [
      {
        id: 1,
        studentID: '2026-001',
        studentName: 'Juan Dela Cruz',
        date: '2026-08-25',
        status: 'Present',
        section: 'BSIT-3A'
      },
      {
        id: 2,
        studentID: '2026-002',
        studentName: 'Maria Santos',
        date: '2026-08-24',
        status: 'Late',
        section: 'BSIT-3B'
      },
      {
        id: 3,
        studentID: '2026-003',
        studentName: 'Pedro Reyes',
        date: '2026-08-23',
        status: 'Absent',
        section: 'BSIT-3C'
      }
    ]

    const wrapper = mount(AttendanceList, {
      props: {
        records
      }
    })

    expect(wrapper.find('.status-badge.present').exists()).toBe(true)
    expect(wrapper.find('.status-badge.late').exists()).toBe(true)
    expect(wrapper.find('.status-badge.absent').exists()).toBe(true)
  })

  it('emits edit when an edit button is clicked', async () => {
    const record = {
      id: 1,
      studentID: '2026-001',
      studentName: 'Juan Dela Cruz',
      date: '2026-08-25',
      status: 'Present',
      section: 'BSIT-3A'
    }

    const wrapper = mount(AttendanceList, {
      props: {
        records: [record]
      }
    })

    const editButton = wrapper.find('button[title="Edit record"]')

    await editButton.trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')).toHaveLength(1)
    expect(wrapper.emitted('edit')[0][0]).toEqual(record)
  })

  it('emits delete with the record id when delete is clicked', async () => {
    const record = {
      id: 1,
      studentID: '2026-001',
      studentName: 'Juan Dela Cruz',
      date: '2026-08-25',
      status: 'Present',
      section: 'BSIT-3A'
    }

    const wrapper = mount(AttendanceList, {
      props: {
        records: [record]
      }
    })

    const deleteButton = wrapper.find('button[title="Delete record"]')

    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')).toHaveLength(1)
    expect(wrapper.emitted('delete')[0][0]).toBe(1)
  })
})