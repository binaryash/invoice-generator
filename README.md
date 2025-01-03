# Invoice Generator

This project is a simple **Invoice Generator** built with **React** and **Vite**. It allows users to create invoices by adding items with their names, quantities, and prices. The application provides functionality to calculate the total cost of all items, and download the generated invoice as a PDF.

Website: [https://invoice-generator-theta-one.vercel.app/](https://invoice-generator-theta-one.vercel.app/)

## Features

- Add multiple items to an invoice.
- Automatically calculate the total amount.
- Download the invoice as a PDF file.
- Customizable invoice title.
- Delete individual items from the invoice list.
- Real-time invoice updates.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web development.
- **Ant Design**: A React UI library for building rich, user-friendly components.
- **jsPDF**: A library to generate PDF documents on the client-side.
- **jspdf-autotable**: An extension for jsPDF to generate tables in PDF.

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/binaryash.github.io/invoice-generator.git
cd invoice-generator
```

### 2. Install dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. Then run the following command to install the dependencies:

```bash
npm install
```

### 3. Start the development server

Once the dependencies are installed, you can start the development server using Vite:

```bash
npm run dev
```

This will start the server and you can view the app in your browser at `http://localhost:3000`.

## Usage

1. **Add Items**: Enter the item name, quantity, and price in the form fields and click "Add Item" to add it to the invoice.
2. **Delete Items**: To remove an item, click the "Delete" button next to the item in the table and confirm the action.
3. **Download PDF**: After adding all the items, click the "Download PDF" button to generate and download the invoice as a PDF file.

The generated PDF will include:
- Invoice title.
- Current date and time.
- A table with item names, quantities, prices, and total amounts.
- A total amount at the bottom of the table.

## Folder Structure

```
src/
├── assets/      
├── components/       
├── App.jsx           
├── App.css           
├── main.jsx          
├── index.html        
└── ...
```

## License

This project is open-source and available under the [MIT License](LICENSE).
