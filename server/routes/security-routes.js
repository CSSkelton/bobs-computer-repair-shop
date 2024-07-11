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
 *    - Security
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

/**
 * verifySecurityQuestions
 * @openapi
 * /api/security/verify/users/{email}/security-questions:
 *  post:
 *   description: check user security question answers vs what's stored in database
 *   summary: check security question answers
 *   tags:
 *    - Security
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
 *        - secQuestion1
 *        - secQuestion2
 *        - secQuestion3
 *        - secAnswer1
 *        - secAnswer2
 *        - secAnswer3
 *       properties:
 *        secQuestion1:
 *         type: string
 *        secQuestion2:
 *         type: string
 *        secQuestion3:
 *         type: string
 *        secAnswer1:
 *         type: string
 *        secAnswer2:
 *         type: string
 *        secAnswer3:
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

/**
 * resetPassword
 * @openapi
 * /api/security/users/{email}/reset-password:
 *  post:
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

module.exports = router;