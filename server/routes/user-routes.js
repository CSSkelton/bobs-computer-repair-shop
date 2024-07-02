/**
 * Title: user-routes.js
 * Author: Cody Skelton
 * Date: 07.01.2024
 */
"use strict";

const express = require("express");
// Add mongo.js document variables
const { mongo } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

const createError = require("http-errors");
const router = express.Router();

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
    mongo(async (db) => {
      const users = await db.collection("users").find().toArray();

      console.log("users", users);

      if (!users) {
        return next(createError(404, "No employees found"));
      }

      res.send(users);
    }, next);
  } catch (err) {
    console.error("err", err);
    next(err);
  }
});

/**
 * findUserById
 * @openapi
 * /api/users/{email}:
 *   get:
 *     tags:
 *       - Users
 *     description:  API for returning a user document
 *     summary: returns a user document
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Users document email
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User document
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/:email", (req, res, next) => {
  try {
    let { email } = req.params;

    //Database query is handled
    mongo(async (db) => {
      const user = await db.collection("users").findOne({ email });

      if (!user) {
        console.error("User email not found:", email);
        return next(createError(404, "User not found"));
      }

      res.send(user);
    }, next);
  } catch (err) {
    console.error("Error: ", err);
    next(err);
  }
});

module.exports = router;
