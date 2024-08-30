import s3 from "../ProductPhotos/s3.png";
import s19 from "../ProductPhotos/s19.png";
import p29 from "../Photos/p29.png";
import s24 from "../ProductPhotos/s24.png";

let data_product = [
  {
    id: 4,
    name: "Women's Classic Trench Coat",
    category: "women",
    image: s3,
    new_price: 100.0,
    old_price: 150.0,
    dealer: "Dealer D",
  },
  {
    id: 14,
    name: "Men's Slim Fit Jeans",
    category: "men",
    image: s19,
    new_price: 50.0,
    old_price: 80.0,
    dealer: "Dealer B",
  },
  {
    id: 18,
    name: "Men's Basic T-Shirt",
    category: "men",
    image: s24,
    new_price: 15.0,
    old_price: 25.0,
    dealer: "Dealer A",
  },
  {
    id: 29,
    name: "Kid's School Uniform Set",
    category: "kid",
    image: p29,
    new_price: 35.0,
    old_price: 55.0,
    dealer: "Dealer B",
  },
];

export default data_product;
