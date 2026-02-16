*** Settings ***
Resource    ../testdata/common_test_data.robot

*** Keywords ***
Open Web Browser
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Sleep    ${OPEN_BROWSER_SLEEP}

Scroll Down To Bottom
    Execute JavaScript    window.scrollTo(0, document.body.scrollHeight)

Input Valid Firstname
    Input text     //*[@id='input_comp-lt33fcq41']     ${FIRSTNAME}

Input Valid Lastname
    Input text     //*[@id="input_comp-lt33fcs1"]     ${LASTNAME}

Input Valid Phone Number
    Input text     //*[@id='input_comp-lt33fcsi1']     ${PHONE_NUMBER}

Input Valid Email Address
    Input text     //*[@id='input_comp-lt33fcsf1']     ${EMAIL_ADDRESS}

Select Number of Adults
    SeleniumLibrary.Click Element    //*[@class='RJZaGO']
    Wait Until Element Is Visible    //*[@class = 'P6sHUt' and contains(text(), '3')]
    SeleniumLibrary.Click Element    //*[@class = 'P6sHUt' and contains(text(), '3')]

Select Pet Choice
    Click Element    xpath=//*[text()='${PET_CHOICE}']

Input Note
    Input text     //*[@id='input_comp-lt33fct3']     ${NOTE}

Agree Terms And Conditions
    Click Element    xpath=//*[text()='I accept terms & conditions']

Submit Button
    Click Element    xpath=//*[text()='Submit']

Expected Result
    Wait Until Element Is Visible    //*[@id="comp-ltvkcimc"]/p/span/span    ${EXPECTED_TEXT_RESULT_SLEEP}
    Element Should Contain    //*[@id="comp-ltvkcimc"]/p/span/span    ${EXPECTED_TEXT_RESULT}

Verify Text Field Value
    [Arguments]    ${field_id}    ${expected_value}
    # Check that the input field contains the expected value

    Textfield Value Should Be    id=${field_id}    ${expected_value}
