// Version 1.5 Everything Working -- Jason Lu
// All routes working
// Improved Console Logs and Errors
// Added and verified code works for GET events signed up by a specific client.

const express = require("express");
const router = express.Router();

//importing data model schemas
let { clientsdata } = require("../models/clientsData");
let { eventsdata } = require("../models/eventsData");

//GET all entries

router.get("/", (req, res, next) => {
    clientsdata.find({ org_id: process.env.organization },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                console.log("Get response success! ");
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    clientsdata.find(
        { _id: req.params.id, org_id: process.env.organization },
        (error, data) => {
            if (error) {
                return next(error);
            }
            else if (data === null) {
                res.status(404).send('Client ID Not Found. Confirm Client ID.');
            }
            else {
                res.json(data);
                console.log('Successfully retrieved by Client ID');
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name'
//Client name will be retrieved along with phone number and city
router.get("/search/", (req, res, next) => {
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" }, org_id: process.env.organization }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            //corrected ord_id: process spelling error, working now
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }, org_id: process.env.organization
        }
    };
    clientsdata.find(
        dbQuery,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('Successful Retrieval');
            }
        }
    );
});

//GET events for a single client
router.get("/events/:id", (req, res, next) => {
    eventsdata.find({ client_id: req.params.id, org_id: process.env.organization }, (error, data) => {
        if (error) {
            return next(error)
        }
        else if (data === null) {
            res.status(404).send('Client ID Not Found. Confirm Client ID.');
        }
        else {
            res.json(data);
            console.log('Client Found');
        }
    })
});

//POST client 
router.post("/", (req, res, next) => {
    clientsdata.create(
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Client Successfully Added');
                console.log('Client Successfully Added');
            }
        }
    );
    clientsdata.createdAt;
    clientsdata.updatedAt;
    clientsdata.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => {
    clientsdata.findOneAndUpdate(
        { _id: req.params.id, org_id: process.env.organization },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            }
            else if (data === null) {
                res.status(404).send('Client ID Not Found. Confirm Client ID.');
            }
            else {
                res.send('Client Successfully Updated');
                console.log('Client Successfully Updated');
            }
        }
    );
});

//DELETE person by ID -- Jason Lu 10/3/2022 9:44 PM
router.delete('/:id', (req, res, next) => {
    //mongoose will use _id of document
    clientsdata.findOneAndRemove({ _id: req.params.id, org_id: process.env.organization }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client ID Not Found. Confirm Client ID.');
        }
        else {
            res.send('Client Successfully Deleted');
            console.log('Client Successfully Deleted');
        }
    });
});

module.exports = router;