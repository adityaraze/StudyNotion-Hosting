import React from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { TbBinaryTree2 } from "react-icons/tb";
const CourseCard = (props) => {
  const cardData = props.cardData;
  const currentCard = props.currentCard;
  const setCurrentCard = props.setCurrentCard
  const isActive = currentCard === cardData.heading;
  return (
      <div  className={`flex flex-col items-center justify-between mt-10 h-[250px] w-[341px] cursor-pointer ${isActive ? "bg-white text-[#585D69] bgYellow" : "bg-[#161D29] text-[#6E727F] card"}`}
      onClick={() => setCurrentCard(cardData.heading)}>
        <div className="flex flex-col gap-[12px]">
          <h2 className={`mt-3 font-500 font-inter text-lg ${isActive ? "text-black" :"text-white"}`}>{cardData.heading}</h2>
          <p className="text-[#6E727F] w-[300px] items-start">{cardData.description}</p>
        </div>
        <div className={`flex flex-row gap-[200px] mb-5 justify-between items-center border-t border-dashed  ${isActive ? "text-[#0A5A72] border-[#0A5A72]" : "text-[#6E727F] border-[#6E727F]"}`}>
          <div className="flex flex-row items-center gap-2 font-semibold text-md">
          <HiMiniUsers/>
          {cardData.level}
          </div>
          <div className="flex flex-row items-center gap-2">
          <TbBinaryTree2/>
          {cardData.lessionNumber}</div>
        </div>
      </div>
  );
};

export default CourseCard;
