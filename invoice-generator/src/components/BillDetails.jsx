import React, { useState } from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';

const { Text } = Typography;

const BillDetails = ({ onAddItem }) => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddItem = () => {
    if (!item || quantity <= 0 || price <= 0) {
      setErrorMessage('Please enter valid item details.');
      return;
    }
    onAddItem({ item, quantity, price });
    setItem('');
    setQuantity(1);
    setPrice(0);
    setErrorMessage('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form layout="vertical" onFinish={handleAddItem}>
        <Form.Item
          label="Item"
          required
          validateStatus={errorMessage ? 'error' : ''}
          help={errorMessage}
        >
          <Input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter item name"
          />
        </Form.Item>

        <Form.Item
          label="Quantity"
          required
          validateStatus={errorMessage ? 'error' : ''}
          help={errorMessage}
        >
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            placeholder="Enter quantity"
          />
        </Form.Item>

        <Form.Item
          label="Price"
          required
          validateStatus={errorMessage ? 'error' : ''}
          help={errorMessage}
        >
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min={0}
            placeholder="Enter price"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Add Item
          </Button>
        </Form.Item>
      </Form>

      {errorMessage && (
        <Text type="danger" style={{ display: 'block', marginTop: '10px' }}>
          {errorMessage}
        </Text>
      )}
    </div>
  );
};

export default BillDetails;
