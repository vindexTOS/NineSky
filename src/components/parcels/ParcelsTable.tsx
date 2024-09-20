import React from 'react';

export default function ParcelsCard({ parcel }:{parcel:any}) {
  return (
    <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
      {/* Upper Part */}
      <div className="bg-blue-400  text-white p-4">
 
        <div className="flex flex-wrap justify-between  text-[1rem]">
          <div className="flex items-center">
            <span className="font-medium mr-1">რეისი:</span>
            <span>{parcel.race}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">რაოდენობა:</span>
            <span>{parcel.amount}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">ფასი:</span>
            <span>{parcel.price}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">ინვოისი:</span>
            <span>{parcel.invoice}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">დეკლარაცია:</span>
            <span>{parcel.declaration}</span>
          </div>
        </div>
      </div>

      {/* Lower Part */}
      <div className="p-4 bg-gray-100">
 
        <div className="flex flex-wrap justify-between  text-[1rem]">
          <div className="flex items-center">
            <span className="font-medium mr-1">თრექინგი ID:</span>
            <span>{parcel.trackingId}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">წონა:</span>
            <span>{parcel.weight}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">მოცულობა:</span>
            <span>{parcel.volume}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">ჩამოტანა:</span>
            <span>{parcel.takeOutPrice}</span>
          </div>
          <div className="flex items-center">
            {/* <span className="font-medium mr-1">დეკლარაცია:</span> */}
            <button className="ml-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-blue-600  ">
             დეკლარაცია
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
