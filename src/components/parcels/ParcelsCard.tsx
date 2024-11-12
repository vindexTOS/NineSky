import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import axios from 'axios';
import { envirement } from '../../envirement/env';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function ParcelsCard({ parcel, color }: { parcel: any, color: string }) {
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
      formData.append('tracking_id', parcel.tracking_id);
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
        console.log('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    closeModal();
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
            <span className="font-medium mr-1">ჩამოტანა:</span>
            <span>{parcel.shipping_status ?? 'N/A'}</span> {/* Changed 'takeOutPrice' to 'shipping_status' for consistency */}
          </div>
          <div className="flex items-center">
            {parcel.declaration ? (
              <button
                className="ml-2 bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-700"
                onClick={openDeclaration}
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
    </div>
  );
}
