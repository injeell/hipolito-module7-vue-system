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

## Vue Components

The project uses reusable Vue components:

```text
src/
├── components/
│   ├── AppHeader.vue
│   ├── AttendanceForm.vue
│   ├── AttendanceList.vue
│   └── AppFooter.vue
├── App.vue
├── main.js
└── style.css