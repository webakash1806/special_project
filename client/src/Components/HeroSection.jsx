import React from 'react'

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { FaEarthAmericas } from "react-icons/fa6";
import hero1Image from '../assets/Images/hero1.jpeg'
import AnimatedText from './AnimatedText';
const handleDragStart = (e) => e.preventDefault();

const items = [
    <>
        <div

            className='h-[75vh] relative bg-gradient-to-b  onDragStart={handleDragStart} role="presentation" flex items-center justify-between from-[#8FE7CA] to-[#C9F7E8] '>
            <div className='flex p-4 h-full w-full lg:w-[50%] bg-gradient-to-r from-[#000000fa] from-[10%] via-[55%] to-[95%] via-[#11121298] to-[#00000000] flex-col relative z-[100] items-center text-center justify-center'>
                <h2 className='flex mb-8 items-center text-[1.5rem] font-bold justify-center gap-2 text-[#00f5a3]'>Discover new horizons!<FaEarthAmericas /></h2>
                <h1 className='text-white text-[2.8rem] overlock-black-italic'>
                    <AnimatedText text1={"Embark on an Epic Journey!"} /></h1>
                <p className='text-[#f2f2f2] text-[1.1rem] lora-700'>
                    <AnimatedText text2={"Embark new horizons and create unforgettable memories."} />
                </p>
                <button className='from-[#1751fe] mt-6 hover:bg-gradient-to-bl via-[#0074f9]  to-[#0199ff]  shadow-md transition-all duration-500 bg-gradient-to-tl rounded-full p-4 px-8 text-[1.1rem] font-semibold'>Explore Now</button>
            </div>
            <div className='lg:w-[40%] md:w-[30%] md:block hidden'>

            </div>
            <div className='absolute z-[20] top-0 right-0 ' >
                <img src={hero1Image} className='w-screen h-[75vh] object-cover  relative bg-gradient-to-t from-[#808080] to-[#808080]' alt="" />
            </div>
        </div>
    </>,

];


const HeroSection = () => {
    return (
        <div>
            <AliceCarousel mouseTracking
                autoPlayInterval={2400}
                animationDuration={900}
                infinite
                disableDotsControls
                disableButtonsControls
                items={items}
                autoPlay
            />
        </div>
    )
}

export default HeroSection
