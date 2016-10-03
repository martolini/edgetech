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
    auth.signInWithEmailAndPassword(data.email, data.password).then(function(result){
      // signed in!
      let ref = firebaseRef.database().ref(`organizations/${data.organization.id}/users/${result.uid}`)
      ref.on('value', snapshot => {
        if (snapshot.exists()) {
          dispatch(pushPath(`/${snapshot.val().organization.path}/ask`))
        } else {
          dispatch(logout())
          dispatch(pushPath('/login'))
        }
      })

    }).catch(function(error) {
      // something bad happend!
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
  const { username, email, password, tutor, courses, org } = data
  return dispatch => {
    dispatch(signupRequest())
    let authRef = firebaseRef.auth()
    authRef.createUserWithEmailAndPassword(email, password).then((user) => {

      firebaseRef.database().ref(`organizations/${org.id}/users`).child(user.uid).set({
        email: email,
        username: username,
        karma: 0,
        id: user.uid,
        enabledNotification: tutor,
        courses: courses,
        level: LEVELS[0],
        organization: {id: org.id, name: org.name, path: org.path, logo: org.logo}
      })

      dispatch(pushPath(`/${org.path}/ask`))

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
    let questionRef = firebaseRef.database().ref(`organizations/${question.org.id}/questions`).push()
    let chatRef = firebaseRef.database().ref(`organizations/${question.org.id}/chat`).push()
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
        dispatch(pushPath(`/${question.org.path}/question/${question.id}`))
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

export const CREATE_ORGANIZATION_REQUEST = 'CREATE_ORGANIZATION_REQUEST'
export const CREATE_ORGANIZATION_SUCCESS = 'CREATE_ORGANIZATION_SUCCESS'
export const CREATE_ORGANIZATION_ERROR = 'CREATE_ORGANIZATION_ERROR'


function createOrganizationRequest() {
  return {
    type: CREATE_ORGANIZATION_REQUEST
  }
}

function createOrganizationSuccess(org) {
  return {
    type: CREATE_ORGANIZATION_SUCCESS,
    org
  }
}

function createOrganizationError(error) {
  return {
    type: CREATE_ORGANIZATION_ERROR,
    error
  }
}

export function createOrganization(org) {
  return dispatch => {
    dispatch(createOrganizationRequest())
    let orgRef = firebaseRef.database().ref('organizations').push()
    let orgInfoRef = firebaseRef.database().ref('orginfo').push()
    let organization = Object.assign({}, organization, {
      info: {id: orgRef.key, name: org.name, path: org.path, logo: org.logourl},
      createdAt: firebaseRef.database.ServerValue.TIMESTAMP
    })
    let orgInfo = Object.assign({}, orgInfo, {
      id: orgRef.key,
      name: org.name,
      path: org.path,
      logo: org.logourl,
      createdAt: firebaseRef.database.ServerValue.TIMESTAMP
    })

    orgRef.set(organization, error => {
      if (!!error) {
        console.log(error)
        dispatch(createOrganizationError())
      } else {
        orgInfoRef.set(orgInfo, error => {
          if (!!error) {
            console.log(error)
            dispatch(createOrganizationError())
          } else {
            console.log('success')
            dispatch(createOrganizationSuccess())
          }
        })
      }
    })
  }
}
