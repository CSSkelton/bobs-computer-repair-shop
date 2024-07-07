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

module.exports = router;