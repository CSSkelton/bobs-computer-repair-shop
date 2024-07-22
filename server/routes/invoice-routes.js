/**
 * Title: invoice-routes.js
 * Author: Cody Skelton
 * Date: 07.20.2024
 */
"use strict";

const express = require("express");
// Add mongo.js document variables
const { mongo } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

const createError = require("http-errors");
const router = express.Router();

/**
 * findPurchasesByService
 * @openapi
 * /api/invoices/purchases-graph:
 *  get:
 *   description: Returns count of each service bought
 *   summary: Return purchase counts
 *   responses:
 *    '200':
 *     description: Requested data
 *    '400':
 *     description: Bad Request
 *    '500':
 *     description: Internal Server Error
 *   tags:
 *    - Invoice
 */

//TODO: Refactor database to show line items with price and title properties
router.get('/purchases-graph', (req, res, next) => {
  try {
    mongo(async (db) => {
      const data = await db.collection("invoices").aggregate([
        { $unwind: '$lineItems' },
        { $group: { '_id': '$lineItems.itemName',
                    'count':  {  $sum: 1  } } },
        { $sort: { '_id.service': 1  } }
      ]).toArray();

      if (!data) {
        return next(createError(400, 'Data not found'))
      }

      console.log(typeof(data));

      console.log(data)



      res.status(200).send(data);
    }, next);

  } catch (err) {
    return next(createError(500, 'Server Error'))
  }
})

module.exports = router;