const post = require("../model/post");
const cloud = require("../middleware/cloudinary")
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
const create = async (req, res) => {
    try {
        const { id, content, post_img, profile_pic,name, like, comment } = req.body;
        let uploadedPost = "";
        if (post_img) {
            uploadedPost = await cloud.uploader.upload(post_img);
            uploadedPost = uploadedPost.secure_url;
        }
        const rand = uuidv4();
        const result = await post({
            id, content, post_img: uploadedPost, like,name, comment, profile_pic, rand
        })
        result.save();
        return res.status(200).json({ message: "successfully created", data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong", error: error })
    }
}
const get = async (req, res) => {
    try {
        const result = await post.find({});
        // console.log(result);
        return res.status(200).json({ message: "succesfully get data", data: result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong", error: error })
    }
}
const sorted = async (req, res) => {
    try {
        const { id } = req.body;
        const result = post.find({ id: { $ne: id } });
        return result.status(200).json({ message: "succesfully get data", data: result })
    } catch (error) {
        console.log(error);
        return resizeBy.status(500).json({ message: "something went wrong", error: error })
    }
}
const delpost = async (req, res) => {
    try {
        // console.log(req.params.id)
        const rand = req.params.id;
        const result = await post.deleteOne({ rand: rand })
        return res.status(200).json({ message: "successfully deleted" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}
const update_post = async (req, res) => {
    try {
        const userId = req.params.id; // Get userId from URL params
        const { postId } = req.body; // Get postId from request body

        const postToUpdate = await post.findById(postId._id);
        if (!postToUpdate) return res.status(404).json({ message: "Post not found." });

        // Check if user has already liked the post
        const hasLiked = postToUpdate.like.includes(userId);
        const operator = hasLiked ? '$pull' : '$addToSet';
        const message = hasLiked ? "Post unliked." : "Post liked.";

        // Update the post - add or remove userId from like array
        await post.updateOne(
            { _id: postId._id },
            { [operator]: { like: userId } }
        );

        // Return the updated post data
        const updatedPost = await post.findById(postId);
        return res.status(200).json({
            message,
            post: updatedPost,
            liked: !hasLiked
        });
    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
}
module.exports = {
    create,
    get,
    delpost,
    sorted,
    update_post,
};