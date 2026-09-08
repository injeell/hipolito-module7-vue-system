import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AuthView from '../AuthView.vue'
import { initAuth } from '../../utils/authUtils.js'

describe('AuthView', () => {
  beforeEach(() => {
    localStorage.clear()
    initAuth()
  })

  it('renders login form by default', () => {
    const wrapper = mount(AuthView)

    expect(wrapper.text()).toContain('Campus Attendance')
    expect(wrapper.text()).toContain('Sign in to manage student attendance')
    expect(wrapper.find('input[aria-label="Username or Email"]').exists()).toBe(true)
    expect(wrapper.find('input[aria-label="Password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toContain('Sign In')
  })

  it('switches between Login and Register tabs', async () => {
    const wrapper = mount(AuthView)

    const buttons = wrapper.findAll('button[type="button"]')
    const createAccountTab = buttons.find(b => b.text().includes('Create Account'))

    expect(createAccountTab).toBeDefined()
    await createAccountTab.trigger('click')

    expect(wrapper.text()).toContain('Create an account to access the system')
    expect(wrapper.find('input[aria-label="Full Name"]').exists()).toBe(true)
    expect(wrapper.find('input[aria-label="Username"]').exists()).toBe(true)
    expect(wrapper.find('input[aria-label="Campus Email"]').exists()).toBe(true)

    const signInTab = buttons.find(b => b.text().includes('Sign In'))
    await signInTab.trigger('click')

    expect(wrapper.text()).toContain('Sign in to manage student attendance')
  })

  it('displays an error message when login fails', async () => {
    const wrapper = mount(AuthView)

    await wrapper.find('input[aria-label="Username or Email"]').setValue('admin')
    await wrapper.find('input[aria-label="Password"]').setValue('wrongpass')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Incorrect password. Please try again.')
  })

  it('emits authenticated event when login succeeds', async () => {
    const wrapper = mount(AuthView)

    await wrapper.find('input[aria-label="Username or Email"]').setValue('admin')
    await wrapper.find('input[aria-label="Password"]').setValue('admin123')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('authenticated')).toBeTruthy()
    expect(wrapper.emitted('authenticated')[0][0].username).toBe('admin')
  })

  it('handles registration flow and returns to login view with success alert', async () => {
    const wrapper = mount(AuthView)

    // Switch to register tab
    const createAccountTab = wrapper.findAll('button').find(b => b.text().includes('Create Account'))
    await createAccountTab.trigger('click')

    // Fill form
    await wrapper.find('input[aria-label="Full Name"]').setValue('Dr. Jose Rizal')
    await wrapper.find('input[aria-label="Username"]').setValue('jrizal')
    await wrapper.find('input[aria-label="Campus Email"]').setValue('jrizal@campus.edu')
    await wrapper.find('input[aria-label="New Password"]').setValue('password123')
    await wrapper.find('input[aria-label="Confirm Password"]').setValue('password123')

    await wrapper.find('form').trigger('submit.prevent')

    // Should switch back to login mode and show success banner
    expect(wrapper.text()).toContain('Account created successfully')
    expect(wrapper.find('input[aria-label="Username or Email"]').element.value).toBe('jrizal')
  })
})
