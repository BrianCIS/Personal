//This is the Organization collection
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let organizationSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    organization_name: {
        type: String,
    },

},
    {
        collection: 'organization',
        timestamps: true
    });
// create models from mongoose schemas
const organization = mongoose.model('organization', organizationSchema);

//    creating the applicant collection and adding the schemas in the database.
module.exports = { organization }


