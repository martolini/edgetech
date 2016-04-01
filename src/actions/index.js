import { firebaseRef, LEVELS } from '../config'
import { pushPath } from 'redux-simple-router'
import Firebase from 'firebase'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGGED_OUT = 'LOGGED_OUT'
export const USER_UPDATED = 'USER_UPDATED'

export function loggedOut() {
  return {
    type: LOGGED_OUT
  }
}

export function logout() {
  return dispatch => {
    firebaseRef.unauth()
    dispatch(loggedOut())
  }
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error: error
  }
}

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function login(data) {
  return dispatch => {
    dispatch(loginRequest())
    firebaseRef.authWithPassword(data, (error, data) => {
      if (error) {
        dispatch(loginError(error.message))
      } else {
      }
    })
  }
}

export function userUpdated(user) {
  return {
    type: USER_UPDATED,
    user,
    loading: false
  }
}

export function loginWithFacebook(data) {
  return dispatch => {
    firebaseRef.authWithOAuthPopup('facebook', (error, data) => {
      if (!!error) {
        dispatch(loginError(error.message))
      }
    }, {
    })
  }
}

export const SIGNUP = 'SIGNUP'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'

function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  }
}

function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    error
  }
}

export function signup(data) {
  const { username, email, password, tutor, courses } = data
  return dispatch => {
    dispatch(signupRequest())
    firebaseRef.createUser(data, (error, user) => {
      if (!!error) {
        dispatch(signupError(error.message))
      } else {
        firebaseRef.authWithPassword(data, (error, data) => {
          if (!!error) {
            dispatch(signupError(error.message))
          } else {
            firebaseRef.child('users').child(data.uid).set({
              email: email,
              username: username,
              karma: 0,
              id: data.uid,
              enabledNotification: tutor,
              courses: courses,
              level: LEVELS[0]

            })
          }
        })
      }
    })
  }
}

export const ASK_QUESTION_REQUEST = 'ASK_QUESTION_REQUEST'
export const ASK_QUESTION_SUCCESS = 'ASK_QUESTION_SUCCESS'
export const ASK_QUESTION_ERROR = 'ASK_QUESTION_ERROR'


function askQuestionRequest() {
  return {
    type: ASK_QUESTION_REQUEST
  }
}

function askQuestionSuccess(question) {
  return {
    type: ASK_QUESTION_SUCCESS,
    question
  }
}

function askQuestionError(error) {
  return {
    type: ASK_QUESTION_ERROR,
    error
  }
}

export function askQuestion(question) {
  return dispatch => {
    dispatch(askQuestionRequest())
    let questionRef = firebaseRef.child('questions').push()
    let chatRef = firebaseRef.child('chat').push()
    question = Object.assign({}, question, {
      id: questionRef.key(),
      counter: 0,
      tutor: {
        id: question.tutor.id,
        username: question.tutor.username,
        email: question.tutor.email,
        connected: question.tutor.connected
      },
      chatId: chatRef.key(),
      createdAt: Firebase.ServerValue.TIMESTAMP
    })
    questionRef.set(question, error => {
      if (!!error) {
        dispatch(askQuestionError(error.message))
      } else {
        dispatch(askQuestionSuccess(question))
        dispatch(pushPath(`/question/${question.id}`))
      }
    })
  }
}

export const QUESTIONS_UPDATED = 'QUESTIONS_UPDATED'

export function questionsUpdated(questions) {
  return {
    type: QUESTIONS_UPDATED,
    questions
  }
}
