const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  id:{type:mongoose.Schema.Types.ObjectId,
    required:true
    },
  name:{type:String,require:true},
  rand:{type:String,required:true},
  content:{type:String,required:true},
  post_img:{type:String,default:null},
  profile_pic:{type:String,default:undefined},
  like:{type:Array,default:[]},
  comment:{type:Number,default:"0"},
});

// Export the model properly
module.exports = model("post", postSchema);
