# Spaced Repetition

Alexander Reich and Chris Carnivale
 
[Live App](https://ac-spaced-repetition.now.sh/)
[Server Repo](https://github.com/thinkful-ei-armadillo/spaced-repetition-alex-chris-server)

## Summary
Learn a new language through the spaced repetition technique.  This is a DuoLingo clone that utilizes basic data structures and a responsive front end designed in React. Back-end supports multiple languages but only comes pre-seeded with 11 Dutch words.

Project was completed to provided test specifications and built off of a provided project base.

## Pages

#### Registration Page

![Registration Page](./screenshots/RegistrationPageImage.png)

Re-directed to the registration page if you are not logged in
Requires a name, username and password
Communicates with `post api/user` endpoint for verification

#### Log-In Page
![Log-In Page](./screenshots/LoginPageImage.png)
Can navigate to the login page when not logged in
Can navigate back to registration page
If token is invalid, automatically re-directs back to this page
Communicates with `post api/auth/token` and `put api/auth`

#### Dashboard Page
![Dashboard Page](./screenshots/DashboardPageImage.png)
As a logged in user, communicates with `get api/language`, shows the current 
language for that user, and the words to learn for that language
Also shows the scores for all words and the total score
Users are given a button to start learning

#### Learning Page
![Learning Page](./screenshots/LearningPageImage.png)
As a logged in user, communicates with `get api/language/head` to get first word
Shows the word and asks for translation
Communicates with `post api/language/guess` to confirm translation and to get the
next word to learn

#### Correct/Incorrect Page
![Correct Answer Page](./screenshots/CorrectAnswerPageImage.png)
![Incorrect Answer Page](./screenshots/IncorrectAnswerPageImage.png)
Shows details of the response from `post api/language/guess`
Provides button for user to move on to the next word

## Technology
- React
  - Context
- HTML5
- CSS3
- Cypress 