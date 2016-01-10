import Parse from 'parse'
import { Question, ChatMessage } from '../models'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGGED_OUT = 'LOGGED_OUT'

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export function loggedOut() {
  return {
    type: LOGGED_OUT
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
  const { email, password } = data;
  return dispatch => {
    dispatch(loginRequest())
    Parse.User.logIn(email, password, {
      success: user => dispatch(loginSuccess(user)),
      error: (user, error) => dispatch(loginError(error.message))
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

function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user
  }
}

function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    error
  }
}

export function signup(data) {
  const { email, password } = data
  return dispatch => {
    dispatch(signupRequest())
    let user = new Parse.User()
    user.set('username', email)
    user.set('email', email)
    user.set('password', password)
    user.signUp(null, {
      success: user => {
        return dispatch(signupSuccess(user));
      },
      error: (user, error) => {
        dispatch(signupError(error.message))
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

export function askQuestion(data) {
  const { category, title, description, user } = data
  return dispatch => {
    dispatch(askQuestionRequest())
    let question = new Question()
    question.set('title', title)
    question.set('category', category)
    question.set('description', description)
    question.set('author', user)
    question.save(null, {
      success: question => dispatch(askQuestionSuccess(question)),
      error: (question, error) => dispatch(askQuestionError(error.message))
    })
  }
}

export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST'
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS'
export const QUESTIONS_ERROR = 'QUESTIONS_ERROR'

export function questionsRequest() {
  return {
    type: QUESTIONS_REQUEST,
    loading: true
  }
}

function questionsSuccess(question) {
  return {
    type: QUESTIONS_SUCCESS,
    question
  }
}

function questionsError(error) {
  return {
    type: QUESTIONS_ERROR,
    error
  }
}
