import React from 'react';
import { Spin } from 'antd';

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  if (!loading) return null;  

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Spin size="large" />
      <div style={{ marginTop: '10px' }}>ინფორმაცია მუშავდება...</div>
    </div>
  );
};

export default Loading;
