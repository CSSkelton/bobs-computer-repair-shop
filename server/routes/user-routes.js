/**
 * Title: user-routes.js
 * Author: Cody Skelton
 * Updated by: Jeremy Lates
 * Date: 07.07.2024
 */
"use strict";

const express = require("express");
// Add mongo.js document variables
const { mongo } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

const createError = require("http-errors");
const router = express.Router();
const Ajv = require("ajv");
const ajv = new Ajv();

const bcrypt = require("bcryptjs");

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
 *        firstName:
 *         type: string
 *        lastName:
 *         type: string
 *        phoneNumber:
 *         type: string
 *        address:
 *         type: string
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
  type: "object",
  additionalProperties: false,
  properties: {
    email: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    phoneNumber: { type: "string" },
    address: { type: "string" },
  },
};
router.put("/:userId", (req, res, next) => {
  try {
    mongo(async (db) => {
      const user = await db
        .collection("users")
        .findOne({ email: req.params.userId });

      if (!user) {
        return next(
          createError(404, `User not found with User ID ${req.params.userId}`)
        );
      }

      const updatedUser = req.body;

      // If no specified property, use previous value
      if (updatedUser.email == "string") {
        updatedUser.email = user.email;
      }
      if (updatedUser.firstName == "string") {
        updatedUser.firstName = user.firstName;
      }
      if (updatedUser.lastName == "string") {
        updatedUser.lastName = user.lastName;
      }
      if (updatedUser.phoneNumber == "string") {
        updatedUser.phoneNumber = user.phoneNumber;
      }
      if (updatedUser.address == "string") {
        updatedUser.address = user.address;
      }

      console.log(updatedUser);

      const validator = ajv.compile(userSchema);
      console.log("got here");
      const valid = validator(updatedUser);
      if (valid) {
        console.log("it was def valid");
      }

      if (!valid) {
        return next(createError(400, "Invalid task payload", validator.errors));
      }

      const result = await db.collection("users").updateOne(
        { email: req.params.userId },
        {
          $set: {
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phoneNumber: updatedUser.phoneNumber,
            address: updatedUser.address,
          },
        }
      );

      res.status(204).send(result);
    }, next);
  } catch (err) {
    console.error("err", err);
    next(err);
  }
});

/**
 * deleteUser
 * @openapi
 * /api/users/{userId}:
 *  delete:
 *   summary: delete user from accessible directory
 *   description: mark user document as inactive
 *   parameters:
 *    - name: userId
 *      in: path
 *      required: true
 *      description: User email
 *      schema:
 *       type: string
 *   responses:
 *    '204':
 *     description: No content. Operation successful
 *    '404':
 *     description: User not found
 *    '500':
 *     description: Server exception
 *    '501':
 *     description: MongoDB Exception
 */
