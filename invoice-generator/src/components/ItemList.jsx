import React from 'react';
import { Card, Button, Row, Col, Space, Typography } from 'antd';

const { Title, Text } = Typography;

const ItemList = ({ items, onDeleteItem }) => (
  <div className="item-list" style={{ marginTop: '20px' }}>
    <Title level={3}>Item List</Title>

    <Row gutter={[16, 16]}>
      {items.map((item, index) => (
        <Col span={8} key={index}>
          <Card
            title={item.item}
            bordered={true}
            extra={
              <Button 
                type="primary" 
                danger
                onClick={() => onDeleteItem(index)}
              >
                Delete
              </Button>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text><strong>Quantity:</strong> {item.quantity}</Text>
              <Text><strong>Price:</strong> ${item.price.toFixed(2)}</Text>
              <Text><strong>Total:</strong> ${(item.quantity * item.price).toFixed(2)}</Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default ItemList;
