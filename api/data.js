const parts = [
  {
    _id: 'part-1',
    title: 'S837 Haze Wheels',
    category: 'Wheels and Tires',
    brand: 'Buxton',
    price: '400',
    year: '2019',
    quantity: '14',
    imageUrl: '/images/product/large-size/1.jpg',
    rating: '4',
    description: 'Stylish and durable wheels for a premium look and reliable performance.',
    _createdOn: 1744224648446
  },
  {
    _id: 'part-2',
    title: 'Universal AC Vent Cupholder',
    category: 'Interior and Comfort',
    brand: 'TENDYCOCO',
    price: '9',
    year: '2019',
    quantity: '1',
    imageUrl: '/images/product/large-size/2.jpg',
    rating: '3',
    description: 'A convenient accessory that keeps your drink within easy reach.',
    _createdOn: 1744224648447
  },
  {
    _id: 'part-3',
    title: 'Road King Special 107 ABS 2017',
    category: 'Braking System',
    brand: 'Harley Davidson',
    price: '605',
    year: '2024',
    quantity: '8',
    imageUrl: '/images/product/large-size/3.jpg',
    rating: '5',
    description: 'High-performance braking system with excellent stability.',
    _createdOn: 1744224648448
  }
];

const comments = [];
const users = {
  '35c62d76-8152-4626-8712-eeb96381bea8': {
    email: 'peter@abv.bg',
    username: 'Peter'
  },
  '60f0cf0b-34b0-4abd-9769-8c42f830dffc': {
    email: 'admin@abv.bg',
    username: 'Admin'
  }
};

module.exports = {
  parts,
  comments,
  users
};