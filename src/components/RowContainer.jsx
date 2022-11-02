import React, { useEffect, useRef } from 'react';

import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const RowContainer = ({ flag, data }) => {
  //console.log(data);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  SwiperCore.use([Navigation]);

  return (
    <Swiper
      navigation={{
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      }}
      spaceBetween={20}
      slidesPerView={4}
      loop={true}
      className={`w-full gap-3 py-12 bg-rowBg overflow-x-hidden mySwiper
      ${flag ? "scrollbar-none" : "flex-wrap"}`}
    >
      <div>
        {data && data?.map((item) => (
          <SwiperSlide
            key={item.id} 
            className="w-300 md:w-340 h-auto bg-blue-50 rounded-lg p-2 backdrop-blur-md my-12 hover:shadow-lg duration-300
            hover:bg-blue-100 min-w-[300px] md:min-w-[340px]"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img 
                whileHover={{ scale: 1.2 }}
                src={item.imageURL} 
                alt=""
                className="w-40 max-w-40 max-h-40 -mt-8 rounded-md hover:rounded-none" 
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
                Chocolate & Vanilla  
              </p> 
              <p className="mt-1 text-sm text-gray-500">45 calories</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> 5.25
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </div>
      <div className="hidden md:flex gap-3 items-center justify-center">
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center
          cursor-pointer duration-100 hover:shadow-lg"
          ref={prevRef}
        >
          <MdChevronLeft className="text-lg text-white" />
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center
          cursor-pointer duration-100 hover:shadow-lg"
          ref={nextRef}
        >              
          <MdChevronRight className="text-lg text-white" />              
        </motion.div>
      </div>
    </Swiper>
  )
}

export default RowContainer;
