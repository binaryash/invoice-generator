import React, { useState } from 'react';
import { Button, Form, Input, Table, Typography, Space, Popconfirm } from 'antd';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './App.css';

const { Title, Text } = Typography;

const App = () => {
  const [items, setItems] = useState([]);
  const [invoiceTitle, setInvoiceTitle] = useState('Product Purchase');
  const [form] = Form.useForm();

  // Function to add item
  const handleAddItem = (values) => {
    const { item, quantity, price } = values;
    const newItem = { item, quantity, price: parseFloat(price) };
    setItems([...items, newItem]);
    form.resetFields();
  };

  // Function to delete an item
  const handleDeleteItem = (itemToDelete) => {
    const newItems = items.filter(item => item.item !== itemToDelete.item);
    setItems(newItems);
  };

  // Function to calculate total amount
  const calculateTotalAmount = () => 
    items.reduce((total, item) => total + item.quantity * item.price, 0);

  // Function to download the PDF
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    
    // Set title and style
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0); // Black text color
    pdf.text('Invoice Generator', 20, 20);
    
    // Add subtitle with dynamic invoice title
    pdf.setFontSize(14);
    pdf.text(invoiceTitle, 20, 30);  // Reflecting the user-defined invoice title
    
    // Add current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    pdf.text(`Date: ${formattedDate}`, 20, 40);
    
    // Create table data for the invoice items
    const tableData = items.map((item) => [
      item.item,                    
      item.quantity,                
      item.price.toFixed(2),        
      (item.quantity * item.price).toFixed(2),
    ]);
    
    // Add table to PDF with AutoTable
    pdf.autoTable({
      head: [['Item', 'Quantity', 'Price', 'Total']],
      body: tableData,
      startY: 50,
      theme: 'striped',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontSize: 12,
        halign: 'center',
      },
      bodyStyles: {
        fontSize: 10,
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { top: 50 },
    });

    // Calculate the total amount and add it below the table
    const totalAmount = calculateTotalAmount();
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Total Amount: $${totalAmount.toFixed(2)}`, 20, pdf.lastAutoTable.finalY + 10);

    // Save the PDF
    pdf.save('invoice.pdf');
  };

  // Table columns for displaying item list
  const columns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text, record) => (record.quantity * record.price).toFixed(2),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleDeleteItem(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Invoice Title Section */}
      <Space direction="vertical" size={15} style={{ width: '100%' }}>
        <Title level={1} style={{ textAlign: 'center' }}>Invoice Generator</Title>
        
        {/* Invoice Title Input */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Title level={4}>Invoice Title</Title>
          <Input
            value={invoiceTitle}
            onChange={(e) => setInvoiceTitle(e.target.value)}
            placeholder="Enter invoice title"
            style={{ width: '300px', marginBottom: '20px' }}
          />
        </div>

        {/* Date Section - Improved Design */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <Text style={{ fontSize: '14px', color: '#777', fontWeight: '400' }}>
            {new Date().toLocaleString()}
          </Text>
          {/* Optional separator line for better structure */}
          <div
            style={{
              marginTop: '10px',
              borderBottom: '1px solid #ddd',
              maxWidth: '300px',
              margin: '10px auto',
            }}
          />
        </div>
      </Space>

      {/* Form for adding new items */}
      <Form form={form} layout="inline" onFinish={handleAddItem} style={{ marginBottom: '20px' }}>
        <Form.Item
          name="item"
          rules={[{ required: true, message: 'Please input the item!' }]}
        >
          <Input placeholder="Item Name" style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item
          name="quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <Input type="number" placeholder="Quantity" style={{ width: '100px' }} />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <Input type="number" placeholder="Price" style={{ width: '100px' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Item</Button>
        </Form.Item>
      </Form>

      {/* Table displaying added items */}
      <Table
        columns={columns}
        dataSource={items}
        rowKey="item"
        pagination={false}
        bordered
        style={{ marginBottom: '20px' }}
      />

      {/* Button for downloading the invoice PDF */}
      <Space>
        <Button type="primary" onClick={handleDownloadPDF}>Download PDF</Button>
      </Space>
    </div>
  );
};

export default App;
