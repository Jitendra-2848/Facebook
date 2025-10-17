import React, { useState } from 'react'
import { Store } from './store/check'

const Register = () => {
    const [data, setdata] = useState({ first: "", last: "", mob_email: "", pass: "", Dob: "", gen: "" })
    const {reg} = Store()
    function handlechange(e) {
        setdata({
            ...data, [e.target.name]: e.target.value,
        })
    }
    function handlesubmit(e) {
        e.preventDefault()
        // console.log(data);
        reg(data);
    }
    return (
        // <div className='font-sans w-full h-screen flex flex-col justify-center'>
        //     <p className='text-[#0866ff] text-5xl font-bold my-7 mx-auto'>facebook</p>
        //     <div className='w-full mx-auto'>
        //         <form className='w-full max-w-sm shadow-md shadow-black px-3 mx-auto rounded'>
        //             <span className='text-center text-blue-700'>
        //                 <h1 className='text-3xl'>create a new account</h1>
        //                 <p>It's quick an easy.</p>
        //             </span>
        //             <span className='border-b-2 border-gray-500 min-w-full w-full'></span>
        //             <span className='flex my-8'>
        //                 <input
        //                     type="text"
        //                     name="username"
        //                     id="username"
        //                     placeholder='First name'
        //                     className='border border-gray-300 w-full rounded-lg px-2 py-1 focus:outline-none focus:border-[#0866ff] '
        //                 />
        //                 <input
        //                     type="text"
        //                     name="username"
        //                     id="username"
        //                     placeholder='Surname'
        //                     className='border border-gray-300 w-full rounded-lg px-2 py-1 focus:outline-none focus:border-[#0866ff] '
        //                 />
        //                 {/* <input type="text" placeholder="Surname" name="" id="" /> */}
        //             </span>
        //             <label htmlFor="Dob" className=''>Date of birth</label>
        //             <br />
        //             <input type="date" name="" id="" />
        //             <label htmlFor="gen">Gender</label>
        //             {/* <input type="radio"  id="" /> */}
        //             Female <input type="radio" name="gender" id="" />
        //             Male <input type="radio" name="gender" id="" />
        //             Custom <input type="radio" name="gender" id="" />
        //             <input type="text" name="" id="" />
        //             <input type="password" name="" id="" />
        //             <div className='text-xs'>
        //                 <p>People who use our service may have uploaded your contact information to Facebook.</p>
        //                 <br />
        //                 <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
        //             </div>

        //             <button
        //                 type="Submit"
        //                 className='mt-6 bg-[#0866ff] text-white font-semibold text-xl w-full rounded-lg py-2 hover:bg-blue-700 transition duration-150'
        //             >
        //                 Sign up
        //             </button>
        //             <p className='text-[#0866ff] hover:underline'>Already have an account?</p>
        //         </form>
        //     </div>
        // </div>
        <div class=' select-none flex justify-center items-center min-h-screen bg-gray-100 p-4'>
            <div className='flex flex-col w-full max-w-lg font-sans justify-center items-center'>

                <h1 className='text-6xl text-[#0866ff] font-bold my-5'>facebook</h1>

                <div>
                    <form onSubmit={(e) => { handlesubmit(e) }} className='bg-white shadow-xl rounded-lg w-full px-5 py-5 flex flex-col items-center'>

                        <h1 className='text-3xl font-bold text-gray-800'>Create a new account</h1>
                        <p class='text-gray-500 mb-3'>It's quick and easy.</p>

                        <hr className='border-b border-gray-300 my-3 w-full' />

                        <div class='flex w-full space-x-3 mb-3'>
                            <input
                                type="text"
                                name="first"
                                value={data.first}
                                onChange={(e) => { handlechange(e) }}
                                placeholder='First name'
                                className='border border-gray-300 w-1/2 rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-[#0866ff] focus:border-[#0866ff]'
                            />
                            <input
                                type="text"
                                name="last"
                                onChange={(e) => { handlechange(e) }}
                                value={data.last}
                                placeholder='Surname'
                                className='border border-gray-300 w-1/2 rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-[#0866ff] focus:border-[#0866ff]'
                            />
                        </div>

                        <input
                            type={"tel"||"email"}
                            name="mob_email"
                            value={data.mob_email}
                            onChange={(e) => { handlechange(e) }}
                            placeholder='Mobile number or email address'
                            className='border border-gray-300 w-full rounded-md px-3 py-3 mb-3 focus:outline-none focus:ring-1 focus:ring-[#0866ff] focus:border-[#0866ff]'
                        />

                        <input
                            type="password"
                            name="pass"
                            value={data.pass}
                            onChange={(e) => { handlechange(e) }}
                            placeholder='New password'
                            className='border border-gray-300 w-full rounded-md px-3 py-3 mb-5 focus:outline-none focus:ring-1 focus:ring-[#0866ff] focus:border-[#0866ff]'
                        />

                        <div class='w-full'>
                            <p class='text-xs text-gray-600 mb-1'
                            >Date of birth</p>

                            <div
                                className='border border-gray-300 w-full hover:cursor-pointer rounded-md px-3 py-3 focus-within:ring-1 focus-within:ring-[#0866ff] focus-within:border-[#0866ff] cursor-pointer'
                            // onclick={document.getElementById('dob').click()}
                            >
                                <label class='block w-full cursor-pointer' for="dob">
                                    <input
                                        type="date"
                                        className='w-full bg-transparent hover:cursor-pointer focus:outline-none text-gray-700'
                                        name="Dob"
                                        onChange={(e) => { handlechange(e) }}
                                        value={data.Dob}
                                        id="dob"
                                    />
                                </label>
                            </div>
                        </div>

                        <div class='w-full mb-4 text-left'>
                            <p class='text-xs text-gray-600 mb-1'>Gender</p>
                            <div class='flex space-x-3 justify-between'>
                                <label class='flex items-center border border-gray-300 rounded-md p-2 w-1/3 justify-between cursor-pointer'>
                                    Female
                                    <input type="radio" name="gen" value="female" onChange={(e) => { handlechange(e) }} class='form-radio text-blue-500' />
                                </label>
                                <label class='flex items-center border border-gray-300 rounded-md p-2 w-1/3 justify-between cursor-pointer'>
                                    Male
                                    <input type="radio" name="gen" value="male" onChange={(e) => { handlechange(e) }} class='form-radio text-blue-500' />
                                </label>
                                <label class='flex items-center border border-gray-300 rounded-md p-2 w-1/3 justify-between cursor-pointer'>
                                    Custom
                                    <input type="radio" name="gen" value="custom" onChange={(e) => { handlechange(e) }} class='form-radio text-blue-500' />
                                </label>
                            </div>
                        </div>

                        <p class='text-xs text-gray-600 mb-4'>
                            By clicking Sign Up, you agree to our <a href="#" class="text-blue-600 hover:underline">Terms</a>, <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" class="text-blue-600 hover:underline">Cookies Policy</a>.
                        </p>

                        <button
                            type="submit"
                            className='bg-[#00a400] text-white font-bold text-lg px-10 py-2 rounded-lg hover:bg-[#009400] transition duration-150'
                        >
                            Sign Up
                        </button>

                    </form>

                    <p class="text-center mt-4 text-sm">
                        <a href="#" class="text-blue-600 hover:underline">Already have an account?</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
