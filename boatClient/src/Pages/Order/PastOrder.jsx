import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrders, updateBoatDrop } from '../../Redux/Slices/OrderSlice';
import OtpInput from 'react-otp-input';
import { FaArrowRight, FaCar } from 'react-icons/fa6';
import { MdCall, MdFilterList } from 'react-icons/md';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { RxCross2 } from "react-icons/rx";

dayjs.extend(customParseFormat);

const SkeletonLoader = () => {
    return (
        <div className='flex flex-wrap justify-center gap-4'>
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className='flex cursor-pointer rounded-sm sm:justify-between sm:min-w-[38rem] sm:flex-row shadow-[0px_0px_5px_#808080] overflow-hidden flex-col items-start sm:w-[65vw] w-[90vw] md:w-[63vw] lg:w-[58vw] xl:w-[50rem] min-w-[19.7rem]'>
                    <div className='flex items-center gap-2 p-4 md:gap-3 lg:gap-4'>
                        <div className='w-[8.3rem] h-[6.4rem] lg:w-[9rem] bg-gray-300 animate-pulse'></div>
                        <div className='text-[0.9rem] font-semibold'>
                            <div className='h-4 mb-2 bg-gray-300 animate-pulse'></div>
                            <div className='h-4 mb-2 bg-gray-300 animate-pulse'></div>
                            <div className='h-4 mb-2 bg-gray-300 animate-pulse'></div>
                        </div>
                    </div>
                    <div className='w-full text-[0.95rem] sm:w-[17.5rem] md:w-[18.5rem] xl:w-[23rem] sm:pr-2'>
                        <div className='flex items-center justify-between w-full p-1 border-t'>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[10%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                        </div>
                        <div className='flex items-center justify-between w-full p-1 border-t'>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[20%]'></div>
                        </div>
                        <div className='flex items-center justify-between w-full p-1 border-t'>
                            <div className='h-4 bg-gray-300 animate-pulse w-[50%]'></div>
                            <div className='h-4 bg-gray-300 animate-pulse w-[40%]'></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const PastOrder = () => {
    const [otp, setOtp] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTime, setFilterTime] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const orderData = useSelector((state) => state?.order?.orderData) || [];

    const loadData = async () => {
        setLoading(true);
        await dispatch(getOrders(id));
        setLoading(false);
    };

    dayjs.extend(customParseFormat);

    const checkAndUpdateStatus = async () => {
        const now = dayjs(); // Current date and time
        console.log("Current Time:", now.format('hh:mm A'));

        for (const order of orderData) {
            // Parse arrivalTime using the correct format
            const arrivalTime = dayjs(order.arrivalTime, 'hh:mm A', true);

            // Check if arrivalTime is valid
            if (!arrivalTime.isValid()) {
                console.error("Invalid arrivalTime format:", order.arrivalTime);
                continue; // Skip this iteration if the time is invalid
            }

            // Combine arrivalTime with today's date
            const orderArrivalDateTime = dayjs().hour(arrivalTime.hour()).minute(arrivalTime.minute()).second(0);

            console.log("Order Arrival Time:", orderArrivalDateTime.format('hh:mm A'));
            console.log("Is Before Now:", orderArrivalDateTime.isBefore(now));

            // Compare with current time and update status if needed
            if (order.status === 'On the way' && orderArrivalDateTime.isBefore(now)) {
                const res = await dispatch(updateBoatDrop({ id: order._id, status: 'Late' }));
                if (res?.payload?.success) {
                    loadData();
                }
            }
        }
    };

    useEffect(() => {
        loadData();
        checkAndUpdateStatus()
        const intervalId = setInterval(checkAndUpdateStatus, 60000); // Check every minute
        return () => clearInterval(intervalId);
    }, []);

    const handleVerify = async (id) => {
        const res = await dispatch(updatePickup({ startOTP: otp, id: id }));
        if (res?.payload?.success) {
            loadData();
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleOtpChange = (otp) => {
        setOtp(otp);
    };

    const getTimeFilteredData = () => {
        const now = dayjs();
        let filteredData = orderData;

        switch (filterTime) {
            case 'Last Week':
                filteredData = orderData.filter(order => dayjs(order.orderDate, 'DD MMM,YYYY').isAfter(now.subtract(1, 'week')));
                break;
            case 'Last Month':
                filteredData = orderData.filter(order => dayjs(order.orderDate, 'DD MMM,YYYY').isAfter(now.subtract(1, 'month')));
                break;
            case 'Last 3 Months':
                filteredData = orderData.filter(order => dayjs(order.orderDate, 'DD MMM,YYYY').isAfter(now.subtract(3, 'month')));
                break;
            case 'Last 6 Months':
                filteredData = orderData.filter(order => dayjs(order.orderDate, 'DD MMM,YYYY').isAfter(now.subtract(6, 'month')));
                break;
            case 'Last Year':
                filteredData = orderData.filter(order => dayjs(order.orderDate, 'DD MMM,YYYY').isAfter(now.subtract(1, 'year')));
                break;
            default:
                filteredData = orderData;
        }

        if (filterStatus !== 'All') {
            filteredData = filteredData.filter(order => order.status === filterStatus);
        }

        return filteredData;
    };

    const groupedOrders = getTimeFilteredData().reduce((acc, order) => {
        const arrivalDateTime = dayjs(`${order.orderDate} ${order.arrivalTime}`, 'DD MMM,YYYY hh:mm A');
        const timeSlot = arrivalDateTime.format('hh:mm A');

        if (!acc[timeSlot]) {
            acc[timeSlot] = [];
        }

        acc[timeSlot].push(order);
        return acc;
    }, {});

    const renderGroupedOrders = () => {
        return Object.keys(groupedOrders).sort().reverse().map((timeSlot) => {
            const firstOrder = groupedOrders[timeSlot][0];
            const orderDate = firstOrder ? dayjs(firstOrder.orderDate, 'DD MMM,YYYY').format('DD MMM, YYYY') : '';

            return (
                <div key={timeSlot} className='flex flex-col gap-4 mb-6'>
                    <h2 className='mb-2 text-lg font-semibold'>
                        {orderDate} - {timeSlot}
                    </h2>
                    {groupedOrders[timeSlot].map((data) => (
                        <div
                            key={data?._id}
                            className='flex cursor-pointer rounded-sm sm:justify-between sm:min-w-[38rem] sm:flex-row shadow-[0px_0px_5px_#808080] overflow-hidden flex-col items-start sm:w-[65vw] w-[90vw] md:w-[63vw] lg:w-[58vw] xl:w-[50rem] min-w-[19.7rem]'
                            onClick={(e) => {
                                if (e.target.closest('.otp-container')) return;
                                navigate(`/book-detail/${data?._id}`);
                            }}
                        >
                            <div className='flex items-center gap-2 md:gap-3 lg:gap-4'>
                                <div>
                                    <img className='w-[8.3rem] h-[6.4rem] lg:w-[9rem] object-cover' src={data?.boatData?.proofFiles[3]?.fileUrl} alt="" />
                                </div>
                                <div className='text-[0.9rem] font-semibold'>
                                    <h3 className='flex items-center gap-3'><FaCar />{data?.fullName}</h3>
                                    <h3 className='flex items-center gap-3'><MdCall />{data?.phoneNumber}</h3>
                                    <h3 className='flex items-center gap-3 mt-3'>
                                        <div className='flex items-center gap-1 text-[0.95rem] font-normal'>

                                            <div className={`ml-[1.2px] flex items-center justify-center ${data?.status === "Cancelled" && 'bg-red-500 size-3'} ${data?.status === "On the way" && 'bg-orange-500 size-3'} ${data?.status === "Picked up" && 'bg-yellow-500'} ${data?.status === "Dropped" && 'bg-green-500 size-3'} rounded-full `}>
                                                {data?.status === "Late" && <RxCross2 className='text-red-500 text-[1.2rem] mt-[0.9px]' />}
                                            </div>{data?.status}
                                        </div>
                                    </h3>
                                </div>
                            </div>
                            <div className='w-full text-[0.95rem] sm:w-[17.5rem] md:w-[18.5rem] xl:w-[23rem] sm:pr-2'>
                                <div className='flex items-center justify-between w-full p-1 border-t'>
                                    <h3>{data?.area}</h3>

                                </div>
                                <div className='flex items-center justify-between w-full p-1 border-t'>
                                    <h3>{data?.orderDate}</h3>
                                    <h3>{data?.orderTime}</h3>
                                </div>
                                <div className='flex items-center justify-between w-full p-1 border-t'>
                                    <h3>Drop OTP - {data?.dropOTP}</h3>
                                    <h3>Share with user</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        });
    };

    return (
        <div className='relative flex flex-col min-h-[90vh] items-center py-4 text-black bg-white md:flex-row md:items-start'>
            <div className={`fixed top-0 left-0 w-[13rem] pt-20 h-full shadow-xl bg-white p-4 md:flex md:flex-col ${showFilters ? 'block' : 'hidden'} md:block`}>
                <div className='md:hidden'>
                    <button
                        className="flex items-center gap-2 px-2 py-1 mb-4 bg-white border border-gray-300 rounded"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <MdFilterList />
                        <span className="font-medium">Close Filters</span>
                    </button>
                </div>
                <div className='w-full md:flex md:flex-col'>
                    <h3 className='mb-2 font-medium'>Filter by Status</h3>
                    {['All', 'On the way', 'Late', 'Dropped', 'Cancelled'].map(status => (
                        <label key={status} className='flex items-center mb-2'>
                            <input
                                type='checkbox'
                                checked={filterStatus === status}
                                onChange={() => setFilterStatus(status)}
                                className='mr-2'
                            />
                            {status}
                        </label>
                    ))}
                </div>
                <div className='w-full md:flex md:flex-col'>
                    <h3 className='mb-2 font-medium'>Filter by Time</h3>
                    {['All', 'Last Week', 'Last Month', 'Last 3 Months', 'Last 6 Months', 'Last Year'].map(time => (
                        <label key={time} className='flex items-center mb-2'>
                            <input
                                type='checkbox'
                                checked={filterTime === time}
                                onChange={() => setFilterTime(time)}
                                className='mr-2'
                            />
                            {time}
                        </label>
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center w-full gap-6 px-4 md:w-3/4 md:ml-auto md:px-6'>
                <div className='flex justify-between w-full mb-4 md:hidden'>
                    <button
                        className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-300 rounded"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <MdFilterList />
                        <span className="font-medium">Filters</span>
                    </button>
                </div>
                {loading ? (
                    <SkeletonLoader />
                ) : groupedOrders && Object.keys(groupedOrders).length > 0 ? (
                    renderGroupedOrders()
                ) : (
                    <div>No orders found.</div>
                )}
            </div>
        </div>
    );
};

export default PastOrder;
