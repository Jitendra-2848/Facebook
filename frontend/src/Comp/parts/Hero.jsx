import React, { useEffect } from "react";
import {
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiMoreHorizontal,
} from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Store } from "../store/check";

const HeroSection = () => {
  const { User_detail, all_posts, get_all_posts, update } = Store();

  useEffect(() => {
    get_all_posts();
  }, []);
  const handleLike = async (post) => {
    await update(post);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full max-w-5xl py-6 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Feed</h2>

        {/* Post list */}
        <div className="space-y-4">
          {all_posts.length > 0 ? (
            all_posts.map((post, index) => {
              const isLiked = post.like?.includes(User_detail?._id);
              
              return (
                <div
                  key={post._id || index}
                  className="bg-white rounded-xl shadow p-4 space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={post.profile_pic || "https://placehold.co/150x150/505050/FFFFFF?text=U"}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold capitalize">
                        {post.name || "Unknown User"}
                      </p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                    <button className="ml-auto text-gray-500">
                      <FiMoreHorizontal />
                    </button>
                  </div>

                  <p className="text-gray-700 whitespace-pre-line">{post.content}</p>

                  { post.post_img && (
                    <img
                      src={post.post_img}
                      alt="Post"
                      className="w-full rounded-md max-h-96 object-cover"
                    />
                  )}

                  <div className="flex justify-around text-gray-500 border-t pt-2 text-sm">
                    <button 
                      onClick={() => handleLike(post)}
                      className={`flex items-center gap-1 transition-colors ${
                        isLiked ? 'text-red-500' : 'hover:text-red-600'
                      }`}
                    >
                      {isLiked ? <FaHeart /> : <FaRegHeart />}
                      <span>{post.like?.length || 0}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <FiMessageSquare /> Comment
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-600">
                      <FiShare2 /> Share
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
              No posts available. Start following people!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
