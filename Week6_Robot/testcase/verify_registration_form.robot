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
    Verify Text Field Value    input_comp-lt33fcq41    ${FIRSTNAME}
    Input Valid Lastname
    Verify Text Field Value    input_comp-lt33fcs1    ${LASTNAME}
    Input Valid Phone Number
    Verify Text Field Value    input_comp-lt33fcsi1    ${PHONE_NUMBER}
    Input Valid Email Address
    Verify Text Field Value    input_comp-lt33fcsf1    ${EMAIL_ADDRESS}
    Select Number of Adults
    Select Pet Choice
    Input Note
    Verify Text Field Value    input_comp-lt33fct3    ${NOTE}
    Agree Terms And Conditions
    # Submit Button
    # Expected Result
    # Sleep    ${END_SLEEP}

Verify registration form with single fault firstname
    Open Web Browser
    Scroll Down To Bottom
    Input Invalid Firstname
    Verify Text Field Value    input_comp-lt33fcq41    ${INVALID_FIRSTNAME}
    Input Valid Lastname
    Verify Text Field Value    input_comp-lt33fcs1    ${LASTNAME}
    Input Valid Phone Number
    Verify Text Field Value    input_comp-lt33fcsi1    ${PHONE_NUMBER}
    Input Valid Email Address
    Verify Text Field Value    input_comp-lt33fcsf1    ${EMAIL_ADDRESS}
    Select Number of Adults
    Select Pet Choice
    Input Note
    Verify Text Field Value    input_comp-lt33fct3    ${NOTE}
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    input_comp-lt33fcq41


Verify registration form with single fault lastname
    Open Web Browser
    Scroll Down To Bottom
    Input Valid Firstname
    Verify Text Field Value    input_comp-lt33fcq41    ${FIRSTNAME}
    Input Invalid Lastname
    Verify Text Field Value    input_comp-lt33fcs1    ${INVALID_LASTNAME}
    Input Valid Phone Number
    Verify Text Field Value    input_comp-lt33fcsi1    ${PHONE_NUMBER}
    Input Valid Email Address
    Verify Text Field Value    input_comp-lt33fcsf1    ${EMAIL_ADDRESS}
    Select Number of Adults
    Select Pet Choice
    Input Note
    Verify Text Field Value    input_comp-lt33fct3    ${NOTE}
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    input_comp-lt33fcs1



Verify registration form with single fault phone number
    Open Web Browser
    Scroll Down To Bottom
    Input Valid Firstname
    Verify Text Field Value    input_comp-lt33fcq41    ${FIRSTNAME}
    Input Valid Lastname
    Verify Text Field Value    input_comp-lt33fcs1    ${LASTNAME}
    Input Invalid Phone Number
    Verify Text Field Value    input_comp-lt33fcsi1    ${INVALID_PHONE_NUMBER}
    Input Valid Email Address
    Verify Text Field Value    input_comp-lt33fcsf1    ${EMAIL_ADDRESS}
    Select Number of Adults
    Select Pet Choice
    Input Note
    Verify Text Field Value    input_comp-lt33fct3    ${NOTE}
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    input_comp-lt33fcsi1


Verify registration form with single fault email address
    Open Web Browser
    Scroll Down To Bottom
    Input Valid Firstname
    Verify Text Field Value    input_comp-lt33fcq41    ${FIRSTNAME}
    Input Valid Lastname
    Verify Text Field Value    input_comp-lt33fcs1    ${LASTNAME}
    Input Valid Phone Number
    Verify Text Field Value    input_comp-lt33fcsi1    ${PHONE_NUMBER}
    Input Invalid Email Address
    Verify Text Field Value    input_comp-lt33fcsf1    ${INVALID_EMAIL_ADDRESS}
    Select Number of Adults
    Select Pet Choice
    Input Note
    Verify Text Field Value    input_comp-lt33fct3    ${NOTE}
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    input_comp-lt33fcsf1

Verify registration form with single fault number of adults
    Open Web Browser
    Scroll Down To Bottom
    Input Valid Firstname
    Verify Text Field Value    input_comp-lt33fcq41    ${FIRSTNAME}
    Input Valid Lastname
    Verify Text Field Value    input_comp-lt33fcs1    ${LASTNAME}
    Input Valid Phone Number
    Verify Text Field Value    input_comp-lt33fcsi1    ${PHONE_NUMBER}
    Input Valid Email Address
    Verify Text Field Value    input_comp-lt33fcsf1    ${EMAIL_ADDRESS}
    Select Invalid Number of Adults
    # Do not select any value (simulate user did not choose)
    Select Pet Choice
    Input Note
    Verify Text Field Value    input_comp-lt33fct3    ${NOTE}
    Agree Terms And Conditions
    Submit Button
    Verify Field Is Invalid    collection_comp-lt33fcsl1