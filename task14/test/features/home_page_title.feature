@smoke
Feature: Home Page Title

Scenario: Page title
    Given I open "learn.epam.com"
    Then Page title should be "Learn"
    And Page title should not be "test"
    When I wait 3 seconds

@so
Scenario Outline: Page titles <URL>
    Given I open "<URL>"
    Then Page title should be "<Title>"
    And Page title should not be "test"
    When I wait 3 seconds

    Examples:
        | URL             | Title                                                         |
        | learn.epam.com  | Learn                                                         |
        | epam.com        | EPAM \| Enterprise Software Development, Design & Consulting  |
