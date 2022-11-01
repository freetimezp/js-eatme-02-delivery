import React from 'react';

import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png';
import { heroData } from '../utils/data';

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6" id="home">
      <div className="py-2 flex flex-1 flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
          <div className="h-8 w-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img src={Delivery} alt="bike" className="w-full h-full object-contain" />
          </div>
        </div>

        <p className="text-[2.5rem] w-full font-bold tracking-wide text-headingColor text-center md:text-left 
          md:text-[3.5rem] lg:text-[4.5rem]"
        >
          The Fastest Delivery in 
          <span className="text-orange-600 text-[3rem] md:text-[4rem] lg:text-[5rem] block md:flex">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left w-full md:w-[80%]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, libero. 
          Quidem voluptates nobis laudantium cupiditate, consequuntur culpa nostrum quod 
          praesentium!
        </p>

        <button 
          type="button"
          className="bg-gradient-to-r from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg
          transition-all ease-in-out duration-100 hover:from-orange-500 hover:to-orange-400 md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img src={HeroBg} alt="home" className="h-420 lg:h-650 w-full lg:w-auto ml-auto" />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 lg:px-32
          gap-x-2 lg:gap-x-[2.75rem] flex-wrap"
        >
          {heroData && heroData.map((n) => (
            <div 
              className="w-[160px] p-2 lg:p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex items-center justify-center 
              flex-col lg:min-w-[190px] shadow-xl" key={n.id}
            >
              <img src={n.imageSrc} alt="home" className="w-20 lg:w-40 -mt-10 lg:-mt-20" />
              <p className="text-[12px] lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">{n.name}</p>
              <p className="text-[10px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">{n.desc}</p>
              <p className="text-sm font-semibold text-headingColor flex items-center">
                <span className="text-xs text-red-600">$</span><span className="ml-1">{n.price}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeContainer;
