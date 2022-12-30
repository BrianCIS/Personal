//This is the Events collection
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventsSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    eventName: {
        type: String,
        required: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true,
    },


    //Embedded location information
    address: {
        line1: {
            type: String,
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    //Make an array to allow the client to input multiple attendees
    attendee: {
        type: Array
    },
    org_id: {
        type: String,
        required: true,
        default: process.env.organization
    }
},
    {
        collection: 'eventsData'
    });
// create models from mongoose schemas
const eventsdata = mongoose.model('eventsData', eventsSchema);
//    creating the applicant collection and adding the schemas in the database.
module.exports = { eventsdata }