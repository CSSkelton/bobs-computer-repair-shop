/**
 * Title: security-routes.js
 * Author: Cody Skelton
 * Date: 07.07.2024
 */
"use strict";

const express = require("express");
const { mongo } = require("../utils/mongo");
const createError = require("http-errors");
const router = express.Router();
const Ajv = require("ajv");
const bcrypt = require('bcryptjs');
const ajv = new Ajv();

/**
 * signIn
 * @openapi
 * /api/security/signin:
 *  post:
 *   description: returns a user document on successful login
 *   summary: user sign in
 *   tags:
 *    - Security
 *   requestBody:
 *    description: login credentials
 *    content:
 *     application/json:
 *      schema:
 *       required:
 *        - email
 *        - password
 *       properties:
 *        email:
 *         type: string
 *        password:
 *         type: string
 *   responses:
 *    '200':
 *     description: OK
 *    '400':
 *     description: Bad Request
 *    '404':
 *     description: Not Found
 *    '500':
 *     description: Internal Server Error
 */
const signinSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

router.post('/signin', (req, res, next) => {
  try {
    const signin = req.body;
    console.log('signin:', signin);

    const validate = ajv.compile(signinSchema);
    const valid = validate(signin);

    if (!valid) {
      console.error('Invalid user credentials');
      return next(createError(400, 'Invalid user credentials'))
    }

    mongo(async db => {
      const user = await db.collection('users').findOne({ email: signin.email })
      console.log('user', user)

      if (!user) {
        console.error('No user found with email', signin.email)
        return next(createError(404, `No user found with ${signin.email}`))
      }

//    let passwordIsValid = bcrypt.compareSync(signin.password, user.password)
//    [!passwordIsValid ] other conditional - use if testing on new user accounts
      if (signin.password != user.password) {
        console.error('Invalid user password');
        return next(createError(400, 'Invalid password'))
      }

      res.send(user)
    }, next)
  } catch (err) {
    console.log(`API Error: ${err.message}`)
    next(err)
  }
})

/**
 * verifyUser
 * @openapi
 * /api/security/verify/users/{email}:
 *  post:
 *   description: retrieves user document based off of provided email
 *   summary: retrieve user by email
 *   tags:
 *    - Password Reset
 *   parameters:
 *    - name: email
 *      in: path
 *      required: true
 *      description: User Email
 *      schema:
 *       type: string
 *   responses:
 *    '200':
 *     description: OK
 *    '400':
 *     description: Bad Request
 *    '404':
 *     description: Not Found
 *    '500':
 *     description: Internal Server Error
 */
router.post('/verify/users/:email', (req, res, next) => {
  try {
    const email = req.params.email
    console.log ('email', email);

    mongo (async db => {
      const user = await db.collection('users').findOne({ email: email })

      if (!user) {
        const err = new Error('Not Found')
        err.status = 404
        console.log('User not found', err)
        next(err)
        return
      }

      console.log('Selected user', user);

      res.send(user)
    }, next)
  } catch (err) {
    console.log(`API Error: ${err.message}`);
    next(err);
  }
})

/**
 * verifySecurityQuestions
 * @openapi
 * /api/security/verify/users/{email}/security-questions:
 *  post:
 *   tags:
 *    - Password Reset
 *   description: check user security question answers vs what's stored in database
 *   summary: check security question answers
 *   parameters:
 *    - name: email
 *      in: path
 *      required: true
 *      description: User Email
 *      schema:
 *       type: string
 *   requestBody:
 *    description: User answers
 *    content:
 *     application/json:
 *      schema:
 *       required:
 *        - securityQuestions
 *       properties:
 *        securityQuestions:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           answer:
 *            type: string
 *           question:
 *            type: string
 *   responses:
 *    '200':
 *     description: OK
 *    '400':
 *     description: Bad Request
 *    '404':
 *     description: Not Found
 *    '500':
 *     description: Internal Server Error
 */

