import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGGED_OUT,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR,
  ASK_QUESTION_REQUEST, ASK_QUESTION_SUCCESS, ASK_QUESTION_ERROR,
  QUESTIONS_REQUEST, QUESTIONS_SUCCESS, QUESTIONS_ERROR,
  FETCH_QUESTION_REQUEST, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_ERROR,
  SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR, RECEIVED_MESSAGE,
  REQUEST_MESSAGES, REQUEST_MESSAGES_SUCCESS, REQUEST_MESSAGES_ERROR
} from '../actions'
import { combineReducers } from 'redux'


function auth(state = {
  email: null,
  error: null,
  loading: false
}, action) {
  switch(action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case SIGNUP_SUCCESS:
      return {
        email: action.email,
        loading: false,
        error: null
      }
    case SIGNUP_ERROR:
      return {
        email: null,
        error: action.error,
        loading: false
      }
    case LOGIN_REQUEST:
      return {
        email: null,
        error: null,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        email: action.email,
        error: null,
        loading: false
      }
    case LOGIN_ERROR:
      return {
        email: null,
        loading: false,
        error: action.error
      }
    case LOGGED_OUT:
      return {
        email: null,
        loading: false,
        error: null
      }
    default:
      return state
  }
  return state
}

function question(state={
  loading: false,
  questions: [],
  error: null,
}, action) {
  switch (action.type) {
    case ASK_QUESTION_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case ASK_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        questions: [ ...state.questions, action.question],
        error: null
      })
    case ASK_QUESTION_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case QUESTIONS_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case QUESTIONS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        questions: action.questions
      })
    case QUESTIONS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        questions: []
      })
    default:
      return state
  }
}

function learningRoom(state = {
  users: [],
  question: null,
  loading: true,
  error: null,
  code: ''
}, action) {
  switch(action.type) {
    case FETCH_QUESTION_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case FETCH_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        question: action.question,
        loading: false
      })
    case FETCH_QUESTION_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case SEND_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        question: action.question
      })
    case SEND_MESSAGE_ERROR:
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state
  }
}

export default {
  auth,
  question,
  learningRoom
}
