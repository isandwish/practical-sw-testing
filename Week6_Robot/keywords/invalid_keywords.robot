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

Select Invalid Number of Adultsช
    No Operation

Select Invalid Pet Choiceช
    No Operation
