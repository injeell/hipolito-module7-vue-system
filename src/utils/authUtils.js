const USERS_STORAGE_KEY = 'campus-attendance-users'
const SESSION_STORAGE_KEY = 'campus-attendance-session'

export const DEFAULT_ADMIN = {
  id: 'admin-01',
  username: 'admin',
  fullName: 'Administrator',
  email: 'admin@campus.edu',
  password: 'admin123',
  role: 'Administrator',
  createdAt: '2026-01-01T00:00:00.000Z'
}

/**
 * Initializes the users store in localStorage if empty.
 * Ensures the default administrator account is available.
 */
export function initAuth() {
  const existingUsers = getUsers()
  if (!existingUsers || existingUsers.length === 0) {
    saveUsers([DEFAULT_ADMIN])
  }
}

/**
 * Retrieves all registered users from localStorage.
 * @returns {Array} Array of user objects
 */
export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('Failed to read users from localStorage:', err)
    return []
  }
}

/**
 * Saves users list to localStorage.
 * @param {Array} users
 */
export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  } catch (err) {
    console.error('Failed to save users to localStorage:', err)
  }
}

/**
 * Validates registration input data.
 * @param {Object} data
 * @returns {string|null} Error message or null if valid
 */
export function validateRegistrationData(data) {
  if (!data) return 'Registration data is required.'
  const { username, fullName, email, password, confirmPassword } = data

  if (!fullName || !fullName.trim()) {
    return 'Please enter your full name.'
  }
  if (!username || !username.trim()) {
    return 'Please enter a username.'
  }
  if (username.trim().length < 3) {
    return 'Username must be at least 3 characters long.'
  }
  if (!email || !email.trim()) {
    return 'Please enter your email address.'
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.trim())) {
    return 'Please enter a valid email address.'
  }
  if (!password) {
    return 'Please enter a password.'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.'
  }
  if (confirmPassword !== undefined && password !== confirmPassword) {
    return 'Passwords do not match.'
  }

  return null
}

/**
 * Registers a new user account.
 * @param {Object} userData
 * @returns {{ success: boolean, user?: Object, error?: string }}
 */
export function registerUser(userData) {
  initAuth()

  const validationError = validateRegistrationData(userData)
  if (validationError) {
    return { success: false, error: validationError }
  }

  const users = getUsers()
  const cleanUsername = userData.username.trim().toLowerCase()
  const cleanEmail = userData.email.trim().toLowerCase()

  const existingUsername = users.find(
    u => u.username.toLowerCase() === cleanUsername
  )
  if (existingUsername) {
    return { success: false, error: 'Username is already taken.' }
  }

  const existingEmail = users.find(
    u => u.email.toLowerCase() === cleanEmail
  )
  if (existingEmail) {
    return { success: false, error: 'An account with this email already exists.' }
  }

  const newUser = {
    id: `user-${Date.now()}`,
    username: userData.username.trim(),
    fullName: userData.fullName.trim(),
    email: userData.email.trim().toLowerCase(),
    password: userData.password,
    role: userData.role && userData.role.trim() ? userData.role.trim() : 'Instructor',
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  saveUsers(users)

  // Return user without sensitive password in the output representation
  const safeUser = { ...newUser }
  delete safeUser.password

  return { success: true, user: safeUser }
}

/**
 * Authenticates user credentials and starts a session.
 * @param {string} identifier Username or email
 * @param {string} password Password
 * @returns {{ success: boolean, session?: Object, error?: string }}
 */
export function loginUser(identifier, password) {
  initAuth()

  if (!identifier || !identifier.trim()) {
    return { success: false, error: 'Please enter your username or email.' }
  }
  if (!password) {
    return { success: false, error: 'Please enter your password.' }
  }

  const users = getUsers()
  const cleanId = identifier.trim().toLowerCase()

  const foundUser = users.find(
    u => u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId
  )

  if (!foundUser) {
    return { success: false, error: 'No account found with this username or email.' }
  }

  if (foundUser.password !== password) {
    return { success: false, error: 'Incorrect password. Please try again.' }
  }

  const session = {
    id: foundUser.id,
    username: foundUser.username,
    fullName: foundUser.fullName,
    email: foundUser.email,
    role: foundUser.role,
    loggedInAt: new Date().toISOString()
  }

  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  } catch (err) {
    console.error('Failed to save session to localStorage:', err)
  }

  return { success: true, session }
}

/**
 * Retrieves the current active user session if valid.
 * @returns {Object|null}
 */
export function getCurrentSession() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (session && session.username && session.fullName) {
      return session
    }
    return null
  } catch (err) {
    console.error('Failed to read session:', err)
    return null
  }
}

/**
 * Terminates the active session.
 */
export function logoutUser() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY)
  } catch (err) {
    console.error('Failed to remove session:', err)
  }
}
