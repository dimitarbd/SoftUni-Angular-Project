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
  },
  {
    _id: 'part-4',
    title: 'Electromechanical Actuator',
    category: 'Braking System',
    brand: 'Brembo',
    price: '355',
    year: '2020',
    quantity: '4',
    imageUrl: '/images/product/large-size/4.jpg',
    rating: '5',
    description: 'A compact and reliable actuator designed for modern vehicle systems.',
    _createdOn: 1744224648449
  },
  {
    _id: 'part-5',
    title: 'iBooster',
    category: 'Braking System',
    brand: 'Bosch',
    price: '755',
    year: '2022',
    quantity: '10',
    imageUrl: '/images/product/large-size/5.jpg',
    rating: '5',
    description: 'An advanced booster for improved control and responsiveness.',
    _createdOn: 1744224648450
  },
  {
    _id: 'part-6',
    title: 'Power Sport Kit Series',
    category: 'Braking System',
    brand: 'Power Sport',
    price: '398',
    year: '2023',
    quantity: '50',
    imageUrl: '/images/product/large-size/6.jpg',
    rating: '4',
    description: 'A premium brake kit made for high performance and everyday use.',
    _createdOn: 1744224648451
  },
  {
    _id: 'part-7',
    title: 'Sport Bucket Seats',
    category: 'Interior and Comfort',
    brand: 'Recaro',
    price: '620',
    year: '2021',
    quantity: '6',
    imageUrl: '/images/product/large-size/7.jpg',
    rating: '5',
    description: 'Comfortable and supportive bucket seats for an upgraded driving experience.',
    _createdOn: 1744224648452
  },
  {
    _id: 'part-8',
    title: 'TAROX Sport Japan Disc',
    category: 'Wheels and Tires',
    brand: 'TAROX',
    price: '280',
    year: '2020',
    quantity: '12',
    imageUrl: '/images/product/large-size/8.jpg',
    rating: '4',
    description: 'High-quality brake discs designed for performance and durability.',
    _createdOn: 1744224648453
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