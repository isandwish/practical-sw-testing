*** Settings ***
Library    SeleniumLibrary
Resource    ../keywords/common_keywords.robot
Resource    ../testdata/common_test_data.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with all input field\
    [Tags]    All Input
    Open Web Browser
    Scroll Down To Bottom
    Input Firstname
    Input Lastname
    Input Phone Number
    Input Email Address
    Select Number of Adults
    Select Pet Choice
    Input Note
    Agree Terms And Conditions
    Submit Button
    Expected Result
    Sleep    ${END_SLEEP}