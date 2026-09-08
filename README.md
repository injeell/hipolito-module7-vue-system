# Campus Attendance Management System

A responsive student attendance management system developed as a
Software Engineering 1 Module 7 frontend prototype.

## Project Information

**Project:** Campus Attendance Management System  
**Course:** Software Engineering 1  
**Module:** Module 7 – Design and Implementation  
**Selected Entity:** Student Attendance Record

> **Student Name:** [Enter your full name]  
> **Year & Section:** [Enter your year and section]

---

## System Description

The Campus Attendance Management System is a Vue.js frontend prototype
designed to manage student attendance records.

The system allows the user to create, view, edit, delete, search, and
validate attendance records. Data is stored using browser localStorage
so that records remain available after refreshing the page.

This prototype focuses on one manageable entity: the **Student Attendance
Record**, following the Module 7 scope requirement.

---

## Implemented Features

- User authentication (Sign In and Registration)
- Role-based user session handling with persistent `localStorage` storage
- Secure logout with confirmation and feedback
- Pre-seeded Administrator account (`admin` / `admin123`)
- Dynamic user profile and initial avatar across dashboard and headers
- Add student attendance records
- View attendance records
- Edit existing attendance records
- Delete attendance records with confirmation
- Search attendance records
- Form validation
- Present, Late, and Absent status tracking
- Attendance statistics and summary
- Attendance rate calculation
- localStorage data persistence
- Responsive desktop and mobile interface
- Mobile hamburger navigation
- Animated interface interactions
- Success, validation, and delete feedback
- GitHub Actions production build check

---

## Default Credentials

For grading, evaluation, or testing, the system provides a pre-configured administrator account:

- **Username:** `admin` (or `admin@campus.edu`)
- **Password:** `admin123`
- **Role:** `Administrator`

Users may also register new custom accounts via the **Create Account** tab.

---

## Student Attendance Fields

Each attendance record contains:

| Field | Description |
|---|---|
| Student ID | Unique student identifier |
| Student Name | Student's complete name |
| Date | Attendance date |
| Status | Present, Late, or Absent |
| Section | Student's class section |

---

## Technologies Used

- Vue.js
- Vite
- JavaScript
- Tailwind CSS
- Browser localStorage
- Git
- GitHub
- GitHub Actions

---

## Vue Components & Project Structure

The project uses modular Vue components and utilities:

```text
src/
├── components/
│   ├── __tests__/
│   │   ├── AppHeader.test.js
│   │   ├── AppSession.test.js
│   │   ├── AttendanceForm.test.js
│   │   ├── AttendanceList.test.js
│   │   └── AuthView.test.js
│   ├── AppFooter.vue
│   ├── AppHeader.vue
│   ├── AttendanceForm.vue
│   ├── AttendanceList.vue
│   └── AuthView.vue
├── utils/
│   ├── attendanceUtils.js
│   ├── attendanceUtils.test.js
│   ├── authUtils.js
│   ├── authUtils.test.js
│   └── feedbackUtils.js
├── App.vue
├── main.js
└── style.css
```

# Module 9 - Software Evolution

## Change Request

**Change Request ID:** CR-M9-01

**Title:** Add Attendance Status Filter

**Maintenance Type:** Perfective Maintenance

## Maintenance Type

**Perfective Maintenance**

The change improves the existing Campus Attendance Management System by adding an attendance status filter. Users can filter attendance records by All, Present, Late, or Absent while keeping the existing attendance features working.

## Acceptance Criteria

1. The system provides a status filter for attendance records.
2. The status filter provides All, Present, Late, and Absent options.
3. Selecting Present displays only Present attendance records.
4. Selecting Late displays only Late attendance records.
5. Selecting Absent displays only Absent attendance records.
6. Selecting All displays all attendance records.
7. The status filter works together with the existing search function.
8. Existing Add Attendance, View, Edit, Delete, Validation, Delete Confirmation, and Local Storage functions continue to work correctly.
9. The status filter works correctly on desktop and mobile screen sizes.




