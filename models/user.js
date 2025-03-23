const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/intern`);

const userSchema = mongoose.Schema({
    image:String,
    name:String,
    internp:String,
    phone:Number
}); 

//export this model:

module.exports = mongoose.model("user",userSchema);