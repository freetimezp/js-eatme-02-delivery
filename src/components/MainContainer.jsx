import React from 'react';
import HomeContainer from './HomeContainer';

import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import MenuContainer from './MenuContainer';


const MainContainer = () => {
  const [{foodItems}, dispatch] = useStateValue();
  
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex">
          <p 
            className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
            before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400
            to-orange-600 transition-all duration-300 ease-in-out max-w-[500px]"
          >
            Our fresh & healthy Fruits
          </p>
        </div>

        <RowContainer flag={false} data={foodItems?.filter((n) => n.category === 'fruits')} />
      </section>

      <MenuContainer />
    </div>
  )
}

export default MainContainer;
