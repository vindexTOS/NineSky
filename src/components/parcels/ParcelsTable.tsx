import React, { FC } from 'react';
import ParcelsCard from './ParcelsCard';
import { FakeParcldata } from '../../assets/data/fakeJson';
 

type ParcelsPropType = { 
      data:any 
      color:string 
      title:string 
}

const ParcelsTable:FC<ParcelsPropType > = ({data,color,title}) => {
  const [parcels, setParcels] = React.useState<any>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5; // Number of parcels to display per page

  React.useEffect(() => {
    const fetchData = async () => {
      setParcels(data);
    };

    fetchData();
  }, []);

  // Calculate the current parcels to display
  const startIndex = (currentPage - 1) * pageSize;
  const currentParcels = parcels.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(parcels.length / pageSize);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-[1.5rem] text-gray-400">{title}</h1>
      </div>
      {currentParcels.map((parcel: any, index: number) => (
        <ParcelsCard key={index} parcel={parcel}  color={color} />
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
           წინა
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className={`px-4 py-2 bg-gray-200 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
         შემდეგი
        </button>
      </div>
    </div>
  );
}

export default ParcelsTable