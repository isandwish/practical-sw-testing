*** Settings ***
Library    SeleniumLibrary
Test Teardown    Close All Browsers

*** Variables ***
${WEB_URL}    https://panaryco.wixsite.com/myhotel?utm_source=chatgpt.com
${WEB_BROWSER}    chrome
${FIRSTNAME}    First
${LASTNAME}    Last
${PHONE_NUMBER}    0123456789
${EMAIL_ADDRESS}    FirstLast@gmail.com
${PET_CHOICE}    Yes
${NOTE}    Note
${OPEN_BROWSER_SLEEP}    2
${END_SLEEP}    10
${EXPECTED_TEXT_RESULT_SLEEP}     10
${EXPECTED_TEXT_RESULT}    Thanks for submitting!

*** Keywords ***
Open Web Browser
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Sleep    ${OPEN_BROWSER_SLEEP}

Scroll Down To Bottom
    Execute JavaScript    window.scrollTo(0, document.body.scrollHeight)

Input Firstname
    Input text     //*[@id='input_comp-lt33fcq41']     ${FIRSTNAME}

Input Lastname
    Input text     //*[@id="input_comp-lt33fcs1"]     ${LASTNAME}

Input Phone Number
    Input text     //*[@id='input_comp-lt33fcsi1']     ${PHONE_NUMBER}

Input Email Address
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