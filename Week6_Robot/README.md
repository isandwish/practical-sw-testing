# Assignment – Robot Framework Workshop

## Overview

This assignment is an individual submission from the Robot Framework workshop (Week 6).

The objective is to create automated test scripts using **Robot Framework** to test a registration form.

The project includes:

- ✅ Happy Case (all required fields filled correctly)
- ✅ Single Fault Test Cases (one required field missing per test)

Single Fault tests verify that the system correctly validates required fields.

---

## What This Project Does

1. Open the registration website  
2. Fill in form fields  
3. Verify input values are entered correctly  
4. Submit the form  
5. Validate:
   - Successful submission (Happy Case)
   - Field validation errors (Single Fault cases)

---

## Project Structure
```
Week6_Robot
│
├── keywords
│ ├── common_keywords.robot
│ └── invalid_keywords.robot
│
├── testcase
│ ├── verify_registration_form.robot
│ ├── log.html
│ ├── output.xml
│ └── report.html
│
├── testdata
│ └── common_test_data.robot
│
└── simple.robot

```
---

## Folder Description

### keywords/

- **common_keywords.robot**  
  Contains reusable keywords for valid form input and common actions.

- **invalid_keywords.robot**  
  Contains keywords for invalid or missing required field scenarios.

---

### testcase/

- **verify_registration_form.robot**  
  Contains:
  - Happy Case test
  - Single Fault test cases (required fields only)

- **log.html / report.html / output.xml**  
  Auto-generated test execution reports.

---

### testdata/

- **common_test_data.robot**  
  Stores test data variables (valid and invalid values).

---

### simple.robot

In-class assignment example.  
Contains a basic Happy Case test.

---

## Test Coverage

### Happy Case
- All required fields filled
- Form submits successfully
- Success message verified

### Single Fault Cases
Tested required fields:
- First Name
- Last Name
- Phone Number
- Email Address
- Number of Adults

Each test verifies:
- Field input value
- Validation error (`aria-invalid = true`)

---

## Tools Used

- Robot Framework  
- SeleniumLibrary  
- Chrome Browser  

---

## Summary

This project demonstrates:

- Basic Robot Framework structure  
- Positive and Negative testing  
- Required field validation  
- Reusable keyword design  
- Test data separation  
- Test reporting  
