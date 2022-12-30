//This is the Clients collection
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let clientsSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
    //Embedded contact information
    //set up so that valid email format needed for insert
    //on frontend
    email: {
        type: String,
    },
    phoneNumbers: {
        type: Array,
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String
        },
        city: {
            type: String
        },
        county: {
            type: String
        },
        zip: {
            type: String
        },
    },
    org_id: {
        type: String,
        required: true,
        default: process.env.organization
    }
},
    {
        collection: 'clientsData',
        timestamps: true
    });

// create models from mongoose schemas
const clientsdata = mongoose.model('clientsData', clientsSchema);
//    creating the applicant collection and adding the schemas in the database.
module.exports = { clientsdata }