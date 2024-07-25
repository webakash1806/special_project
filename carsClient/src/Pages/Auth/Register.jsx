import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createAccount } from '../../Redux/Slices/AuthSlice'
const Register = () => {

    const [file, setFile] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        experience: "",
        carNumber: "",
        carName: "",
        proofFiles: ''
    })

    function handleUserInput(e) {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }

    const getFileExtension = (filename) => {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    }

    const handleFileChange = (e, index) => {
        const selectedFile = e.target.files[0];
        const filename = e.target.id;
        const ext = getFileExtension(selectedFile.name)
        let fileName = `${filename}.${ext}`
        setFile(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles[index] = new File([selectedFile], fileName, { type: selectedFile.type });
            return newFiles;
        });
    };

    // const fileUpload = (event) => {
    //     event.preventDefault()
    //     const uploadedImg = event.target.files[0]

    //     if (uploadedImg) {
    //         setInput({
    //             ...input,
    //             files: uploadedImg
    //         })
    //         const fileReader = new FileReader()
    //         fileReader.readAsDataURL(uploadedImg)
    //         fileReader.addEventListener('load', function () {
    //             setFile(this.result)
    //         })
    //     }
    // }

    const handleForm = async (e) => {
        e.preventDefault()

        const { fullName, email, password, confirmPassword, phoneNumber, carName, carNumber, age, experience } = input


        if (!fullName || !email || !password || !confirmPassword || !phoneNumber || !carName || !carNumber || !age || !experience) {
            return toast.error('All fields are required', 400)
        }

        const formData = new FormData()

        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        formData.append('phoneNumber', phoneNumber)
        formData.append('carName', carName)
        formData.append('carNumber', carNumber)
        formData.append('age', age)
        formData.append('experience', experience)

        file.forEach((data, index) => {
            formData.append(`proofFiles`, data);
            console.log(data)
        });

        const response = await dispatch(createAccount(formData))

        if (response?.payload?.success) {
            navigate(-1)
        }

    }

    const mainDiv = 'flex flex-col gap-[0.1px]'

    const labelStyle = "text-[0.83rem] tracking-wide text-[#CFCCE4] font-[400] ml-[0.5px]"
    const inputStyle = 'border border-[#685ED4] min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white'
    return (
        <div className='flex items-center justify-center  bg-[#f8f6fc]'>
            <form onSubmit={handleForm} className='sm:p-10 p-6  bg-[#2F3349] text-white rounded-md shadow-[0px_0px_20px_#3D4056] my-12 flex md:items-end md:flex-row flex-col w-fit md:gap-10'>
                <div className='flex flex-col gap-2'>
                    <div className='mb-4'>
                        <h2 className='text-[1.8rem] font-semibold tracking-wide '>Registration Form</h2>
                        <div className='flex items-center mt-2'>
                            <div className='bg-[#685ED4] w-12 h-[5px] rounded-full mr-1'> </div>
                            <div className='bg-[#685ED4] w-[12px] h-[5px] rounded-full mr-1'></div>
                            <div className='bg-[#FF4C51] w-[5px] h-[5px] rounded-full'></div>
                        </div>
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="fullName">Full Name</label>
                        <input className={inputStyle} name='fullName' value={input.fullName} onChange={handleUserInput} id='fullName' type="text" />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="email">Email</label>
                        <input className={inputStyle} type="email" name='email' value={input.email} onChange={handleUserInput} id='email' />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="phoneNumber">Phone Number</label>
                        <input className={inputStyle} type="number" name='phoneNumber' value={input.phoneNumber} onChange={handleUserInput} id='phoneNumber' />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="carName">Car Name</label>
                        <input className={inputStyle} type="text" name='carName' value={input.carName} onChange={handleUserInput} id='carName' />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="carNumber">Car Number</label>
                        <input className={inputStyle} type="text" name='carNumber' value={input.carNumber} onChange={handleUserInput} id='carNumber' />
                    </div>

                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="password">Password</label>
                        <input className={inputStyle} type="password" name='password' value={input.password} onChange={handleUserInput} id='password' />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="confirmPassword">Confirm Password</label>
                        <input className={inputStyle} type="password" name='confirmPassword' value={input.confirmPassword} onChange={handleUserInput} id='confirmPassword' />
                    </div>


                </div>

                <div className='flex flex-col gap-2 mt-2 md:mt-20'>
                    <div className='flex  min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>

                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="age">Age</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="number" name='age' value={input.age} onChange={handleUserInput} id='age' />
                        </div>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="experience">Experience</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="number" name='experience' value={input.experience} onChange={handleUserInput} id='experience' />
                        </div>

                    </div>
                    <div className='flex  min-w-[18rem] md:max-w-[20.5rem] max-w-[25.5rem] w-[87vw] sm:w-[24rem] justify-between'>

                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="aadhar">Aadhar Card</label>
                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file"
                                name="aadhar"
                                id="aadhar"
                                onChange={(e) => handleFileChange(e, 0)} />
                        </div>
                        <div className={`${mainDiv} w-[48%]`}>
                            <label className={labelStyle} htmlFor="pan">PAN CARD</label>

                            <input className='border border-[#685ED4] w-full rounded-[3px] h-full  px-2 p-[5.5px]  outline-none  text-[0.95rem] tracking-wide resize-none bg-[#3D4056] text-white' type="file"
                                name="pan"
                                id="pan"
                                onChange={(e) => handleFileChange(e, 1)} />
                        </div>

                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="photo">Your photo</label>
                        <input className={inputStyle} type="file"
                            name="photo"
                            id="photo"
                            onChange={(e) => handleFileChange(e, 2)} />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="vehicleImage">Image of Vehicle</label>
                        <input className={inputStyle} type="file" name="vehicleImage"
                            id="vehicleImage"
                            onChange={(e) => handleFileChange(e, 3)} />
                    </div>
                    <div className={mainDiv}>
                        <label className={labelStyle} htmlFor="PUC">PUC Certificate</label>
                        <input className={inputStyle} type="file" name="PUC"
                            id="PUC"
                            onChange={(e) => handleFileChange(e, 4)} />
                    </div>

                    <button className='bg-[#685ED4] hover:bg-[#FF4C51] text-white transition-all duration-700 w-full rounded-md p-[6.9px] font-semibold mt-[12px] mb-1'>Sign Up</button>

                    <div className='w-full text-center'>
                        <p>Already have an account? <Link to={"/login"} className='text-[#FF4C51] font-semibold underline '>Login</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register