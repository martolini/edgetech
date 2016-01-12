import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGGED_OUT, USER_UPDATED,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR,
  ASK_QUESTION_REQUEST, ASK_QUESTION_SUCCESS, ASK_QUESTION_ERROR,
  QUESTIONS_UPDATED,
} from '../actions'
import { combineReducers } from 'redux'


function auth(state = {
  user: null,
  error: null,
  loading: false
}, action) {
  switch(action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case SIGNUP_ERROR:
      return {
        user: null,
        error: action.error,
        loading: false
      }
    case LOGIN_REQUEST:
      return {
        user: null,
        error: null,
        loading: true
      }
    case LOGIN_SUCCESS: {
      return {
        user: action.user,
        error: null,
        loading: false
      }
    }
    case LOGIN_ERROR:
      return {
        user: null,
        loading: false,
        error: action.error
      }
    case LOGGED_OUT:
      return {
        user: null,
        loading: false,
        error: null
      }
    case USER_UPDATED:
      return Object.assign({}, state, { user: action.user })
    default:
      return state
  }
  return state
}

function questions(state=[], action) {
  switch (action.type) {
    case QUESTIONS_UPDATED:
      return action.questions
    default:
      return state
  }
}


export default {
  auth,
  questions
}
