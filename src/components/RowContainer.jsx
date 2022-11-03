import React, { useRef } from 'react';

import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const RowContainer = ({ flag, data }) => {
  //console.log(data);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  SwiperCore.use([Navigation]);

  return (
    <Swiper
      breakpoints={{
        420: {
          slidesPerView: 1,
          width: 300,
        },
        800: {
          slidesPerView: 2,
          width: 680,
        }
      }}
      navigation={{
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      }}
      loop={true}
      slidesPerView={4}
      width={1320}
      grabCursor={true}
      spaceBetween={10}
      className="w-full gap-1 md:gap-3 py-12 bg-rowBg mySwiper flex flex-row relative scroll-smooth"
    >
      <div>
        {data && data?.map((item) => (
          <SwiperSlide
            key={item?.id} 
            className="w-screen m-auto h-auto bg-orange-400 rounded-lg p-2 px-3 hover:shadow-lg duration-300 my-12
            hover:bg-orange-500 md:mx-4"
          >
            <div className="flex items-center justify-between">
              <motion.img 
                whileHover={{ scale: 1.2 }}
                src={item?.imageURL} 
                alt="fruit"
                className="w-40 max-w-40 h-40 max-h-40 -mt-10 rounded-md hover:rounded-none" 
              />
              <motion.div
                whileTap={{ scale: 0.75 }} 
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
        
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}  
              </p> 
              <p className="mt-1 text-sm italic text-gray-700">{item?.calories} calories</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-700">$</span> {item?.price}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </div>
      
      <div 
        className="hidden md:flex w-full absolute bottom-0
        gap-3 items-center justify-center"
      >
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-10 h-10 rounded-full bg-orange-400 hover:bg-orange-500 flex items-center justify-center
          cursor-pointer duration-100 hover:shadow-lg"
          ref={prevRef}
        >
          <MdChevronLeft className="text-2xl text-white" />
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-10 h-10 rounded-full bg-orange-400 hover:bg-orange-500 flex items-center justify-center
          cursor-pointer duration-100 hover:shadow-lg"
          ref={nextRef}
        >              
          <MdChevronRight className="text-2xl text-white" />              
        </motion.div>
      </div>
    </Swiper>
  )
}

export default RowContainer;
