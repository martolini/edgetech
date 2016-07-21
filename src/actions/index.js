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
    let auth = firebaseRef.auth()
    auth.signOut()
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
    let auth = firebaseRef.auth()
    //var provider = new firebaseRef.auth.EmailAuthProvider(data.email, data.password)
    auth.signInWithEmailAndPassword(data.email, data.password).then(function(result){
      // signed in!
      dispatch(pushPath('/ask'))
    }).catch(function(error) {
      // something bad happend!
      console.log('it did not work?');
      console.log(error);
      dispatch(loginError(error.message))
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
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'

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

function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS
  }
}

export function signup(data) {
  const { username, email, password, tutor, courses } = data
  return dispatch => {
    dispatch(signupRequest())
    let authRef = firebaseRef.auth()
    authRef.createUserWithEmailAndPassword(email, password).then((user) => {

      firebaseRef.database().ref('users').child(user.uid).set({
        email: email,
        username: username,
        karma: 0,
        id: user.uid,
        enabledNotification: tutor,
        courses: courses,
        level: LEVELS[0]

      })
      dispatch(pushPath('/ask'))

    }, (error) => {
      console.log(error)
      dispatch(signupError(error.message))
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
    let questionRef = firebaseRef.database().ref('questions').push()
    let chatRef = firebaseRef.database().ref('chat').push()
    question = Object.assign({}, question, {
      id: questionRef.key,
      counter: 0,
      tutor: {
        id: question.tutor.id,
        username: question.tutor.username,
        email: question.tutor.email,
        connected: question.tutor.connected
      },
      chatId: chatRef.key,
      createdAt: firebaseRef.database.ServerValue.TIMESTAMP
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
