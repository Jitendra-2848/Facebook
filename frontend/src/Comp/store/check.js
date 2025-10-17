import { create } from "zustand"
import { api } from "../lib/axios"
import toast from "react-hot-toast"

export const Store = create((set, get) => ({
    ischeckingAuth: null,
    Authuser: null,
    User_detail: null,
    isprofileupdating: null,
    img: null,
    post_detail: [],
    all_posts: [], // For showing all posts in feed
    
    checkAuth: async () => {
        try {
            set({ ischeckingAuth: true })
            const check = await api.get("/check")
            set({ Authuser: true });
            set({ User_detail: check.data })
        } catch (error) {
            console.log(error);
            set({ Authuser: null });
        }
        finally {
            set({ ischeckingAuth: null })
        }
    },

    reg: async (data) => {
        try {
            const op = await api.post("/reg", data);
            toast.success(op.data.message || "Registration successful!");
            set({ Authuser: true });
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed!");
            console.log(error.response.data)
        }
    },

    log: async (data) => {
        try {
            set({ ischeckingAuth: true })
            const result = await api.post("/log", data);
            toast.success(result.data.message || "Login successful!");
            set({ Authuser: true });
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
            console.log(error.response.data)
        }
        finally {
            set({ ischeckingAuth: null })
        }
    },

    update_profile: async (data) => {
        try {
            const result = await api.put("/profile", data)
            toast.success(result.data.message || "Profile updated!");
        } catch (error) {
            toast.error("Profile update failed!");
            console.log(error)
        }
    },

    logout: async () => {
        try {
            const result = await api.get("/logout");
            toast.success(result.data.message || "Logged out successfully!");
            set({ Authuser: null, User_detail: null });
        } catch (error) {
            toast.error("Logout failed!");
            console.log(error)
        }
    },

    Adv_update: async (data) => {
        try {
            set({ isprofileupdating: true })
            const result = await api.put("/Adv_update", data)
            toast.success(result.data.message || "Profile updated!");
            if (result.data.updatedUser) {
                set({ User_detail: result.data.updatedUser })
            }
        } catch (error) {
            toast.error("Update failed!");
            console.log(error.message);
        } finally {
            set({ isprofileupdating: false })
        }
    },

    post: async (img) => {
        try {
            console.log(img);
            const result = await api.post("/post", img)
            toast.success(result.data.message || "Post created!");
            get().post_get();
            get().get_all_posts();
        } catch (error) {
            toast.error("Failed to create post!");
            console.log(error);
        }
    },

    deletePost: async (del) => {
        try {
            const result = await api.delete(`/post_del/${del.rand}`)
            toast.success(result.data.message || "Post deleted!");
            get().post_get();
            get().get_all_posts();
        } catch (error) {
            toast.error("Failed to delete post!");
            console.log(error)
        }
    },

    post_get: async () => {
        try {
            const userId = get().User_detail?._id;
            const result = await api.get("/post_get")
            // Filter only current user's posts
            const userPosts = result.data.data.filter(post => post.id === userId);
            set({ post_detail: userPosts })
        } catch (error) {
            console.log(error.message);
            set({ post_detail: [] })
        }
    },

    get_all_posts: async () => {
        try {
            const userId = get().User_detail?._id;
            const result = await api.get("/post_get")
            // Filter out current user's posts
            const otherPosts = result.data.data.filter(post => post.id !== userId);
            set({ all_posts: otherPosts })
        } catch (error) {
            console.log(error.message);
            set({ all_posts: [] })
        }
    },

    update: async (post) => {
        try {
            const userId = get().User_detail._id;
            const result = await api.put(`/update_post/${userId}`, { postId: post });
            
            toast.success(result.data.message);
            
            // Update in both user posts and all posts
            const updatedUserPosts = get().post_detail.map(p => 
                p._id === post._id ? result.data.post : p
            );
            const updatedAllPosts = get().all_posts.map(p => 
                p._id === post._id ? result.data.post : p
            );
            
            set({ 
                post_detail: updatedUserPosts,
                all_posts: updatedAllPosts 
            });
            
            return result.data;
        } catch (error) {
            toast.error("Failed to update like!");
            console.log(error);
        }
    }
}))
