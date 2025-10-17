import React, { useRef, useState } from 'react'
import { CiCamera } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
// import { api } from '../lib/axios';
import { Store } from './store/check';
import Nav from './parts/Nav';
// import img from "../assets/default.webp";
const Profilepage = () => {
  const { User_detail, update_profile,isprofileupdating  } = Store();
  // const Authstore = User_detail;
  // const {} = Store();
  const fileInputRef = useRef();
  const [data, setdata] = useState({
    id:User_detail._id,
    firstname:User_detail.firstname,
    surname:User_detail.surname,
    mobile_email:User_detail.mobile_email,
    profile_pic:User_detail.profile_pic,
  });
  // console.log(User_detail);
  const [pic_temp, setpic] = useState();
  function handlechange(e){
     setdata({
      ...data,[e.target.name]:e.target.value
     })
  } 
  function handlesubmit(e){
    e.preventDefault();
    console.log("hello")
    console.log(data)
    update_profile(data)
  }
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formdata = new FileReader();
      formdata.readAsDataURL(file);
      formdata.onload = () => {
        const Base64 = formdata.result
        setdata({...data,profile_pic:Base64})
        setpic(Base64);
        // console.log(formdata.result)
      }
      formdata.onerror = () => {
        console.log(formdata.error)
      }
  }
  };
  const profile_pic = 1
  return (
    <div className='w-full h-screen md:mb-0 mb-28'>
      <Nav />
      <div className='w-full bg-blue-700 bg-opacity-70 h-full overflow-hidden flex justify-center items-center'>
        <div className='bg-[#ffffff] text-[black] max-w-2xl shadow-2xl h-auto rounded-3xl p-5  space-y-8'>


          <div className='text-center h-full text-xs'>
            <p className='text-lg font-bold'>Profile</p>
            <p>Your profile information.</p>

            <div className='flex justify-center mt-5'>
              <div className='relative w-40'>
                <img
                  src={pic_temp || data.profile_pic || null}
                  className='object-cover border-4 w-full aspect-[1] rounded-full p-1'
                />
                <label
                  htmlFor="profile-upload"
                  // className=""
                  className={`
                    absolute bottom-1 right-1 bg-transparent p-1 rounded-full bg-gray-200 duration-300 hover:bg-gray-300 text-xl cursor-pointer shadow
                    ${isprofileupdating ? "animate-pulse pointer-events-none bg-gray-500" : ""}`}>
                  <CiCamera />
                </label>

                {/* Hidden File Input */}
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden opacity-0"
                  onChange={(e)=>{handleImageChange(e)}}
                />

              </div>
            </div>
            {
              isprofileupdating ? <p className='my-2'>Uploading....</p>
                :
            <p className='my-2'>Click the camera icon to change profile picture.</p>
                }
          </div>

          <div className='text-sm w-72 sm:w-80 lg:w-96   mt-3 text-start mx-auto'>
            <form onSubmit={()=>{handlesubmit(e)}}>
              <div className='flex items-center space-x-1 text-sm'>
                <span className=''><CiUser /> </span>
                <span className=''>First name</span>
              </div>
              <input type="text" onChange={(e)=>{handlechange(e)}} name="firstname" value={data.firstname} placeholder={`${User_detail.firstname}`} id="name" className='-tracking-tighter capitalize w-full outline-none  focus:ring-1 border-5 mb-2 mt-1 rounded focus:border-transparent border-gray-300 transition-all duration-200 px-3 py-2 bg-gray-800 text-sm text-white' />
              <div className='flex items-center space-x-1 text-sm'>
                <span className=''><CiUser /> </span>
                <span className=''>Last name</span>
              </div>
              <input type="text" onChange={(e)=>{handlechange(e)}}  name="surname" value={data.surname} placeholder={`${User_detail.surname}`} id="name" className='-tracking-tighter capitalize w-full outline-none  focus:ring-1 border-5 mb-2 mt-1 rounded focus:border-transparent border-gray-300 transition-all duration-200 px-3 py-2 bg-gray-800 text-sm text-white' />
              {/* <span><x /></span> */}
              <p>Mobile or Email</p>
              <input type="email" name="mobile_email" value={data.mobile_email} onChange={(e)=>{handlechange(e)}} placeholder='prajapatijitendra2848@gmail.com' id="email" className='w-full outline-none  focus:ring-1 border-5 mb-2 mt-1 rounded focus:border-transparent border-gray-300 transition-all duration-200 px-3 py-2 bg-gray-800 text-sm text-white' />
            </form>
          </div>

          <div className='px-1 text-xs text-start'>
            <p className='text-sm font-semibold '>Account information</p>
            <div className='flex justify-between m-1'>
              <p>Date-of-Birth   [YYYY-MM-DD]</p>
              <span>{User_detail.DOB}</span>
            </div>
            <p className='border-b-2 border-gray-500 w-full'></p>
            <div className='flex justify-between m-1'>
              <p>Account status</p>
              <span className='text-green-600 font-semibold'>Live</span>
            </div>
          </div>
          <div className='grid place-items-center'>
            <button type='submit' onClick={handlesubmit} className={` bg-blue-500 text-nowrap capitalize px-4 py-2  rounded-xl hover:bg-blue-800 hover:text-white duration-500 ${!true ? "animate-pulse" : "animate-none"} w-60`}>Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profilepage
