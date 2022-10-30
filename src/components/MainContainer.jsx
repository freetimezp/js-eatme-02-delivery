import React from 'react';

import Delivery from '../img/delivery.png';

const MainContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="py-2 flex flex-1 flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
          <div className="h-8 w-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img src={Delivery} alt="bike" className="w-full h-full object-contain" />
          </div>
        </div>

        <p className="text-[2.5rem] w-full font-bold tracking-wide text-headingColor text-left
          md:text-[4.5rem]">
          The Fastest Delivery in <span className="text-orange-600 text-[3rem] lg:text-[5rem] block md:flex">Your City</span>
        </p>

        <p className="text-base text-textColor text-left md:w-[80%]">
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
      <div className="py-2 flex-1"></div>
    </div>
  )
}

export default MainContainer;