router.delete("/:userId", (req, res, next) => {
  try {
    let { userId } = req.params;

    mongo(async (db) => {
      let user = await db.collection("users").findOne({ email: userId });

      if (!user) {
        return next(createError(404, `User not found with email ${userId}`));
      }

      const result = await db
        .collection("users")
        .updateOne({ email: userId }, { $set: { isDisabled: true } });

      res.status(204).send(result);
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

//Register API
/**
 * registerUser
 * @openapi
 * /api/users/register:
 *  post:
 *   summary: register user details
 *   description: Updates user document
 *   requestBody:
 *    description: User details
 *    content:
 *     application/json:
 *      schema:
 *       properties:
 *        email:
 *         type: string
 *        firstName:
 *         type: string
 *        lastName:
 *         type: string
 *        password:
 *         type: string
 *        phoneNumber:
 *         type: string
 *        address:
 *         type: string
 *        whatIsYourFirstPetsName:
 *          type: string
 *        whatIsYourMothersMaidenName:
 *          type: string
 *        whatIsTheModelOfYourFirstCar:
 *          type: string
 *   responses:
 *    '200':
 *     description: user registered
 *    '400':
 *     description: Bad Request
 *    '404':
 *     description: User already in database
 *    '500':
 *     description: Internal Server Error
 *   tags:
 *    - User
 */
router.post("/register", (req, res, next) => {
  console.log("register user api....");
  const saltRounds = 10;

  const myBOdy = req.body;
  console.log("Body: ", myBOdy);

  const registerSchema = {
    type: "object", //Needed to remove this line to get it to work. Not sure why.. I thought we needed it.
    additionalProperties: false,
    properties: {
      email: { type: "string" },
      password: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      phoneNumber: { type: "string" },
      address: { type: "string" },
      isDisabled: { type: "boolean" },
      role: { type: "string" },
      whatIsYourFirstPetsName: { type: "string" },
      whatIsYourMothersMaidenName: { type: "string" },
      whatIsTheModelOfYourFirstCar: { type: "string" },
    },
    required: ["email", "firstName", "lastName", "password"],
  };

  try {
    let email = req.body.email;
    console.log("req body email: ", req.body.email);
    console.log("email: ", email);

    const newUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      isDisabled: false,
      role: "user",
      whatIsYourFirstPetsName: req.body.whatIsYourFirstPetsName,
      whatIsYourMothersMaidenName: req.body.whatIsYourMothersMaidenName,
      whatIsTheModelOfYourFirstCar: req.body.whatIsTheModelOfYourFirstCar,
      selectedSecurityQuestions: [
        {
          question: req.body.securityQuestions[0].question1,
          answer: req.body.securityQuestions[0].answer1,
        },
        {
          question: req.body.securityQuestions[1].question2,
          answer: req.body.securityQuestions[1].answer2,
        },

        {
          question: req.body.securityQuestions[2].question3,
          answer: req.body.securityQuestions[2].answer3,
        },
      ],
    };

    console.log("New User: ", newUser);

    //TODO: Update validator schema
    //validate the newUser object using ajv
    // const validate = ajv.compile(registerSchema);
    // const valid = validate(newUser);
    let valid = true;

    //If the user object is not valid return a 400 error to the client
    if (!valid) {
      const err = new Error("Bad request");
      err.stats = 400;
      err.errors = validate.errors;
      console.log("User validation errors ", validate.errors);
      next(err); //return the error to the client
      return; //exit from function
    }

    //Hash password
    newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
    console.log("User Hashed Password: ", newUser.password);

    //Call MongoDB
    //Database query is handled
    mongo(async (db) => {
      const user = await db.collection("users").findOne({ email });

      if (user) {
        console.error("User email found in database:", email);
        return next(createError(404, "User found in database"));
      }

      //This means email was not found. Add user to the database
      const result = await db.collection("users").insertOne(newUser);
      console.log("User inserted into the database: ", newUser);
      res.send({ email: newUser.email });
    }, next);
  } catch (err) {
    console.log(err);
    console.log(`API Error: ${err.message}`);
    next(err); //return error to user
  }
});

/**
 * findSelectedSecurityQuestions
 * @openapi
 * /api/users/{email}/security-questions:
 *  get:
 *   tags:
 *    - Password Reset
 *   description: Retrieve user's selected security questions
 *   summary: Retrieve security questions
 *   parameters:
 *    - name: email
 *      in: path
 *      required: true
 *      description: Users document email
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
router.get("/:email/security-questions", (req, res, next) => {
  try {
    const email = req.params.email;

    console.log("email", email);

    mongo(async (db) => {
      const user = await db
        .collection("users")
        .findOne(
          { email: email },
          { projection: { _id: 0, email: 1, selectedSecurityQuestions: 1 } }
        );

      console.log("Selected security questions", user);

      if (!user) {
        const err = new Error("Unable to find user" + email);
        err.status = 404;
        console.log("err", err);
        next(err);
        return;
      }

      res.send(user);
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

/**
 * updateUserProfile
 */
router.put('/:email/update-profile', (req, res, next) => {
  try {
    const email = req.params.email
    const user = req.body

    mongo(async db => {
      const result = await db.collection('users').updateOne(
        { email },
        {
          $set: {
            firstName: user.firstName,
            lastName: user.lastName
          }
        }
      )

      res.status(204).send(result)
    }, next)
  } catch(err) {
    console.error('err', err)
    next(err)
  }
})

module.exports = router;
