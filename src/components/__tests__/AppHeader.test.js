import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'

describe('AppHeader', () => {
  beforeEach(() => {
    document.body.innerHTML = ''

    document.getElementById = vi.fn(() => ({
      scrollIntoView: vi.fn()
    }))
  })

  it('renders the desktop navigation content', () => {
    const wrapper = mount(AppHeader)

    expect(wrapper.text()).toContain('CAMPUS')
    expect(wrapper.text()).toContain('ATTENDANCE')
    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Record Attendance')
    expect(wrapper.text()).toContain('Attendance Records')
    expect(wrapper.text()).toContain('About System')
    expect(wrapper.text()).toContain('System Online')
    expect(wrapper.text()).toContain('Administrator')
  })

  it('renders the mobile menu button', () => {
    const wrapper = mount(AppHeader)

    const menuButton = wrapper.get(
      'button[aria-label="Toggle navigation menu"]'
    )

    expect(menuButton.exists()).toBe(true)
    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })

  it('opens the mobile menu when the menu button is clicked', async () => {
    const wrapper = mount(AppHeader)

    const menuButton = wrapper.get(
      'button[aria-label="Toggle navigation menu"]'
    )

    await menuButton.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('CAMPUS ATTENDANCE')
    const closeButton = wrapper.get('button[aria-label="Close menu"]')
    expect(closeButton.exists()).toBe(true)
  })

  it('closes the mobile menu when the close button is clicked', async () => {
    const wrapper = mount(AppHeader)

    const menuButton = wrapper.get(
      'button[aria-label="Toggle navigation menu"]'
    )

    await menuButton.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('true')

    const closeButton = wrapper.get('button[aria-label="Close menu"]')

    await closeButton.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })

  it('closes the mobile menu when the overlay is clicked', async () => {
    const wrapper = mount(AppHeader)

    const menuButton = wrapper.get(
      'button[aria-label="Toggle navigation menu"]'
    )

    await menuButton.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('true')

    const overlay = wrapper.get(
      'button[aria-label="Close menu"]'
    )

    await overlay.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })

  it('calls scrollIntoView when a navigation button is clicked', async () => {
    const scrollIntoView = vi.fn()

    document.getElementById = vi.fn(() => ({
      scrollIntoView
    }))

    const wrapper = mount(AppHeader)

    const dashboardButtons = wrapper.findAll('button').filter(button =>
      button.text().includes('Dashboard')
    )

    expect(dashboardButtons.length).toBeGreaterThan(0)

    await dashboardButtons[0].trigger('click')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(document.getElementById).toHaveBeenCalledWith('dashboard')
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    })
  })

  it('closes the menu when a mobile navigation item is clicked', async () => {
    const wrapper = mount(AppHeader)

    const menuButton = wrapper.get(
      'button[aria-label="Toggle navigation menu"]'
    )

    await menuButton.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('true')

    const mobileNav = wrapper
      .findAll('nav')
      .at(1)

    const recordsButton = mobileNav
      .findAll('button')
      .find(button => button.text().includes('Attendance Records'))

    expect(recordsButton).toBeTruthy()

    await recordsButton.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })

  it('renders custom user name and role when currentUser prop is provided', () => {
    const wrapper = mount(AppHeader, {
      props: {
        currentUser: {
          fullName: 'Prof. Maria Santos',
          role: 'Faculty Member'
        }
      }
    })

    expect(wrapper.text()).toContain('Prof. Maria Santos')
    expect(wrapper.text()).toContain('Faculty Member')
    expect(wrapper.find('.admin-sidebar-avatar').text()).toBe('P')
  })

  it('emits logout when desktop logout button is clicked', async () => {
    const wrapper = mount(AppHeader)

    const logoutButton = wrapper.find('button[aria-label="Log Out"]')
    expect(logoutButton.exists()).toBe(true)

    await logoutButton.trigger('click')
    expect(wrapper.emitted('logout')).toBeTruthy()
  })

  it('emits logout and closes menu when mobile logout button is clicked', async () => {
    const wrapper = mount(AppHeader)

    // Open menu
    const menuButton = wrapper.get('button[aria-label="Toggle navigation menu"]')
    await menuButton.trigger('click')

    const mobileLogoutButton = wrapper.find('button[aria-label="Log Out Mobile"]')
    expect(mobileLogoutButton.exists()).toBe(true)

    await mobileLogoutButton.trigger('click')

    expect(wrapper.emitted('logout')).toBeTruthy()
    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })
})

