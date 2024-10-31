import React, { useEffect, useState } from "react";
import { dateArray } from "../Date";
import { strategyArrayListData } from "../StratergyArray";

function ViewStratergies() {
  const obj = {
    Bullish: false,
    Bearish: false,
    RangeBound: false,
    Volatile: false,
  };

  const [SelectedTypeList, setSelectedTypeList] = useState({ ...obj, Bullish: true }); // For click bg - color change 
  const [selectedValue,setSelectedValue] = useState("Bullish") 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("24-Apr-2024");
  const[SelectedDateStratergy,setSelectedDateStratergy] = useState([])
  const[TotalStratergDetails,setTotalStratergDetails] = useState([])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  useEffect(() => {

    const newarr = strategyArrayListData?.map((ele,i)=>{
            if(selectedValue === ele.View){
              // console.log(ele.Value[selectedDate]);
                setSelectedDateStratergy(ele.Value[selectedDate])
            }            
    })

  }, [selectedValue,selectedDate]);

  useEffect(()=>{

    const newArray = SelectedDateStratergy?.reduce((acc,strategy)=>{
      const existingStrategy = acc.find(item => item.name === strategy);
      if (existingStrategy) {
        existingStrategy.count += 1;
      } else {
        acc.push({ name: strategy, count: 1 });
      }
      return acc;
    },[])
    
    if(newArray){
      setTotalStratergDetails(newArray)

    }else{
      setTotalStratergDetails([])
    }
    console.log(TotalStratergDetails);
    console.log("newArray",newArray);
    

  },[SelectedDateStratergy])




  function handleClick(text) {
    setSelectedTypeList({
      ...obj,
      [text]: true,
    });
    setSelectedValue(text)
  }

  return (
    <>
      <div className="min-w-full min-h-screen flex items-center justify-center">
        <div className="sm:w-[50%] min-h-screen bg-white">
          <div className="min-w-full mt-4 p-2 flex items-center  justify-around bg-gray-100 text-sm  text-gray-500 font-bold rounded-xl">
            <span
              className={`${
                SelectedTypeList["Bullish"] ? "bg-blue-500 sm:px-6 py-1 rounded-xl text-white": ""} cursor-pointer px-2`}
                onClick={(e) => handleClick(e.target.innerText)}
            >
              Bullish
            </span>
            <span
              className={`${
                SelectedTypeList["Bearish"] ? "bg-blue-500 sm:px-6 py-1 rounded-xl text-white": ""} cursor-pointer px-2`}
              onClick={(e) => handleClick(e.target.innerText)}
            >
              Bearish
            </span>
            <span
              className={`${
                SelectedTypeList["RangeBound"]? "bg-blue-500 sm:px-6 py-1 rounded-xl text-white": ""} cursor-pointer px-2`}
              onClick={(e) => handleClick(e.target.innerText)}
            >
              RangeBound
            </span>
            <span
              className={`${
                SelectedTypeList["Volatile"]? "bg-blue-500 sm:px-6 py-1 rounded-xl text-white": ""} cursor-pointer px-2`}
              onClick={(e) => handleClick(e.target.innerText)}
            >
              Volatile
            </span>
          </div>

          <div className="w-full mx-auto mt-10">
            <div
              onClick={toggleDropdown}
              className="cursor-pointer w-full text-left  bg-white border border-gray-300 rounded-md p-4 flex justify-between items-center"
            >
              <span className="font-semibold">{selectedDate}</span>
              <span>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <div className="border border-gray-300 rounded-md mt-2 bg-white">
                {dateArray?.map((date, i) => {
                  return (
                    <div
                      key={date}
                      onClick={() => handleSelectDate(date)}
                      className="cursor-pointer w-full text-left p-4 border-b font-semibold border-gray-200 hover:bg-gray-100"
                    >
                      {date}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-4 space-y-2">

              {
 
                TotalStratergDetails.length === 0 ? <div className="w-full flex flex-col justify-center items-center mt-20"> <h1>There are no strategies</h1>
                  <h1 className="font-bold">{selectedDate}</h1>
                 </div>
              : TotalStratergDetails?.map((ele,i)=>{
                  return(
                    <div className="w-full hover:bg-gray-400 text-gray-600 font-semibold  hover:text-white cursor-pointer flex justify-between items-center p-4 border border-gray-300 rounded-md bg-white">
                    <span>{ele.name}</span>
                    <span>* {ele.count} {ele.count <=1 ? `Stratergy` : `Stratergies`}</span>
                  </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewStratergies;
