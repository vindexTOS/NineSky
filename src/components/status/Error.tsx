import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';

export default function ErrorModal({ error }:{error:string   }) {
  const [visible, setVisible] = useState(!!error); // Initialize visibility based on error

  useEffect(() => {
    setVisible(!!error); // Update visibility when error changes
  }, [error]);

  const handleCancel = () => {
    setVisible(false); // Hide the modal
  };

  return (
    <Modal
      title="Error"
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      className="error-modal"
    >
      <div className="text-red-600">
        {error}
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="primary" onClick={handleCancel}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
