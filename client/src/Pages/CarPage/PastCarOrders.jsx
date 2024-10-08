import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrders, updateDrop } from '../../Redux/Slices/OrderSlice';
import { FaArrowRight, FaArrowRightArrowLeft, FaCar } from 'react-icons/fa6';
import { MdCall, MdFilterList } from 'react-icons/md';
import OtpInput from 'react-otp-input';
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SocialCard from '../../Components/SocialCard';
import { FaArrowLeft } from 'react-icons/fa';

const PastCarOrders = () => {
    const [otpValues, setOtpValues] = useState({});
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTime, setFilterTime] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const orderData = useSelector((state) => state?.order?.carsOrderData) || [];

    const loadOrder = async () => {
        setLoading(true);
        await dispatch(getOrders(id));
        setLoading(false);
    };

    const handleVerify = async (orderId) => {
        const res = await dispatch(updateDrop({ dropOTP: otpValues[orderId], id: orderId }));
        if (res?.payload?.success) {
            loadOrder();
        }
    };

    useEffect(() => {
        loadOrder();
    }, []);

    const handleOtpChange = (otp, orderId) => {
        setOtpValues(prevState => ({
            ...prevState,
            [orderId]: otp
        }));
    };

    const getTimeFilteredData = () => {
        const now = dayjs();
        let filteredData = orderData;

        switch (filterTime) {
            case 'Last Week':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'week')));
                break;
            case 'Last Month':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'month')));
                break;
            case 'Last 3 Months':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(3, 'month')));
                break;
            case 'Last 6 Months':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(6, 'month')));
                break;
            case 'Last Year':
                filteredData = orderData.filter(order => dayjs(order.orderDate).isAfter(now.subtract(1, 'year')));
                break;
            default:
                filteredData = orderData;
        }

        if (filterStatus !== 'All') {
            filteredData = filteredData.filter(order => order.status === filterStatus);
        }

        return filteredData;
    };

    const filteredOrderData = getTimeFilteredData().slice().reverse().sort((a, b) => {
        if (a.status === 'Dropped' && (b.status === 'Picked up' || b.status === 'On the way')) {
            return 1;
        }
        if ((a.status === 'Picked up' || a.status === 'On the way') && b.status === 'Dropped') {
            return -1;
        }
        return 0;
    });

    if (loading) {
        return (
            <div className='relative flex flex-col min-h-[90vh] items-center py-4 text-black bg-white md:flex-row md:items-start'>
                <div className={`fixed top-0 left-0 w-[13rem] lg:w-[14rem] md:w-[10rem] mt-14 h-full shadow-xl bg-white p-4 md:flex md:flex-col ${showFilters ? 'block' : 'hidden'} md:block`}>
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
                        <h3 className='mb-2 font-medium'><Skeleton width={150} /></h3>
                        <div className='flex flex-col'>
                            <Skeleton count={5} height={20} />
                        </div>
                    </div>
                    <div className='w-full md:flex md:flex-col'>
                        <h3 className='mb-2 font-medium'><Skeleton width={150} /></h3>
                        <div className='flex flex-col'>
                            <Skeleton count={6} height={20} />
                        </div>
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
                    <div className='w-full'>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className='flex gap-4 p-4 mb-4 bg-gray-100 rounded-md shadow-md'>
                                <Skeleton circle={true} height={80} width={80} />
                                <div className='flex flex-col flex-grow'>
                                    <Skeleton height={20} width='80%' />
                                    <Skeleton height={15} width='60%' className='mt-2' />
                                    <Skeleton height={15} width='40%' className='mt-2' />
                                    <Skeleton height={15} width='60%' className='mt-2' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Car Bookings' },
    ];
    return (

        <>
            <div className='relative right-0 flex items-end justify-end w-full '>
                <div className='w-full md:w-custom lg:w-custom'>
                    <SocialCard item={breadcrumbItems} icon={"car"} title={"Car Bookings"} des={"Here is the full list of past bookings of cars."} />


                </div>
            </div>
            <div className='from-[#e7eafd] bg-gradient-to-b via-[#f7f7fb] to-white p-4 py-10 flex flex-col items-center gap-8 justify-center text-black'>
                <div className={`fixed top-0 left-0 pt-20 w-[13rem] z-[10] lg:w-[11rem] md:w-[11rem]  h-full shadow-xl bg-white p-4 md:flex md:flex-col ${showFilters ? 'block' : 'hidden'} md:block`}>
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
                        {['All', 'On the way', 'Picked up', 'Dropped', 'Cancelled'].map(status => (
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
                <div className='flex flex-col items-center w-full gap-6 px-4 md:w-[82vw]  md:ml-auto md:px-6'>
                    <div className='flex justify-between w-full mb-4 md:hidden'>
                        <button
                            className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-300 rounded"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <MdFilterList />
                            <span className="font-medium">Filters</span>
                        </button>
                    </div>
                    {(!filteredOrderData || filteredOrderData.length === 0) ? (
                        <div>No orders till now</div>
                    ) : (
                        filteredOrderData.map((data) => (
                            <div key={data?._id}
                                className={`flex flex-col sm:flex-row justify-between w-full sm:max-w-[40rem] md:max-w-[45rem] overflow-hidden bg-white rounded-lg shadow-md border-r-4 ${data.status === 'Completed' ? 'border-green-500' : data.status === 'Picked up' || data.status === 'On the way' ? 'border-orange-500' : data.status === 'Cancelled' ? 'border-red-500' : 'border-blue-500'}`}
                                onClick={() => navigate(`/car-book-detail/${data?._id}`)}>
                                <div className='flex items-center gap-2 md:gap-3 lg:gap-4'>
                                    <div>
                                        <img className='w-[8.3rem] h-[6.4rem] lg:w-[9rem] object-cover' src={data?.driverData?.proofFiles[3]?.fileUrl} alt="" />
                                    </div>
                                    <div className='text-[0.9rem] font-semibold'>
                                        <h3 className='flex items-center gap-3'><FaCar />{data?.driverData?.fullName}</h3>
                                        <h3 className='flex items-center gap-3'><MdCall />{data?.driverData?.phoneNumber}</h3>
                                        <h3 className='flex items-center gap-3 mt-3'>
                                            <div className={`ml-[1.2px] ${data?.status === 'Cancelled' && 'bg-red-500'} ${data?.status === 'On the way' && 'bg-orange-500'} ${data?.status === 'Picked up' && 'bg-yellow-500'} ${data?.status === 'Dropped' && 'bg-green-500'} rounded-full size-3`}></div>{data?.status}
                                        </h3>
                                    </div>
                                </div>
                                <div className='w-full text-[0.95rem] sm:w-[17.5rem] md:w-[18.5rem] xl:w-[23rem] sm:pr-2'>
                                    <div className='flex items-center justify-between w-full p-1 border-t'>
                                        <h3>{data?.pickLocation}</h3>
                                        {data?.returnTrip ? <FaArrowRightArrowLeft /> : <FaArrowRight />}
                                        <h3>{data?.dropLocation}</h3>
                                    </div>
                                    <div className='flex items-center justify-between w-full p-1 border-t'>
                                        <h3>{data?.orderDate}</h3>
                                        <h3>{data?.orderTime}</h3>
                                    </div>
                                    {data?.status === 'On the way' && (
                                        <div className='flex items-center justify-between w-full p-1 border-t'>
                                            <h3>Pickup OTP - {data?.startOTP}</h3>
                                            <h3>Share with driver</h3>
                                        </div>
                                    )}
                                    {data?.status === 'Picked up' && (
                                        <div className='flex items-center justify-between w-full p-1 border-t' onClick={(e) => e.stopPropagation()}>
                                            <h3 className='flex items-center gap-2'>Drop OTP
                                                <OtpInput
                                                    value={otpValues[data?._id] || ''}
                                                    onChange={(otp) => handleOtpChange(otp, data?._id)}
                                                    numInputs={4}
                                                    renderSeparator={<span>-</span>}
                                                    renderInput={(props) => (
                                                        <input
                                                            {...props}
                                                            style={{
                                                                width: '1.9rem',
                                                                height: '1.9rem',
                                                                margin: '0 0.1rem',
                                                                fontSize: '1rem',
                                                                borderRadius: '4px',
                                                                border: '1px solid #ccc',
                                                                textAlign: 'center',
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </h3>
                                            <div className='size-[1.9rem] flex items-center rounded justify-center bg-green-500 cursor-pointer text-white' onClick={() => handleVerify(data?._id)}><FaArrowRight /></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default PastCarOrders;
