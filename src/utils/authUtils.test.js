import { describe, it, expect, beforeEach } from 'vitest'
import {
  DEFAULT_ADMIN,
  initAuth,
  getUsers,
  registerUser,
  loginUser,
  getCurrentSession,
  logoutUser,
  validateRegistrationData
} from './authUtils.js'

describe('authUtils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('initAuth & getUsers', () => {
    it('seeds default admin user if users storage is empty', () => {
      initAuth()
      const users = getUsers()
      expect(users.length).toBe(1)
      expect(users[0].username).toBe(DEFAULT_ADMIN.username)
      expect(users[0].email).toBe(DEFAULT_ADMIN.email)
    })

    it('does not duplicate admin if users already exist', () => {
      initAuth()
      initAuth()
      const users = getUsers()
      expect(users.length).toBe(1)
    })
  })

  describe('validateRegistrationData', () => {
    it('rejects empty name', () => {
      const error = validateRegistrationData({
        fullName: '',
        username: 'juan',
        email: 'juan@test.com',
        password: 'password123'
      })
      expect(error).toBe('Please enter your full name.')
    })

    it('rejects short username', () => {
      const error = validateRegistrationData({
        fullName: 'Juan Dela Cruz',
        username: 'ju',
        email: 'juan@test.com',
        password: 'password123'
      })
      expect(error).toBe('Username must be at least 3 characters long.')
    })

    it('rejects invalid email', () => {
      const error = validateRegistrationData({
        fullName: 'Juan Dela Cruz',
        username: 'juan123',
        email: 'invalid-email',
        password: 'password123'
      })
      expect(error).toBe('Please enter a valid email address.')
    })

    it('rejects short password', () => {
      const error = validateRegistrationData({
        fullName: 'Juan Dela Cruz',
        username: 'juan123',
        email: 'juan@test.com',
        password: '123'
      })
      expect(error).toBe('Password must be at least 6 characters long.')
    })

    it('rejects mismatched confirm password', () => {
      const error = validateRegistrationData({
        fullName: 'Juan Dela Cruz',
        username: 'juan123',
        email: 'juan@test.com',
        password: 'password123',
        confirmPassword: 'differentPassword'
      })
      expect(error).toBe('Passwords do not match.')
    })

    it('returns null for valid data', () => {
      const error = validateRegistrationData({
        fullName: 'Juan Dela Cruz',
        username: 'juan123',
        email: 'juan@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      })
      expect(error).toBeNull()
    })
  })

  describe('registerUser', () => {
    it('successfully registers a new user', () => {
      const result = registerUser({
        fullName: 'Maria Santos',
        username: 'msantos',
        email: 'msantos@campus.edu',
        password: 'securePass123',
        role: 'Faculty'
      })

      expect(result.success).toBe(true)
      expect(result.user).toBeDefined()
      expect(result.user.username).toBe('msantos')
      expect(result.user.fullName).toBe('Maria Santos')
      expect(result.user.role).toBe('Faculty')
      expect(result.user.password).toBeUndefined()

      const users = getUsers()
      expect(users.some(u => u.username === 'msantos')).toBe(true)
    })

    it('prevents registering duplicate username', () => {
      const res1 = registerUser({
        fullName: 'First User',
        username: 'uniqueUser',
        email: 'user1@campus.edu',
        password: 'password123'
      })
      expect(res1.success).toBe(true)

      const res2 = registerUser({
        fullName: 'Second User',
        username: 'uniqueUser',
        email: 'user2@campus.edu',
        password: 'password123'
      })
      expect(res2.success).toBe(false)
      expect(res2.error).toBe('Username is already taken.')
    })

    it('prevents registering duplicate email', () => {
      const res1 = registerUser({
        fullName: 'First User',
        username: 'userOne',
        email: 'duplicate@campus.edu',
        password: 'password123'
      })
      expect(res1.success).toBe(true)

      const res2 = registerUser({
        fullName: 'Second User',
        username: 'userTwo',
        email: 'duplicate@campus.edu',
        password: 'password123'
      })
      expect(res2.success).toBe(false)
      expect(res2.error).toBe('An account with this email already exists.')
    })
  })

  describe('loginUser & session handling', () => {
    it('authenticates with valid username and password', () => {
      const result = loginUser('admin', 'admin123')
      expect(result.success).toBe(true)
      expect(result.session).toBeDefined()
      expect(result.session.username).toBe('admin')
      expect(result.session.fullName).toBe('Administrator')

      const session = getCurrentSession()
      expect(session).toEqual(result.session)
    })

    it('authenticates with valid email (case insensitive)', () => {
      const result = loginUser('ADMIN@CAMPUS.EDU', 'admin123')
      expect(result.success).toBe(true)
      expect(result.session.username).toBe('admin')
    })

    it('fails on wrong password', () => {
      const result = loginUser('admin', 'wrongpassword')
      expect(result.success).toBe(false)
      expect(result.error).toBe('Incorrect password. Please try again.')
      expect(getCurrentSession()).toBeNull()
    })

    it('fails on nonexistent user', () => {
      const result = loginUser('unknown_user', 'password123')
      expect(result.success).toBe(false)
      expect(result.error).toBe('No account found with this username or email.')
      expect(getCurrentSession()).toBeNull()
    })

    it('clears session upon logoutUser', () => {
      loginUser('admin', 'admin123')
      expect(getCurrentSession()).not.toBeNull()

      logoutUser()
      expect(getCurrentSession()).toBeNull()
    })
  })
})
