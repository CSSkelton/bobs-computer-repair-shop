/**
 * Title: user-routes.js
 * Author: Cody Skelton
 * Date: 07.01.2024
 */
"use strict";

const express = require("express");
// Add mongo.js document variables
const { mongo } = require("../utils/mongo");
const { ObjectId } = require('mongodb');

const createError = require("http-errors");
const router = express.Router();
const Ajv = require('ajv');
const ajv = new Ajv();

/**
 * findAll
 * @openapi
 * /api/users:
 *  get:
 *   summary: Returns all user documents in the database
 *   description: Get all employee information
 *   responses:
 *    '200':
 *     description: User documents
 *    '400':
 *     description: Bad Request
 *    '404':
 *     description: Resource not found
 *    '500':
 *     description: Server Error
 *   tags:
 *    - User
 */
router.get("/", (req, res, next) => {
  try {

    mongo(async db => {
      const users = await db.collection('users').find().toArray();

      console.log('users', users);

      if (!users) {
        return next(createError(404, 'No employees found'));
      }

      res.send(users);
    }, next);
  } catch (err) {
    console.error('err', err);
    next(err);
  }
});


/**
 * updateUser
 * @openapi
 * /api/users/{userId}:
 *  put:
 *   summary: Update user details
 *   description: Updates user document details
 *   parameters:
 *    - name: userId
 *      in: path
 *      required: true
 *      description: user ID (email)
 *      schema:
 *       type: string
 *   requestBody:
 *    description: User details
 *    content:
 *     application/json:
 *      schema:
 *       properties:
 *        email:
 *         type: string
 *        password:
 *         type: string
 *        firstName:
 *         type: string
 *        lastName:
 *         type: string
 *        phoneNumber:
 *         type: string
 *        address:
 *         type: string
 *        isDisabled:
 *         type: boolean
 *        role:
 *         type: array
 *         items:
 *          type: string
 *        selectedSecurityQuestions:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           question:
 *            type: string
 *           answer:
 *            type: string
 *        invoices:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           email:
 *            type: string
 *           fullName:
 *            type: string
 *           lineItems:
 *            type: array
 *            items:
 *             type: object
 *             properties:
 *              service:
 *               type: string
 *              price:
 *               type: number
 *           partsAmount:
 *            type: number
 *           laborAmount:
 *            type: number
 *           lineItemTotal:
 *            type: number
 *           invoiceTotal:
 *            type: number
 *           orderDate:
 *            type: string
 *   responses:
 *    '204':
 *     description: No content
 *    '400':
 *     description: Bad Request
 *    '404':
 *     description: Not Found
 *    '500':
 *     description: Internal Server Error
 *   tags:
 *    - User
 */
const userSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    phoneNumber: { type: 'string' },
    address: { type: 'string' },
    isDisabled: { type: 'boolean' },
    role: {
      type: 'array',
      items: { type: 'string' }
    },
    selectedSecurityQuestions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          answer: { type: 'string' }
        },
        //required: [ 'question', 'answer' ],
        additionalProperties: false
      }
    },
    invoices: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          fullName: { type: 'string' },
          lineItems: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                service: { type: 'string' },
                price: { type: 'number' }
              },
              //required: [ 'service', 'part' ],
              additionalProperties: false
            }
          },
          partsAmount: { type: 'number' },
          laborAmount: { type: 'number' },
          lineItemTotal: { type: 'number' },
          invoiceTotal: { type: 'number' },
          orderDate: { type: 'string' }
        },
        /*required: [
          'email', 'fullName', 'partsAmount', 'laborAmount',
          'lineItemTotal', 'invoiceTotal', 'orderDate'
        ],
        */
        additionalProperties: false
      }
    },
  }
}
router.put("/:userId", (req, res, next) => {
  try {

    mongo(async db => {
      const user = await db.collection('users').findOne( { 'email': req.params.userId } );

      if (!user) {
        return next(createError(404, `User not found with User ID ${req.params.userId}`));
      }

      const updatedUser = req.body;

      const validator = ajv.compile(userSchema);
      const valid = validator(updatedUser);

      if (!valid) {
        return next(createError(400, 'Invalid task payload', validator.errors));
      }

      const result = await db.collection('users').updateOne(
        { 'email': req.params.userId },
        {
          $set: {
            email: updatedUser.email,
            password: updatedUser.password,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phoneNumber: updatedUser.phoneNumber,
            address: updatedUser.address,
            isDisabled: updatedUser.isDisabled,
            role: updatedUser.role,
            selectedSecurityQuestions: updatedUser.selectedSecurityQuestions,
            invoices: updatedUser.invoices
          }
        }
      )

      res.status(204).send(updatedUser);
    }, next);
  } catch (err) {
    console.error('err', err);
    next(err);
  }
});

module.exports = router;