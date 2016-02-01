require('dotenv').load()
import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'
import { firebaseRef } from '../src/config'
import Firebase from 'firebase'


const mailer = nodemailer.createTransport(sgTransport({
  auth:{
    api_key: process.env.SENDGRID_API_KEY
  }
}))

firebaseRef.child('questions').orderByChild('createdAt').startAt(new Date().getTime()).on('child_added', questionSnap => {
  let question = questionSnap.val()
  if (question.tutor.connected) {
    sendEmailNotification(question.tutor.email, question)
  } else {
    firebaseRef.child(`tutors/${question.category}`).once('value', mentorSnap => {
      let mentors = mentorSnap.val()
      mentorSnap.forEach(mentor => {
        sendEmailNotification(mentor.val().email, question)
      })
    })    
  }
})


function sendEmailNotification(to, question) {
  let email = {
    to: to,
    from: process.env.FROM_EMAIL,
    subject: `[New ${question.category} request]`,
    html: `${question.text}<br /><b>By</b>: ${question.author.username}<br /><a href="http://edgetech.firebaseapp.com/question/${question.id}">Click here to help</a>`
  }
  mailer.sendMail(email, (err, info) => {
    if (err)
      console.log(err)
    else console.log(info)
  })
}
