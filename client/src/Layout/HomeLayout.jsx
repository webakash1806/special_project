import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getGlobalSettingsData, logout } from '../Redux/Slices/AuthSlice';
import Footer from '../Components/Footer';
import { FaArrowUp } from 'react-icons/fa'; // Import the scroll-to-top icon
import { FaArrowUpRightDots } from 'react-icons/fa6';
import { MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import userImg from '../assets/Images/user.png'

const HomeLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
    const [isScrollTopVisible, setIsScrollTopVisible] = useState(false); // State to control button visibility

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const avatar = useSelector((state) => state?.auth?.data?.avatar);
    const fullName = useSelector((state) => state?.auth?.data?.fullName);
    const userId = useSelector((state) => state?.auth?.data?._id);

    const handleLogout = async () => {
        const response = await dispatch(logout());

        if (response?.payload?.success) {
            navigate('/');
        }
    };

    const handleOrderDropdownToggle = () => {
        setOrderDropdownOpen(!orderDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.order-dropdown')) {
            setOrderDropdownOpen(false);
        }
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsScrollTopVisible(true);
        } else {
            setIsScrollTopVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        window.addEventListener('scroll', handleScroll); // Add scroll event listener

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleScroll); // Clean up scroll event listener
        };
    }, []);

    const websiteData = useSelector((state) => state?.auth?.globalSettingsData)


    const loadData = () => {
        dispatch(getGlobalSettingsData())
    }

    useEffect(() => {
        loadData()
    }, [])


    return (
        <>
            <div className='font-semibold'>
                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="flex flex-col drawer-content ">
                        {/* Navbar */}
                        <div className="w-full sticky top-0 shadow-lg text-black bg-white navbar z-[1000]">
                            <div className="flex-none xl:hidden ">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                            </div>
                            <div onClick={() => navigate('/')} className="absolute pl-6 flex-1 cursor-pointer w-fit xl:left-[5rem] right-4 sm:right-6 xl:static ">

                                <img className='h-[1.6rem]' src={websiteData?.logo?.secure_url} alt="LOGO" />
                            </div>
                            <div className="flex-none hidden xl:block">
                                <ul className="menu menu-horizontal">
                                    {/* Navbar menu content here */}
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/places'>Popular places</Link></li>
                                    <li><Link to='/car'>Rent car</Link></li>
                                    <li><Link to='/boat'>Book boat</Link></li>
                                    <li><Link to='/place-list'>Book guider</Link></li>
                                    <li><Link to='/pooja-list'>Book priest</Link></li>
                                    <li><Link to='/hotels'>Book hotels</Link></li>
                                    <li><Link to='/about'>About</Link></li>
                                    <li><Link to='/contact'>Contact</Link></li>
                                    {isLoggedIn && (
                                        <li className="relative">
                                            <span className='flex items-center cursor-pointer order-dropdown' onClick={handleOrderDropdownToggle}>
                                                Order <svg className={`w-4 h-4 ml-2 transition-transform ${orderDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </span>
                                            {orderDropdownOpen && (
                                                <ul className="absolute z-10 flex-col w-[10rem] mt-1 bg-white border rounded shadow-lg top-full">
                                                    <li><Link to={`/order/car-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Car Book</Link></li>
                                                    <li><Link to={`/order/boat-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Boat Book</Link></li>
                                                    <li><Link to={`/order/priest-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Priest Book</Link></li>
                                                    <li><Link to={`/order/guider-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Guider Book</Link></li>
                                                    <li><Link to={`/order/hotel-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Hotel Book</Link></li>
                                                </ul>
                                            )}
                                        </li>
                                    )}
                                    <div className='ml-6'>
                                        {!isLoggedIn ?
                                            <div className='flex items-center justify-center gap-2 '>
                                                <Link to='/login'
                                                    className='btn from-[#1751fe] via-[#0074f9] hover:bg-gradient-to-bl bg-gradient-to-tr to-[#0199ff] transition-all duration-300 border-none text-white btn-sm rounded-sm px-6 font-normal text-[1.02rem] tracking-wide'
                                                >
                                                    Login
                                                </Link>
                                                <Link to='/register'
                                                    className='btn bg-[#FF8900] transition-all duration-700 hover:bg-[#0074f9] border-none text-white btn-sm rounded-sm px-6 font-normal text-[1.02rem] tracking-wide'>
                                                    Register
                                                </Link>
                                            </div>
                                            :
                                            <div className='flex items-center justify-center gap-4'>
                                                <Link to={`/profile/${fullName}`}>
                                                    <img src={(!avatar?.secure_url ? userImg : avatar?.secure_url)} alt={`${fullName} img`} className='size-[2.5rem] rounded-full object-cover shadow-[0px_0px_5px_#7479FF]' />
                                                </Link>
                                                <Link to='/logout' onClick={handleLogout}
                                                    className='btn bg-[#FF8900] transition-all duration-700 hover:bg-[#0074f9] border-none text-white btn-sm rounded-sm px-6 font-normal text-[1.02rem] tracking-wide'>
                                                    Logout
                                                </Link>
                                            </div>
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>
                        {/* Page content here */}
                        {children}
                    </div>
                    <div className="drawer-side z-[10000]">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="justify-between min-h-screen p-4 menu sm:w-[14rem] w-[14rem] bg-white text-black">
                            {/* Sidebar content here */}
                            <div>
                                <Link to={'/'} className="m-[0_auto] border-b mb-6 pb-2 flex items-center justify-around border-slate-500">
                                    <img className='h-[1.7rem]' src={websiteData?.logo?.secure_url} alt="LOGO" />
                                </Link>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/places'>Popular places</Link></li>
                                <li><Link to='/car'>Rent car</Link></li>
                                <li><Link to='/boat'>Book boat</Link></li>
                                <li><Link to='/place-list'>Book guider</Link></li>
                                <li><Link to='/pooja-list'>Book priest</Link></li>
                                <li><Link to='/hotels'>Hotels</Link></li>
                                <li><Link to='/about'>About</Link></li>
                                <li><Link to='/contact'>Contact</Link></li>
                                {isLoggedIn && (
                                    <li className="relative">
                                        <span className='flex items-center cursor-pointer order-dropdown' onClick={handleOrderDropdownToggle}>
                                            Order <svg className={`w-4 h-4 ml-2 transition-transform ${orderDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </span>
                                        {orderDropdownOpen && (
                                            <ul className="absolute z-10 flex-col w-[10rem] mt-1 bg-white border rounded shadow-lg top-full">
                                                <li><Link to={`/order/car-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Car Book</Link></li>
                                                <li><Link to={`/order/boat-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Boat Book</Link></li>
                                                <li><Link to={`/order/priest-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Priest Book</Link></li>
                                                <li><Link to={`/order/guider-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Guider Book</Link></li>
                                                <li><Link to={`/order/hotel-book/${userId}`} className="px-4 py-2 hover:bg-gray-100">Hotel Book</Link></li>
                                            </ul>
                                        )}
                                    </li>
                                )}
                            </div>
                            <div className='mb-6'>
                                {!isLoggedIn ?
                                    <div className='flex flex-col items-center justify-center gap-2 '>
                                        <Link to='/login'
                                            className='btn bg-[#19b56f] transition-all duration-700 hover:bg-[#FF8900] border-none text-white btn-sm rounded-sm w-[97%] font-normal text-[1.02rem] tracking-wide'>
                                            Login
                                        </Link>
                                        <Link to='/register'
                                            className='btn bg-[#FF8900] transition-all duration-700 hover:bg-[#19b56f] border-none text-white btn-sm rounded-sm w-[97%] font-normal text-[1.02rem] tracking-wide'>
                                            Register
                                        </Link>
                                    </div>
                                    :
                                    <div className='flex flex-col gap-2'>
                                        <Link to={`/profile/${fullName}`} className='flex items-center justify-between p-2 gap-4 rounded-md w-[99%] cursor-pointer from-[#1751fe] via-[#0074f9] hover:bg-gradient-to-bl bg-gradient-to-tr to-[#0199ff]  duration-300'>
                                            <img src={(!avatar?.secure_url ? userImg : avatar?.secure_url)} alt={`${fullName} img`} className='w-[2.3rem] bg-white h-[2.3rem] rounded-full   object-cover shadow-[0px_0px_18px_-6px_#fff] ml-1' />
                                            <p className='text-[0.95rem] w-[7.5rem] truncate text-white capitalize'>{fullName}</p>
                                        </Link>
                                        <Link to='/logout' onClick={handleLogout} className='btn bg-[#FF8900] transition-all duration-700 hover:bg-[#0074f9] border-none text-white btn-sm rounded-sm w-[99%] font-normal text-[1.02rem] tracking-wide'>
                                            Logout
                                        </Link>
                                    </div>}
                            </div>
                        </ul>
                    </div>
                </div>
                {/* Scroll to Top Button */}
                {isScrollTopVisible && (
                    <button
                        onClick={scrollToTop}
                        className="fixed z-[10000000000] bottom-4 right-4 p-3 from-[#1751fe] via-[#0074f9] bg-gradient-to-tr duration-300 to-[#0199ff] text-white rounded-full shadow-lg hover:bg-[#0d011c] transition-transform transform hover:scale-110">
                        <MdKeyboardDoubleArrowUp size={24} />
                    </button>
                )}
                <Footer />
            </div>
        </>
    );
};

export default HomeLayout;
