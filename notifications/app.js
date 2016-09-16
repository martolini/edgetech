require('dotenv').load('.env')
import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'
import { firebaseRef } from '../src/config'
import Firebase from 'firebase'

const mailer = nodemailer.createTransport(sgTransport({
  auth:{
    api_key: process.env.SENDGRID_API_KEY
  }
}))


// NTNU
firebaseRef.database().ref(`organizations/-KRPlzPJcfHIxQjkbJ_r/questions`).orderByChild('createdAt').startAt(new Date().getTime()).on('child_added', questionSnap => {
  let question = questionSnap.val()
  if (question.tutor.id) {
    sendEmailNotification(question.tutor.email, question)
  } else {
    firebaseRef.database().ref(`organizations/-KRPlzPJcfHIxQjkbJ_r/users`).orderByChild(`courses/${question.category}`).equalTo(true).once('value', tutorSnap => {
      tutorSnap.forEach(tutor => {
        if (tutor.val().enabledNotification && tutor.val().id !== question.author.id) {
          sendEmailNotification(tutor.val().email, question)
        }
      })
    })
  }
})

function sendEmailNotification(to, question) {
  let email = {
    to: to,
    from: process.env.FROM_EMAIL,
    subject: `[New ${question.category} request]`,
    html: `${question.text}<br /><b>By</b>: ${question.author.username}<br /><a href="https://codenudge/ntnu/question/${question.id}">Click here to help</a>`
  }
  mailer.sendMail(email, (err, info) => {
    if (err)
      console.log(err)
    else console.log(info)
  })
}
