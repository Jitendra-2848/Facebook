import React, { useState } from 'react'
import {Store} from "./store/check"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setdata] = useState({ user: "", pass: "" });
    const {log} = Store()
    
    function handlechange(e) {
        setdata({
            ...data, [e.target.name]: e.target.value
        })
    }
    
    const Navigate = useNavigate();
    
    function handlesubmit(e){
        e.preventDefault();
        log(data);
    }
    
    return (
        <div className='bg-[#f2f4f7] font-sans min-h-screen'>
            <div className='flex flex-col lg:flex-row justify-center items-center min-h-screen w-full lg:w-[70%] mx-auto px-4 lg:px-0 lg:space-x-16 py-8 lg:py-0'>
                <div className="lg:text-start w-full lg:w-1/2 mb-8 lg:mb-0 text-center space-y-2 px-4 lg:px-0">
                    <h1 className='text-[#0866ff] text-4xl sm:text-5xl lg:text-6xl font-semibold font-[arial]'>
                        facebook
                    </h1>
                    <p className='text-xl sm:text-2xl lg:text-3xl max-w-xl'>
                        Facebook helps you connect and share with the people in your life.
                    </p>
                </div>
                <div className='flex justify-center items-center w-full lg:w-auto'>
                    <form onSubmit={(e)=>{handlesubmit(e)}} className='shadow-xl w-full sm:w-96 p-4 sm:p-6 flex flex-col rounded-xl bg-white'>
                        <div className='space-y-3 sm:space-y-4'>
                            <input
                                type="text"
                                name="user"
                                value={data.user}
                                onChange={(e)=>{handlechange(e)}}
                                id="username"
                                placeholder='Email address or Phone number'
                                className='border border-gray-300 w-full rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-[#0866ff] text-sm sm:text-base'
                            />
                            <input
                                type="password"
                                name="pass"
                                onChange={(e)=>{handlechange(e)}}
                                value={data.pass}
                                id="password"
                                placeholder='Password'
                                className='border border-gray-300 w-full rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-[#0866ff] text-sm sm:text-base'
                            />
                        </div>
                        <button
                            type="submit"
                            className='mt-4 sm:mt-6 bg-[#0866ff] text-white font-semibold text-lg sm:text-xl w-full rounded-lg py-2 sm:py-3 hover:bg-blue-700 transition duration-150'
                        >
                            Log in
                        </button>
                        <input
                            type="button"
                            value="Forgotten password?"
                            className='hover:underline text-sm hover:cursor-pointer text-[#0866ff] font-semibold my-3 sm:my-4'
                        />
                        <hr />
                        <input
                            onClick={()=>{Navigate("/reg")}}
                            type="button"
                            value="Create new account"
                            className='bg-[#42b82a] px-4 sm:px-5 mx-auto mt-4 sm:mt-5 py-3 sm:py-4 rounded-xl text-base sm:text-lg text-white font-semibold hover:cursor-pointer hover:bg-[#36a420] transition duration-150'
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login