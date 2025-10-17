import React, { useState, useRef, useEffect, useCallback } from "react";
import {
    FaCamera,
    FaPlus,
    FaPencilAlt,
    FaHeart,
    FaRegHeart,
    FaRegSmile,
    FaArrowDown,
    FaGraduationCap,
    FaHome,
    FaMapMarkerAlt,
    FaEllipsisH,
} from "react-icons/fa";
import Nav from "./parts/Nav";
import { useNavigate } from "react-router-dom";
import { Store } from "./store/check";

const PostCreator = ({ data, newPost, setNewPost, postImage, setPostImage, fileInput, handleImage, createPost }) => (
    <div className="bg-white p-4 rounded-xl shadow-md border">
        <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder={`What's on your mind, ${data.firstname}?`}
            className="w-full p-2 border-b-2 rounded resize-none focus:outline-none focus:border-blue-500"
        />
        {postImage && (
            <div className="my-2 relative border rounded">
                <img
                    src={postImage}
                    alt="Post preview"
                    className="w-full max-h-60 object-contain rounded"
                />
                <button
                    onClick={() => setPostImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                >
                    <FaPlus className="rotate-45" />
                </button>
            </div>
        )}
        <div className="flex justify-between items-center pt-2">
            <button
                onClick={() => fileInput.current.click()}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-green-500 font-medium"
            >
                <FaCamera className="text-xl" /> Photo/Video
            </button>
            <p className="text-gray-400 text-sm">upload image of 500kb (500*500)</p>
            <button
                onClick={createPost}
                disabled={!newPost.trim() && !postImage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full disabled:opacity-50"
            >
                Post
            </button>
        </div>
        <input
            type="file"
            ref={fileInput}
            onChange={(e) => handleImage(e, "post")}
            accept="image/*"
            className="hidden"
        />
    </div>
);

const PostFeed = ({ data, delpost, user_post, likes, currentUserId }) => {
    const ProfileAvatar = ({ src, alt, initial }) => {
        const isInvalidImage = !src || src.includes("placehold.co") || src.length < 5;
        return isInvalidImage ? (
            <div className="w-10 h-10 rounded-full bg-gray-500 text-white font-semibold flex items-center justify-center uppercase">
                {initial || "?"}
            </div>
        ) : (
            <img
                src={src}
                alt={alt}
                className="w-10 h-10 rounded-full object-cover"
            />
        );
    };

    return (
        <div className="space-y-4 pb-6">
            {user_post.length > 0 ? (
                user_post.map((post, idx) => {
                    const isLiked = post.like.includes(currentUserId);
                    const userInitial = data.firstname ? data.firstname.charAt(0).toUpperCase() : "?";

                    return (
                        <div key={post._id || idx} className="bg-white rounded-xl shadow-md border">
                            <div className="p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <ProfileAvatar
                                        src={data.profile_pic}
                                        alt="Profile"
                                        initial={userInitial}
                                    />
                                    <div>
                                        <p className="font-bold capitalize">
                                            {data.firstname} {data.surname}
                                        </p>
                                        <span className="text-xs text-gray-500">Just now</span>
                                    </div>
                                    <button
                                        onClick={() => delpost(post)}
                                        className="ml-auto text-gray-500 p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <FaEllipsisH />
                                    </button>
                                </div>
                                <p className="mb-2 whitespace-pre-line">{post.content}</p>
                            </div>
                            {post.post_img && (
                                <img
                                    src={post.post_img}
                                    alt="Post content"
                                    className="w-full object-cover max-h-96"
                                />
                            )}
                            <div className="flex justify-around border-t py-2 text-gray-500 text-sm">
                                <button
                                    onClick={() => likes(post)}
                                    className={`flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg w-1/3 justify-center transition-colors ${
                                        isLiked ? "text-red-500" : ""
                                    }`}
                                >
                                    {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                                    {post.like.length || 0}
                                </button>
                                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg w-1/3 justify-center">
                                    <FaRegSmile /> {post.comment || 0}
                                </button>
                                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg w-1/3 justify-center">
                                    <FaArrowDown className="rotate-90" /> {post.share || 0}
                                </button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500 border">
                    No posts yet. Start sharing!
                </div>
            )}
        </div>
    );
};

const ProfileHeader = ({ data, navigate, bannerRef, profileRef, handleImage, isUpdating }) => (
    <div className="bg-white shadow-md">
        {isUpdating && (
            <div className="p-2 bg-blue-500 text-white text-center font-semibold">
                Updating Profile...
            </div>
        )}
        <div className="max-w-6xl mx-auto">
            <div className="relative h-60 md:h-96">
                <img
                    src={data.banner_pic}
                    alt="Banner"
                    className="w-full h-full object-cover rounded-b-lg"
                />
                <input
                    type="file"
                    ref={bannerRef}
                    onChange={(e) => handleImage(e, "banner")}
                    className="hidden"
                    accept="image/*"
                />
                <button
                    onClick={() => bannerRef.current.click()}
                    className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow text-sm font-medium flex items-center gap-2"
                >
                    <FaCamera /> Edit Cover
                </button>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-end px-4 -mt-16 md:-mt-24 pb-4 border-b">
                <div className="relative">
                    {data.profile_pic && data.profile_pic.length > 10 ? (
                        <img
                            src={data.profile_pic}
                            alt="Profile"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
                        />
                    ) : (
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-gray-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg uppercase">
                            {data.firstname?.charAt(0) || "?"}
                        </div>
                    )}
                    <input
                        type="file"
                        ref={profileRef}
                        onChange={(e) => handleImage(e, "profile")}
                        className="hidden"
                        accept="image/*"
                    />
                    <button
                        onClick={() => profileRef.current.click()}
                        className="absolute bottom-2 right-2 bg-white p-1 md:p-2 rounded-full border shadow"
                    >
                        <FaCamera className="text-lg" />
                    </button>
                </div>
                <div className="flex-grow md:ml-4 text-center md:text-left pt-4">
                    <h1 className="text-3xl font-extrabold capitalize text-gray-900">
                        {data.firstname} {data.surname}
                    </h1>
                    <p className="text-lg text-gray-500">
                        {data.friends.toLocaleString()} friends
                    </p>
                </div>
                <div className="flex space-x-2 pt-4 md:pt-0">
                    <button
                        onClick={() => navigate("/update_profile")}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
                    >
                        <FaPencilAlt /> Edit profile
                    </button>
                </div>
            </div>
            <nav className="flex items-center justify-between px-4">
                <div className="flex space-x-4 overflow-x-auto py-1">
                    {["post", "About", "Friends", "Photos"].map((item) => (
                        <button
                            key={item}
                            className={`py-3 px-4 rounded-lg text-sm font-semibold whitespace-nowrap ${
                                item === "post"
                                    ? "text-blue-600 border-b-4 border-blue-600"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                    <button className="py-3 px-4 text-sm font-semibold text-gray-600 hover:bg-gray-100 flex items-center gap-1">
                        More <FaArrowDown className="text-xs" />
                    </button>
                </div>
                <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 hidden md:block">
                    <FaEllipsisH />
                </button>
            </nav>
        </div>
    </div>
);

const IntroSection = ({ data, isEdit, setIsEdit, handleChange, handleSubmit, firstInputRef }) => {
    useEffect(() => {
        if (isEdit && firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [isEdit]);

    const InfoItem = ({ Icon, keyName, label }) => (
        <li className="flex items-center gap-3">
            <Icon className="text-gray-500" /> {label}:{" "}
            <strong className="text-gray-800">{data[keyName] || "Not specified"}</strong>
        </li>
    );

    return (
        <div className="bg-white p-5 rounded-xl shadow-md border">
            <h2 className="font-bold text-xl mb-4 text-gray-800">Intro</h2>
            {isEdit ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="bio"
                        value={data.bio}
                        onChange={handleChange}
                        rows="2"
                        placeholder="Write a short bio..."
                        className="w-full mb-3 p-2 border rounded resize-none"
                    />
                    {["Study", "Live", "From", "Relationship"].map((field, i) => (
                        <input
                            key={field}
                            name={field}
                            value={data[field] || ""}
                            onChange={handleChange}
                            placeholder={`Add ${field}`}
                            className="w-full my-1 p-2 border-b outline-none"
                            ref={i === 0 ? firstInputRef : null}
                        />
                    ))}
                    <div className="mt-4 space-x-2 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setIsEdit(false)}
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <p className="italic text-gray-600 my-2 text-center">
                        "{data.bio || "Add a bio to tell people about yourself."}"
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2 mt-4">
                        <InfoItem Icon={FaGraduationCap} keyName="Study" label="Studied" />
                        <InfoItem Icon={FaHome} keyName="Live" label="Lives in" />
                        <InfoItem Icon={FaMapMarkerAlt} keyName="From" label="From" />
                        <InfoItem Icon={FaHeart} keyName="Relationship" label="Status" />
                    </ul>
                    <button
                        onClick={() => setIsEdit(true)}
                        className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg w-full"
                    >
                        <FaPencilAlt className="inline mr-2 text-sm" /> Edit Details
                    </button>
                </>
            )}
        </div>
    );
};

const ProfilePage = () => {
    const {
        User_detail,
        Adv_update,
        post,
        post_get,
        post_detail,
        update,
        isprofileupdating,
        deletePost,
    } = Store();
    const navigate = useNavigate();

    const initialData = {
        id: User_detail?._id,
        firstname: User_detail?.firstname || "John",
        surname: User_detail?.surname || "Doe",
        bio: User_detail?.bio || "",
        Study: User_detail?.Study || "",
        Live: User_detail?.Live || "",
        From: User_detail?.From || "",
        Relationship: User_detail?.Relationship || "",
        friends: User_detail?.friends || 123,
        profile_pic: User_detail?.profile_pic?.length > 10 ? User_detail.profile_pic : null,
        banner_pic: User_detail?.banner_pic || "https://placehold.co/1000x300/303030/FFFFFF?text=B",
    };

    const [data, setData] = useState(initialData);
    const [newPost, setNewPost] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const fileInput = useRef(null);
    const bannerRef = useRef(null);
    const profileRef = useRef(null);
    const firstInputRef = useRef(null);

    useEffect(() => {
        post_get();
    }, [post_get]);

    useEffect(() => {
        if (User_detail) {
            setData((prev) => ({
                ...prev,
                ...User_detail,
                friends: User_detail.friends || 123,
            }));
        }
    }, [User_detail]);

    const handleImage = useCallback(
        async (e, type) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                if (type === "post") {
                    setPostImage(result);
                } else {
                    const field = type === "banner" ? "banner_pic" : "profile_pic";
                    setData((prev) => ({ ...prev, [field]: result }));
                    Adv_update({ ...data, [field]: result });
                }
            };
            reader.readAsDataURL(file);
            e.target.value = null;
        },
        [data, Adv_update]
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Adv_update(data);
        setIsEdit(false);
    };

    const createPost = useCallback(async () => {
        if (!newPost.trim() && !postImage) return;
        const newP = {
            id: data.id,
            content: newPost,
            post_img: postImage,
            like: [],
            name:data.firstname + " " + data.surname,
            profile_pic:data.profile_pic,
            comment: 0,
            share: 0,
        };
        await post(newP);
        setNewPost("");
        setPostImage(null);
    }, [newPost, postImage, data.id, post]);

    const delpost = useCallback(
        async (postData) => {
            if (!window.confirm("Are you sure you want to delete this post?")) return;
            await deletePost(postData);
        },
        [deletePost]
    );

    const handleLike = useCallback(
        async (postData) => {
            await update(postData);
        },
        [update]
    );

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Nav />
            <ProfileHeader
                data={data}
                navigate={navigate}
                bannerRef={bannerRef}
                profileRef={profileRef}
                handleImage={handleImage}
                isUpdating={isprofileupdating}
            />
            <main className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/5 flex flex-col gap-6">
                    <IntroSection
                        data={data}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        firstInputRef={firstInputRef}
                    />
                </div>
                <div className="lg:w-3/5 flex flex-col gap-6">
                    <PostCreator
                        data={data}
                        newPost={newPost}
                        setNewPost={setNewPost}
                        postImage={postImage}
                        setPostImage={setPostImage}
                        fileInput={fileInput}
                        handleImage={handleImage}
                        createPost={createPost}
                    />
                    <PostFeed
                        data={data}
                        delpost={delpost}
                        user_post={post_detail}
                        likes={handleLike}
                        currentUserId={User_detail?._id}
                    />
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
