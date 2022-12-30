const express = require("express");
const router = express.Router();

//importing data model schemas 
let { organization } = require("../models/organization");

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    organization.find(
        { _id: req.params.id },
        (error, data) => {
            if (error) {
                return next(error);
            }
            else if (data === null) {
                res.status(404).send('Organization ID Not Found. Confirm Organization ID.');
            }
            else {
                res.json(data);
                console.log('Success, Organization found')
            }
        }
    );
});


//POST client 
router.post("/", (req, res, next) => {
    organization.create(
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Org Successfully Added');
                console.log('Org Successfully Added');
            }
        }
    );
});


router.get("/orgname", (req, res, next) => {
    organization.findOne(
        { _id: process.env.organization },
        (error, data) => {
            if (error) {
                return next(error);
            }
            else {
                res.json(data);
                console.log('Retrieval Successful');
            }
        }
    );
});

module.exports = router;