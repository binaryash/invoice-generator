import React from 'react';
import { Typography, Space } from 'antd';

const { Text } = Typography;

const TotalAmount = ({ total }) => (
  <div className="total" style={{ marginTop: '20px' }}>
    <Space direction="vertical">
      <Text strong style={{ fontSize: '18px' }}>Total Amount:</Text>
      <Text type="danger" style={{ fontSize: '20px', color: '#ff4d4f' }}>
        ${total.toFixed(2)}
      </Text>
    </Space>
  </div>
);

export default TotalAmount;
