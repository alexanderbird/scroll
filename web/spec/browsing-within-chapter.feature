Feature: Browsing within a chapter

Scenario: browsing to another verse in the chapter
  Given I have navigated to the Jump page
    And I have entered "Jhn"
    And I have clicked on "John 1:1"
  When I click on "John 1:15"
  Then I see a list of verses starting with the following:
    | Reference | Text |
    | John 1:14 | The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth. |
    | John 1:15 | John testified about him. He cried out, saying, "This was he of whom I said, ‘He who comes after me has surpassed me, for he was before me.'"  |
    | John 1:16 | From his fullness we all received grace upon grace. |
  
