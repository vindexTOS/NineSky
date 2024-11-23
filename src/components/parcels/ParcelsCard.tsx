import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import axios from 'axios';
import { envirement } from '../../envirement/env';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function ParcelsCard({ parcel, color , refetch}: { parcel: any, color: string, refetch:any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [type, setType] = useState('');
  const [website, setWebsite] = useState('');
  const [comment, setComment] = useState('');
  const token = cookies.get("token");


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      // console.log(parcel)
      formData.append('tracking_id', parcel.id);
      formData.append('price', parcel.price);
      formData.append('type', type);
      formData.append('website', website);
      formData.append('comment', comment);
      formData.append('file', selectedFile);

      try {
        await axios.post(envirement.baseUrl + 'user/declarate-parcel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',

            Authorization: `Bearer ${token}`,

          },
        });
        refetch()
        message.success("დეკლერაცია აიტვირთა წარმატებით")
      } catch (error) {
        const err: any = error
        message.error(err.message)
        console.error('Error uploading file:', error);
      }
    }
    closeModal();
  };
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [isDelecrationModalOpen,setIsDeclerationModalOpen] = useState(false)

const handleOpenDeclaration = (parcel: any) => {
  setSelectedParcel(parcel);
  setIsDeclerationModalOpen(true);
};
  const openDeclaration = () => {
    // Assuming invoice_Pdf is a buffer, you would need to convert it to a URL
    if (parcel.declaration && parcel.declaration.invoice_Pdf) {
      const blob = new Blob([new Uint8Array(parcel.declaration.invoice_Pdf.data)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
      {/* Upper Part */}
      <div style={{ backgroundColor: color }} className="text-white p-4">
        <div className="flex flex-wrap justify-between text-[1rem]">
          <div className="flex items-center">
            <span className="font-medium mr-1">რეისი:</span>
            <span>{parcel.flight_id ?? 'FL1234'}</span> {/* Updated from 'race' to 'flight_id' */}
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
  <span className="font-medium mr-1">გადახდა:</span>
  <span
    className={`font-bold ${
      parcel.payment_status === "Unpaid" ? "text-red-500" : "text-green-500"
    }`}
  >
    {parcel.payment_status === "Unpaid" ? "გადაუხდელია" : "გადახდილია"}
  </span>
</div>
          <div className="flex items-center">
            {parcel.declaration ? (
              <button
                className="ml-2 bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-700"
                onClick={()=>handleOpenDeclaration(parcel)}
              >
                აქტიური დეკლარაცია
              </button>
            ) : (
              <button
                className="ml-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-blue-600"
                onClick={openModal}
              >
                დეკლარაცია
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Uploading Declaration */}
      <Modal visible={isModalOpen} onCancel={closeModal} footer={null} title="Upload Declaration">
        <h2 className="text-xl mb-4">Upload Declaration (PDF)</h2>
        <div className="mb-4">
          <Input
            placeholder="Type (e.g., Technological)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Website (e.g., Taobao, eBay)"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mb-2"
          />
          <Input.TextArea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2"
          />
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button className="bg-gray-400 text-white" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            type="primary"
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      </Modal>
{/* delecration modal */}
<Modal
          title="დეკლარაცის დეტალები"
          open={isDelecrationModalOpen}
          onCancel={() => setIsDeclerationModalOpen(false)}
          footer={null}
        >
          {selectedParcel?.declaration ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-semibold w-1/3">ID:</span>
                <span className="w-2/3">{selectedParcel.declaration.id}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3">ტიპი:</span>
                <span className="w-2/3">{selectedParcel.declaration.type}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3">ფასი:</span>
                <span className="w-2/3">${selectedParcel.declaration.price}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3">Website:</span>
                <a href={selectedParcel.declaration.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 w-2/3">
                  {selectedParcel.declaration.website}
                </a>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3">კომენტარი:</span>
                <span className="w-2/3">{selectedParcel.declaration.comment}</span>
              </div>
              {selectedParcel.declaration.invoice_Pdf && (
                <div className="flex justify-center mt-6">
                  <Button
                    type="primary"
                    onClick={() => {
                      const blob = new Blob(
                        [new Uint8Array(selectedParcel.declaration.invoice_Pdf.data)],
                        { type: 'application/pdf' }
                      );
                      const url = URL.createObjectURL(blob);
                      window.open(url);
                    }}
                  >
                    ინვოისის ნახვა
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">No Declaration Available</p>
          )}
        </Modal>
    </div>
  );
}
