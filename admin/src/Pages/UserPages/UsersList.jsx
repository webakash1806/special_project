import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HomeLayout from '../../Layouts/HomeLayouts';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList } from '../../Redux/Slices/ListSlice';
import { FaEye } from 'react-icons/fa';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const list = useSelector((state) => state?.list?.userList);
    const [statusUpdated, setStatusUpdated] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const loadData = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: itemsPerPage,
                searchQuery,
                statusFilter
            };
            const response = await dispatch(getUsersList(params)).unwrap();
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData(currentPage);
    }, [currentPage, itemsPerPage, searchQuery, statusFilter]);

    useEffect(() => {
        if (statusUpdated) {
            loadData(currentPage);
            setStatusUpdated(false);
        }
    }, [statusUpdated]);

    const handleSearch = useCallback(
        debounce((query, status) => {
            setSearchQuery(query);
            setStatusFilter(status);
            setCurrentPage(1);
        }, 10),
        []
    );

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <HomeLayout>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-4 p-3 mt-4 bg-white rounded shadow-[0px_0px_10px_#8080807e]'>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value, statusFilter)}
                    className="bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 lg:w-[20rem] w-full"
                />
                <div className='flex items-center justify-between w-full lg:w-fit lg:gap-2 xl:gap-10'>
                    <div>
                        <label htmlFor="" className='text-black text-[1.1rem] mr-2'>Show:</label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="bg-white shadow-[0px_0px_15px_#95959577_inset] outline-none text-black rounded p-2 sm:w-[6rem] w-[4rem]"
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='mt-2 overflow-x-scroll scrollbar  scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-gray-50 scrollbar-thumb-gray-200 scrollbar-thin md:w-custom shadow-[0px_0px_10px_#8080807e]'>
                <div className='flex flex-col items-center justify-center gap-[2.5px] min-w-[55.5rem]'>
                    <div className='flex items-center relative   justify-between w-full gap-3 bg-[#353a51] rounded-t text-white px-3 py-4 lg:px-6 font-semibold mb-[0.5px]'>
                        <p className='min-w-[3rem] text-center'>S.no</p>
                        <div className='min-w-[13rem] lg:min-w-[15rem] line-clamp-1'>
                            <p>Name</p>
                        </div>
                        <div className='min-w-[13rem] lg:min-w-[15rem] truncate line-clamp-1'>
                            <p>Email</p>
                        </div>
                        <p className='min-w-[7.5rem]  text-center'>Phone number</p>
                        <p className='min-w-[3.3rem] sticky px-2 right-0 bg-[#353a51]  text-center'>Action</p>
                    </div>
                    {loading ? (
                        Array.from({ length: itemsPerPage }).map((_, index) => (
                            <div key={index} className='flex items-center justify-between w-full gap-3 px-3 py-3 text-black bg-white'>
                                <p className='min-w-[3rem] text-center'><Skeleton /></p>
                                <div className='min-w-[13rem] lg:min-w-[15rem] line-clamp-1'>
                                    <p><Skeleton /></p>
                                </div>
                                <div className='min-w-[13rem] lg:min-w-[15rem] truncate line-clamp-1'>
                                    <p><Skeleton /></p>
                                </div>
                                <div className='flex items-center gap-2 min-w-[6.8rem]'>
                                    <Skeleton width={70} />
                                </div>
                                <div className='min-w-[3.3rem] flex items-center justify-center'>
                                    <Skeleton width={24} height={24} />
                                </div>
                            </div>
                        ))
                    ) : (
                        list?.map((data, index) => (
                            <div key={data?._id} className='relative flex items-center justify-between w-full gap-3 px-3 py-3 text-black bg-white'>
                                <p className='min-w-[3rem] text-center'>{(currentPage - 1) * itemsPerPage + index + 1}.</p>
                                <div className='min-w-[13rem] lg:min-w-[15rem] line-clamp-1'>
                                    <p>{data?.fullName}</p>
                                </div>
                                <div className='min-w-[13rem] lg:min-w-[15rem] truncate line-clamp-1'>
                                    <p>{data?.email}</p>
                                </div>
                                <div className='min-w-[7rem]  truncate line-clamp-1'>
                                    <p>{data?.phoneNumber}</p>
                                </div>
                                <div onClick={() => navigate(`/driver/${data?._id}`, { state: data?._id })} className='min-w-[3.3rem] sticky px-5 right-0 bg-[white] flex items-center justify-center'>
                                    <FaEye className='text-[1.45rem] cursor-pointer' />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between mt-2 bg-[#353a51] text-white rounded overflow-hidden shadow-[0px_6px_10px_#8080807e]">
                <button
                    className='flex items-center justify-center bg-[#7367F0] p-3'
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    <GrFormPrevious className='text-[1.4rem] mt-1' /> Previous
                </button>
                <span className='font-semibold '>Page {currentPage} of {totalPages}</span>
                <button
                    className='flex items-center justify-center bg-[#7367F0] p-3'
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}>
                    Next <GrFormNext className='text-[1.4rem] mt-1' />
                </button>
            </div>
        </HomeLayout>
    );
};

export default UsersList;
