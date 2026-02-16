*** Settings ***
Resource    ../testdata/common_test_data.robot

*** Keywords ***

Input Invalid Firstname
    Input Text    //*[@id='input_comp-lt33fcq41']    ${INVALID_FIRSTNAME}

Input Invalid Lastname
    Input Text    //*[@id='input_comp-lt33fcs1']    ${INVALID_LASTNAME}

Input Invalid Phone Number
    Input Text    //*[@id='input_comp-lt33fcsi1']    ${INVALID_PHONE_NUMBER}

Input Invalid Email Address
    Input Text    //*[@id='input_comp-lt33fcsf1']    ${INVALID_EMAIL_ADDRESS}

Select Invalid Number of Adults
    No Operation

Select Invalid Pet Choice
    No Operation

Verify Field Is Invalid
    [Arguments]    ${field_id}
    # Get the id of the input field to check

    Wait Until Element Is Visible    id=${field_id}    5s
    # Wait until the field is visible on the page

    ${invalid}=    Get Element Attribute    id=${field_id}    aria-invalid
    # Get the value of aria-invalid attribute
    # "true" means the field is invalid

    Should Be Equal    ${invalid}    true
    # Verify that the field is marked as invalid
