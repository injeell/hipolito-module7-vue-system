import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '../../App.vue'
import { initAuth, loginUser } from '../../utils/authUtils.js'

describe('App session integration', () => {
  beforeEach(() => {
    localStorage.clear()
    initAuth()
    vi.restoreAllMocks()
  })

  it('displays AuthView when user is not logged in', async () => {
    const wrapper = mount(App)
    await flushPromises()

    expect(wrapper.text()).toContain('Sign In to System')
    expect(wrapper.text()).toContain('Campus Attendance')
    expect(wrapper.find('input[aria-label="Username or Email"]').exists()).toBe(true)
    // Dashboard should not be shown
    expect(wrapper.find('#dashboard').exists()).toBe(false)
  })

  it('displays Dashboard when user has an active session in localStorage', async () => {
    loginUser('admin', 'admin123')

    const wrapper = mount(App)
    await flushPromises()

    expect(wrapper.find('#dashboard').exists()).toBe(true)
    expect(wrapper.text()).toContain('Administrator')
    expect(wrapper.text()).toContain('Recent Attendance Records')
  })

  it('logs in from AuthView and enters Dashboard', async () => {
    const wrapper = mount(App)
    await flushPromises()

    expect(wrapper.find('#dashboard').exists()).toBe(false)

    await wrapper.find('input[aria-label="Username or Email"]').setValue('admin')
    await wrapper.find('input[aria-label="Password"]').setValue('admin123')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.find('#dashboard').exists()).toBe(true)
    expect(wrapper.text()).toContain('Administrator')
  })

  it('logs out and returns to AuthView when logout is confirmed', async () => {
    loginUser('admin', 'admin123')
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    const wrapper = mount(App)
    await flushPromises()

    expect(wrapper.find('#dashboard').exists()).toBe(true)

    const logoutButtons = wrapper.findAll('button').filter(b => b.text().includes('Log Out'))
    expect(logoutButtons.length).toBeGreaterThan(0)

    await logoutButtons[0].trigger('click')
    await flushPromises()

    expect(wrapper.find('#dashboard').exists()).toBe(false)
    expect(wrapper.text()).toContain('Sign In to System')
    expect(wrapper.text()).toContain('You have been logged out successfully.')
  })

  it('cancels logout when confirmation is rejected', async () => {
    loginUser('admin', 'admin123')
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    const wrapper = mount(App)
    await flushPromises()

    const logoutButtons = wrapper.findAll('button').filter(b => b.text().includes('Log Out'))
    await logoutButtons[0].trigger('click')
    await flushPromises()

    // Still in dashboard
    expect(wrapper.find('#dashboard').exists()).toBe(true)
  })
})
