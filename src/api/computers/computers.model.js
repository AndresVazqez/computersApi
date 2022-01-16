const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComputersSchema = new Schema({
    manufacturer: { type: String, required: true, trim: true },
    model: { type: String, required: true},
    price: { type: Number},
    //specs: { type: Number, required: true},     
    specs: [{ type: Schema.Types.ObjectId, ref: "specs", required: true }],
    img: { type: String, trim: true },
}, 
{ 
    timestamp: true 
}
)

const Computer = mongoose.model('computers', ComputersSchema)
module.exports = Computer