// Version 1.4 Everything Working -- Jason Lu
// All routes working
// Graph backend not working
// Improved Console Logs and Errors

const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventsdata } = require("../models/eventsData");

//GET all entries
router.get("/", (req, res, next) => {
    eventsdata.find({ org_id: process.env.organization },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                console.log("Get response success! ");
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(9999999);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    eventsdata.find({ _id: req.params.id, org_id: process.env.organization }, (error, data) => {
        if (error) {
            return next(error)
        }
        else if (data === null) {
            res.status(404).send('Event ID Not Found. Confirm Event ID.');
        }
        else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
//Will retrieve the event either by name of event
//or by the date of the event 
router.get("/search/", (req, res, next) => {
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" }, org_id: process.env.organization }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = { date: req.query["eventDate"], org_id: process.env.organization }
    };
    eventsdata.find(
        dbQuery,
        (error, data) => {
            if (error) {
                res.send('Search Did Not Match. Confirm Search Query');
                console.log('Search Did Not Match. Confirm Search Query')
            }
            else {
                res.json(data);
                console.log('Successful Retrieval');
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => {
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

//POST Event
router.post("/", (req, res, next) => {
    eventsdata.create(
        req.body,
        (error) => {
            if (error) {
                return next(error);
            }
            else {
                res.send('Event Successfully Added');
                console.log('Event Successfully Added')
            }
        }
    );
});

//PUT(update event by ID)
router.put("/:id", (req, res, next) => {
    eventsdata.findOneAndUpdate(
        { event_id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            }
            else if (data === null) {
                res.status(404).send('Event ID Not Found. Confirm Event ID.');
            }
            else {
                res.send('Event Successfully Updated');
                console.log('Event Successfully Updated')
            }
        }
    );
});

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    eventsdata.findOneAndUpdate({ _id: req.params.id, org_id: process.env.organization }, {
        $push: {
            attendee: req.body.attendee
        }
    }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Event ID Not Found. Confirm Event ID.');
        }
        else {
            res.send('Attendee Successfully Added');
            console.log('Attendee Successfully Added')
        }
    });
});


//DELETE event by ID -- Jason Lu 10/5/2022 5:13 AM
router.delete('/:id', (req, res, next) => {
    eventsdata.findOneAndRemove({ event_id: req.params.id, org_id: process.env.organization }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Event ID Not Found. Confirm Event ID.');
        }
        else {
            res.send('Event Successfully Deleted');
            console.log('Event Successfully Deleted');
        }
    });
});



// Counts total number of event attendees for each event
router.get("/previousAttendees", (req, res, next) => {
    var checkDate = new Date()

    eventsdata.aggregate([
        {
            $match: {
                org_id: process.env.organization,
                date: {
                    $gt: new Date(checkDate.setMonth(checkDate.getMonth() - 2)),
                    $lt: new Date(),

                }
            }
        },
        {
            $group: {
                _id: "$eventName",
                total: { $sum: { $size: "$attendee" } },
            }
        }
    ],
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
                console.log('Count Successful');
            }
        }
    )
});
module.exports = router;