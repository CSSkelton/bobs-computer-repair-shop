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
/**
 * createUser
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: createUser
 *     description: API for adding a new user document to MongoDB Atlas
 *     summary: Creates a new user document
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - address
 *               - isDisabled
 *               - role
 *               - whatIsYourFirstPetsName
 *               - whatIsYourMothersMaidenName
 *               - whatIsTheModelOfYourFirstCar
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               isDisabled:
 *                 type: boolean
 *               role:
 *                 type: string
 *               whatIsYourFirstPetsName:
 *                 type: string
 *               whatIsYourMothersMaidenName:
 *                 type: string
 *               whatIsTheModelOfYourFirstCar:
 *                 type: string
 *
 *
 *     responses:
 *       '200':
 *         description: User added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/", async (req, res) => {
  console.log("Hello World!!!");
  try {
    console.log(`email: ${req.body.email}`);

    const newUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      isDisabled: req.body.isDisabled,
      role: req.body.role,
      whatIsYourFirstPetsName: req.body.whatIsYourFirstPetsName,
      whatIsYourMothersMaidenName: req.body.whatIsYourMothersMaidenName,
      whatIsTheModelOfYourFirstCar: req.body.whatIsTheModelOfYourFirstCar,
    };

    mongo(async (db) => {
      const result = await db.collection("users").insertOne(newUser);

      res.status(201).send({ User: newUser });
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;
