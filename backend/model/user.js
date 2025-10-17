const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  mobile_email: { type: String, required: true },
  password: { type: String, required: true },
  DOB: { type: String, required: true },
  Gender: { type: String, required: true },
  profile_pic:{type:String,required:false,Default:"Not_uploaded_yet"},
  banner_pic:{type:String,required:false,Default:"Not_uploaded_yet"},
  post:{type:Array,required:false,Default:"Not_uploaded_yet"},
  Study:{type:String,required:false,Default:"Not_uploaded_yet"},
  Live:{type:String,required:false,Default:"Not_uploaded_yet"},
  From:{type:String,required:false,Default:"Not_uploaded_yet"},
  Relationship:{type:String,required:false,Default:"Not_uploaded_yet"},
  photos:{type:String,required:false,Default:"Not_uploaded_yet"},
  Friend:{type:String,required:false,Default:"Not_uploaded_yet"},
});

// Export the model properly
module.exports = model("UserData", userSchema);
