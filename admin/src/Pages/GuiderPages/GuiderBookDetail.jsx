import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import guiderIcon from "../../assets/guiderIcon.png"

import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import { getGuiderOrderDetail, getPriestOrderDetail } from '../../Redux/Slices/ListSlice';
import HomeLayout from '../../Layouts/HomeLayouts';

const GuiderBookDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const loadData = async () => {
        await dispatch(getGuiderOrderDetail(id));
    };

    const bookDetail = useSelector((state) => state?.list?.singleGuiderData);

    useEffect(() => {
        loadData();
    }, []);

    const {
        _id,
        guiderData,
        orderDate,
        orderTime,
        fullName,
        originalPrice,
        totalPrice,
        location,
        phoneNumber,
        alternateNumber,
        placeName,
        startOTP,
        dropOTP,
        status
    } = bookDetail;

    const rowStyle = 'flex items-center mb-2 text-sm justify-between ';

    return (
        <HomeLayout>

            <div className="flex items-center justify-center py-6 lg:py-16 bg-[#efefef]">
                <div
                    className={`flex flex-col md:max-w-[28rem] sm:w-[80vw] w-[95vw]  text-black lg:max-w-[45rem] p-1  overflow-hidden bg-white rounded-lg shadow-lg border-b-4 ${status === 'Completed' ? 'border-green-500' : status === 'Started' || status === 'Booked' ? 'border-orange-500' : status === 'Cancelled' ? 'border-red-500' : 'border-blue-500'}`}
                >
                    <div className="p-2 px-4 bg-gradient-to-r from-green-200 to-green-100">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                            <div className="flex items-center mb-4 lg:mb-0">
                                <img className='w-[4rem] mr-6 mx-2' src={guiderIcon} alt="" />

                                <div>
                                    <h2 className="text-2xl font-semibold">{guiderData?.fullName || 'Priest Name'}</h2>
                                    <h3 className="text-lg">{placeName}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col items-center w-full sm:w-fit lg:items-end">

                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col justify-between p-4 text-black lg:flex-row">

                        <div className="flex lg:w-[48%] flex-col">
                            <h3 className="mb-1 text-xl font-semibold">Pandit Ji Information</h3>
                            <p className={rowStyle}><span className="font-semibold">Name:</span> {guiderData?.fullName}</p>
                            <p className={rowStyle}><span className="font-semibold">Phone Number:</span> {guiderData?.phoneNumber}</p>
                            <p className={rowStyle}><span className="font-semibold">Email:</span> {guiderData?.email}</p>
                            <p className={rowStyle}><span className="font-semibold">Age:</span> {guiderData?.age} years</p>
                            <p className={rowStyle}><span className="font-semibold">Experience:</span> {guiderData?.experience} years</p>
                        </div>


                        <div className="flex lg:w-[45%] flex-col">
                            <h3 className="mb-1 text-xl font-semibold">Order Information</h3>
                            <div className="flex flex-col">
                                <p className={rowStyle}><span className="font-semibold">Location:</span> {location}</p>
                                <p className={rowStyle}><span className="font-semibold">Order Date:</span> {orderDate}</p>
                                <p className={rowStyle}><span className="font-semibold">Order Time:</span> {orderTime}</p>
                                <p className={rowStyle}><span className="font-semibold">Customer Name:</span> {fullName}</p>
                                <p className={rowStyle}><span className="">{phoneNumber}</span> {alternateNumber}</p>



                            </div>
                        </div>


                    </div>
                    <div className="p-2 px-4 bg-gradient-to-r from-green-200 to-green-100">
                        <div className='flex justify-between items center'>

                            <div className="py-1 ">
                                <h3 className="flex items-center text-[1.05rem] font-semibold">
                                    <div className={`ml-2 size-3 rounded-full ${status === 'Cancelled' ? 'bg-red-500' : status === 'Booked' ? 'bg-orange-500' : status === 'Picked up' ? 'bg-yellow-500' : status === 'Dropped' ? 'bg-green-500' : ''}`}></div>
                                    <span className="ml-2">{status}</span>
                                </h3>
                            </div>
                        </div>
                        <p className='flex items-center justify-between text-[1.15rem] bg-[#f6f6f6ec] p-1 px-3 rounded font-semibold '><span className="">Total Price:</span> <span><strike className="pr-2">{originalPrice}</strike> &#8377; {totalPrice}</span></p>
                    </div>

                </div>
            </div>
        </HomeLayout>
    );
};

export default GuiderBookDetails;