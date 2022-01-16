const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specsSchema = new Schema(
    {
        cpu: { type: String, required: true, trim: true },
        ram: { type: String, trim: true },
        components: [{ type: Schema.Types.ObjectId, ref: "components", require: true }],
        //keyboard: [{ type: Schema.Types.ObjectId, ref: "components", require: true }],
    },
    {
        timestamps: true
    }
);

const Specs = mongoose.model('specs', specsSchema)
module.exports = Specs