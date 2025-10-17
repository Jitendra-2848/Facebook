const register = require("../model/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cloud = require("../middleware/cloudinary")

const generatetoken = require("../middleware/jwt");
const reg = async (req, res) => {
    try {
        const { first, last, mob_email, pass, Dob, gen } = req.body;
        if (!first || !last || !mob_email || !pass || !Dob || !gen) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        const exist = await register.findOne({ mobile_email: mob_email })
        if (exist) {
            return res.status(401).json({ message: "You have already registered." });
        }

        const saltRounds = 10;
        const hashed = await bcrypt.hash(pass, saltRounds);
        
        const record = register({
            firstname: first,
            surname: last,
            mobile_email: mob_email,
            password: hashed,
            DOB: Dob,
            Gender: gen,
            profile_pic: "",
            banner_pic: "",
            post: "",
        })
        
        generatetoken(record._id, res)
        record.save();
        return res.status(200).json({ message: "Registration successful!" });
    } catch (error) {
        return res.status(400).json({ message: "Registration failed: " + error.message });
    }
}

const log = async (req, res) => {
    try {
        const { user, pass } = req.body;
        if (!user || !pass) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        const data = await register.findOne({ mobile_email: user });
        if (!data) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }
        const val = await bcrypt.compare(pass, data.password);
        if (!val) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }
        generatetoken(data._id, res)
        return res.status(200).json({ message: "Welcome back!" });
    } catch (error) {
        return res.status(500).json({ message: "Login failed: " + error.message })
    }
}
const check = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json("worry");
    }
}
const profile = async (req, res) => {
    try {
        const { id, firstname, surname, mobile_email, profile_pic } = req.body;
        var picture;
        if (profile_pic) {
            picture = await cloud.uploader.upload(profile_pic);
        }
        else {
            picture = "ladle";
        }
        try {
            const a = await register.findByIdAndUpdate(id, {
                firstname: firstname,
                surname: surname,
                mobile_email: mobile_email,
                profile_pic: picture.secure_url || "",
            })
        } catch (error) {
            console.log(error)
        }
        return res.status(200).json({ message: "updated successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}
const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        return res.status(200).json({ message: "succesfully logout" });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong" });
    }
}
const Adv_update = async (req, res) => {
    try {
        let profile_pic_url = req.body.profile_pic;
        let banner_pic_url = req.body.banner_pic;
        const newPost = req.body.post && req.body.post[0];
        if (newPost && newPost.image && !newPost.image.startsWith('http')){
            const uploadedPost = await cloud.uploader.upload(newPost.image);
            req.body.post[0].image = uploadedPost.secure_url; 
        }
        if (req.body.profile_pic && !req.body.profile_pic.startsWith('http')) {
            const result = await cloud.uploader.upload(req.body.profile_pic);
            profile_pic_url = result.secure_url;
        }
        if (req.body.banner_pic && !req.body.banner_pic.startsWith('http')) {
            const result = await cloud.uploader.upload(req.body.banner_pic);
            banner_pic_url = result.secure_url;
        }
        const result = await register.findByIdAndUpdate(req.user.id, {
            bio: req.body.bio || "",
            banner_pic: banner_pic_url || req.body.banner_pic || "",
            post: req.body.post || [],
            Study: req.body.Study || "",
            Live: req.body.Live || "",
            From: req.body.From || "",
            Relationship: req.body.Relationship || "",
            photos: req.body.photos || "",
            Friend: req.body.Friend || "",
            profile_pic: profile_pic_url || req.body.profile_pic || "",
        });
        if (result) {
            return res.status(200).json({ message: "successfully updated", data: result });
        }
        return res.status(404).json({ message: "User not found for update." });
    } catch (error) {
        console.error("Update failed:", error.message);
        return res.status(500).json({ message: "failed due to " + error.message });
    }
}


module.exports = {
    reg,
    log,
    check,
    profile,
    logout,
    Adv_update,
}