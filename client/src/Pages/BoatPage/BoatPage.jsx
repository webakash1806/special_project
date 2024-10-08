import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoatList } from '../../Redux/Slices/ServiceSlice';
import { FaArrowLeft, FaCar, FaRegUserCircle } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import SocialCard from '../../Components/SocialCard';

const BoatPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const serviceList = useSelector((state) => state?.service?.boatData) || [];
    console.log(serviceList)
    const [loading, setLoading] = useState(true);
    const availableList = serviceList.filter((data) => data?.servicesData?.availability === "AVAILABLE")

    const loadData = async () => {
        await dispatch(getBoatList());
        setLoading(false);
    };
    useEffect(() => {
        if (serviceList?.length === 0) {

            loadData();
        } else {
            setLoading(false)
        }
    }, [dispatch, serviceList]);

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Boat list' },
    ];


    return (
        <>
            <div className='relative'>
                <SocialCard item={breadcrumbItems} icon={"boat"} title={"Book Boat"} des={"Set sail on your next adventure by booking a boat for a relaxing getaway. Whether you're interested in a private yacht or a scenic river cruise, find the perfect boat for your needs."} />


            </div>
            <div className='from-[#e7eafd] bg-gradient-to-b via-[#f7f7fb] to-white p-4 py-10 flex flex-col items-center gap-8 justify-center'>

                {loading ? (
                    <div className='flex flex-wrap items-center justify-center gap-4 mt-6'>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className='bg-white text-black  max-w-[20rem] w-[90vw] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
                                <Skeleton height={150} />
                                <div className='p-3'>
                                    <Skeleton height={25} width={160} />
                                    <div className='flex items-center justify-between my-2'>
                                        <Skeleton height={22} width={100} />
                                        <Skeleton height={22} width={60} />
                                    </div>
                                    <div className='flex items-center justify-between my-2'>
                                        <Skeleton height={22} width={100} />
                                        <Skeleton height={22} width={60} />
                                    </div>
                                    <div className='flex items-center justify-between my-2'>
                                        <Skeleton height={22} width={100} />
                                        <Skeleton height={22} width={60} />
                                    </div>
                                    <div className='flex items-center justify-between my-2'>
                                        <Skeleton height={22} width={100} />
                                        <Skeleton height={22} width={100} />
                                    </div>
                                    <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                                        <Skeleton height={25} width={80} />
                                        <Skeleton height={35} width={120} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col w-full gap-20 p-4'>
                        <div className='flex flex-wrap items-center justify-center w-full gap-8'>

                            {
                                availableList.map((data, key) => (
                                    <div key={key + 1} className='bg-white text-black max-w-[20rem] w-[90vw] hover:from-[#d0f7e6] transition-all duration-300 hover:bg-gradient-to-b hover:to-[#f7fffb] rounded-xl shadow-[0px_0px_5px_#808080] overflow-hidden'>
                                        <img src={data?.proofFiles[3]?.fileUrl} alt="" className='h-[12rem] w-full object-cover' />
                                        <div className='p-3'>
                                            <div className='flex items-center justify-between my-2'>
                                                <h2 className='text-[1.1rem] font-semibold'>{data?.boatType}</h2>
                                                <h2 className='flex items-center gap-1'><MdOutlineAirlineSeatReclineExtra />{data?.servicesData?.seatingCap}/{data?.servicesData?.allotedSeat}</h2>
                                            </div>
                                            <div className='flex items-center justify-between my-2'>
                                                <h1 className='flex items-center justify-center gap-2'><FaRegUserCircle />{data?.fullName}</h1>
                                                <h2>{data?.age} years</h2>
                                            </div>
                                            <div className='flex items-center justify-between my-2'>
                                                <h1 className='flex items-center justify-center gap-2'><FaCar />Experience</h1>
                                                <h2>{data?.experience} years</h2>
                                            </div>
                                            <div className='flex items-center justify-between my-2'>
                                                <h1 className='flex items-center justify-center gap-2'><FaLocationDot />{data?.servicesData?.serviceArea}</h1>
                                            </div>
                                            <div className='flex items-center justify-between pt-3 mt-3 border-t'>
                                                <div>
                                                    {data?.servicesData?.allotedSeat === data?.servicesData?.seatingCap &&
                                                        <h3>
                                                            <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{data?.servicesData?.fullBoatFare}</span> / boat
                                                        </h3>}
                                                    <h3>
                                                        <span className='text-[1.02rem] font-semibold text-[#19B56F]'>Rs.{data?.servicesData?.seatFare}</span> / seat
                                                    </h3>
                                                </div>
                                                <button onClick={() => navigate(`/boat-book/${data?._id}`)} className='border p-2 px-4 rounded-full border-[#19B56F] hover:bg-[#19B56F] transition-all duration-500 hover:text-white text-[#19B56F] font-semibold'>BOOK NOW</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                )}
            </div>
        </>
    );
};

export default BoatPage;
