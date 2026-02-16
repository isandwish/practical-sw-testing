*** Settings ***
Library    SeleniumLibrary
Resource    ../keywords/common_keywords.robot
Resource    ../testdata/common_test_data.robot
Resource    ../keywords/invalid_keywords.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with all input field
    [Tags]    All Input
    Open Web Browser
    Scroll Down To Bottom
    Input Valid Firstname
    Input Valid Lastname
    Input Valid Phone Number
    Input Valid Email Address
    Select Number of Adults
    Select Pet Choice
    Input Note
    Agree Terms And Conditions
    # Submit Button
    # Expected Result
    # Sleep    ${END_SLEEP}

Verify registration form with single fault firstname
    Open Web Browser
    Scroll Down To Bottom
    Input Invalid Firstname
    Input Valid Lastname
    Input Valid Phone Number
    Input Valid Email Address
    Select Number of Adults
    Select Pet Choice
    Input Note
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    input_comp-lt33fcq41


Verify registration form with single fault lastname
    Open Web Browser
    Scroll Down To Bottom
    Input Valid Firstname
    Input Invalid Lastname
    Input Valid Phone Number
    Input Valid Email Address
    Select Number of Adults
    Select Pet Choice
    Input Note
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    input_comp-lt33fcs1


Verify registration form with single fault phone number
    Open Web Browser
    Scroll Down To Bottom
    Input Valid Firstname
    Input Valid Lastname
    Input Invalid Phone Number
    Input Valid Email Address
    Select Number of Adults
    Select Pet Choice
    Input Note
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    input_comp-lt33fcsi1


Verify registration form with single fault email address
    Open Web Browser
    Scroll Down To Bottom
    Input Valid Firstname
    Input Valid Lastname
    Input Valid Phone Number
    Input Invalid Email Address
    Select Number of Adults
    Select Pet Choice
    Input Note
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    input_comp-lt33fcsf1

Verify registration form with single fault number of adults
    Open Web Browser
    Scroll Down To Bottom
    Input Valid Firstname
    Input Valid Lastname
    Input Valid Phone Number
    Input Valid Email Address
    Select Invalid Number of Adults
    Select Pet Choice
    Input Note
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    collection_comp-lt33fcsl1