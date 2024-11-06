import React from 'react';

export default function ParcelsCard({ parcel, color }: { parcel: any, color: string }) {
  return (
    <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
      {/* Upper Part */}
      <div style={{ backgroundColor: color }} className="text-white p-4">
        <div className="flex flex-wrap justify-between text-[1rem]">
          <div className="flex items-center">
            <span className="font-medium mr-1">რეისი:</span>
            <span>{parcel.flight_id ?? 'FL12s34'}</span> {/* Updated from 'race' to 'flight_id' */}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">რაოდენობა:</span>
            <span>{parcel.amount ?? '1'}</span> {/* Hardcoded value if not available */}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">ფასი:</span>
            <span>{parcel.price ?? 150}</span> {/* Using the new 'price' property */}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">ინვოისი:</span>
            <span>{parcel.invoice ?? 'INV123'}</span> {/* Hardcoded value if not available */}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">დეკლარაცია:</span>
            <span>{parcel.declaration ?? 'DEC123'}</span> {/* Hardcoded value if not available */}
          </div>
        </div>
      </div>

      {/* Lower Part */}
      <div className="p-4 bg-gray-100">
        <div className="flex flex-wrap justify-between text-[1rem]">
          <div className="flex items-center">
            <span className="font-medium mr-1">თრექინგი ID:</span>
            <span>{parcel.tracking_id ?? '424244'}</span> {/* Updated from 'trackingId' to 'tracking_id' */}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">წონა:</span>
            <span>{parcel.weight ?? 10}</span> {/* Using the new 'weight' property */}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">მოცულობა:</span>
            <span>{parcel.vol_weight ?? 'N/A'}</span> {/* Updated from 'volume' to 'vol_weight' */}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">ჩამოტანა:</span>
            <span>{parcel.takeOutPrice ?? 'N/A'}</span> {/* Hardcoded value if not available */}
          </div>
          <div className="flex items-center">
            <button className="ml-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-blue-600">
              დეკლარაცია
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}