const securityQuestionsSchema = {
  type: "object",
  required: [ "securityQuestions" ],
//  additionalProperties: false,
  properties: {
    securityQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          answer: { type: "string" },
          question: { type: "string" }
        },
        required: [ "answer", "question" ],
        additionalProperties: false
      }
    }
  }
}
router.post('/verify/users/:email/security-questions', (req, res, next) => {
  try {

    const email = req.params.email
    const { securityQuestions } = req.body

    console.log('email', email)
    console.log('security questions', securityQuestions)
    // Checking data type of securityQuestions bc error with validation
    console.log(typeof(securityQuestions))
    // Making sure both were of type object
    console.log(typeof(securityQuestions[0]))

    // const validate = ajv.compile(securityQuestionsSchema)
    // const valid = validate(securityQuestions)

    // if (!valid) {
    //   const err = new Error('Bad Request')
    //   err.status = 400
    //   err.errors = validate.errors
    //   console.log('securityQuestions validation errors', validate.errors)
    //   next(err)
    //   return
    // }

    mongo(async db => {
      const user = await db.collection('users').findOne({ email: email })

      if (!user) {
        const err = new Error('No user found' + email)
        err.status = 404
        console.log('User not found', err)
        next(err)
        return
      }

      console.log('User', user)

      if (securityQuestions[0].answer !== user.selectedSecurityQuestions[0].answer ||
        securityQuestions[1].answer !== user.selectedSecurityQuestions[1].answer ||
        securityQuestions[2].answer !== user.selectedSecurityQuestions[2].answer) {

        const err = new Error('Unauthorized')
        err.status = 401
        err.message = 'Unauthorized: Security questions do not match'
        console.log('Security questions do not match', err)
        next(err)
        return
      }

      res.send(user)
    }, next)
  } catch (err) {
    console.log(`API Error ${err.message}`)
    next(err)
  }
})

/**
 * resetPassword
 * @openapi
 * /api/security/users/{email}/reset-password:
 *  post:
 *   tags:
 *    - Password Reset
 *   description: Reset user password if security question answers correct
 *   summary: Reset user password
 *   parameters:
 *    - name: email
 *      in: path
 *      required: true
 *      description: User Email
 *      schema:
 *       type: string
 *   requestBody:
 *    description: New user password
 *    content:
 *     application/json:
 *      schema:
 *       required:
 *        - password
 *       properties:
 *        password:
 *         type: string
 *   responses:
 *    '200':
 *     description: OK
 *    '400':
 *     description: Bad Request
 *    '404':
 *     description: Not Found
 *    '500':
 *     description: Internal Server Error
 */
const resetPasswordSchema = {
  properties: { password: { type: 'string '} },
  required: [ 'password ' ],
  additionalProperties: false
}

router.post('/users/:email/reset-password', (req, res, next) => {
  try {
    const email = req.params.email
    const password = req.body.password



    console.log('User email', email)

    // const validate = ajv.validate(resetPasswordSchema, password)

    // if (!valid) {
    //   const err = new Error('Bad Request')
    //   err.status = 400
    //   err.errors = validate.errors
    //   console.log('password validation errors', validate.errors)
    //   next(err)
    //   return
    // }

    mongo(async db => {
      const user = await db.collection('users').findOne({ email: email })
      const salt = await bcrypt.genSalt(10)

      if (!user) {
        const err = new Error('Not Found')
        err.status = 404
        console.log('User not found', err)
        next(err)
        return
      }

      console.log('Selected User', user)

      const hashedPassword = await bcrypt.hash(password, salt)
      console.log(password)
      console.log(hashedPassword)

      const result = await db.collection('users').updateOne(
        { email: email },
        {
          $set: { password: hashedPassword }
        }
      )

      console.log('MongoDB update result', result)

      res.status(204).send()
    }, next)
  } catch (err) {
    console.log(`API Error: ${err.message}`)
    next(err)
  }
})

module.exports = router;