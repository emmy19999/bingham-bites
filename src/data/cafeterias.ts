import foodJollof from '@/assets/food-jollof.jpg';
import foodFriedrice from '@/assets/food-friedrice.jpg';
import foodSuya from '@/assets/food-suya.jpg';
import foodPoundedyam from '@/assets/food-poundedyam.jpg';
import foodSpaghetti from '@/assets/food-spaghetti.jpg';
import foodDrinks from '@/assets/food-drinks.jpg';
import foodSnacks from '@/assets/food-snacks.jpg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  preparationTime: number; // minutes
}

export interface Cafeteria {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  priceRange: string;
  isOpen: boolean;
  openHours: string;
  tags: string[];
  emoji: string;
  menu: MenuItem[];
}

const sharedImages = {
  jollof: foodJollof,
  friedrice: foodFriedrice,
  suya: foodSuya,
  poundedyam: foodPoundedyam,
  spaghetti: foodSpaghetti,
  drinks: foodDrinks,
  snacks: foodSnacks,
};

export const cafeterias: Cafeteria[] = [
  {
    id: 'omega',
    name: 'Omega Cafeteria',
    description: 'The go-to spot for hearty, affordable meals on campus. Known for generous portions.',
    rating: 4.5,
    reviewCount: 328,
    deliveryTime: '15-25 min',
    priceRange: '₦500 - ₦3,000',
    isOpen: true,
    openHours: '7:00 AM - 9:00 PM',
    tags: ['Nigerian', 'Rice', 'Swallow'],
    emoji: '🍛',
    menu: [
      { id: 'omega-1', name: 'Jollof Rice & Chicken', description: 'Smoky jollof rice with grilled chicken and coleslaw', price: 1500, image: sharedImages.jollof, category: 'Rice Dishes', popular: true, preparationTime: 10 },
      { id: 'omega-2', name: 'Fried Rice & Turkey', description: 'Colorful fried rice with seasoned turkey', price: 1800, image: sharedImages.friedrice, category: 'Rice Dishes', popular: true, preparationTime: 12 },
      { id: 'omega-3', name: 'Pounded Yam & Egusi', description: 'Smooth pounded yam with rich egusi soup and assorted meat', price: 2000, image: sharedImages.poundedyam, category: 'Swallow', preparationTime: 15 },
      { id: 'omega-4', name: 'Spaghetti Bolognese', description: 'Italian-style spaghetti with rich meat sauce', price: 1200, image: sharedImages.spaghetti, category: 'Pasta', preparationTime: 10 },
      { id: 'omega-5', name: 'Suya (Full Stick)', description: 'Spicy grilled beef suya with onions and pepper', price: 800, image: sharedImages.suya, category: 'Grills', preparationTime: 8 },
      { id: 'omega-6', name: 'Meat Pie', description: 'Golden-brown pastry filled with seasoned minced meat', price: 500, image: sharedImages.snacks, category: 'Snacks', preparationTime: 5 },
      { id: 'omega-7', name: 'Soft Drinks', description: 'Chilled Coca-Cola, Fanta, Sprite, or Malt', price: 300, image: sharedImages.drinks, category: 'Drinks', preparationTime: 2 },
    ],
  },
  {
    id: 'bigcaf',
    name: 'Big Caf',
    description: 'Premium dining experience with the widest menu variety on campus.',
    rating: 4.7,
    reviewCount: 512,
    deliveryTime: '20-30 min',
    priceRange: '₦800 - ₦4,500',
    isOpen: true,
    openHours: '8:00 AM - 10:00 PM',
    tags: ['Premium', 'Continental', 'Nigerian'],
    emoji: '👨‍🍳',
    menu: [
      { id: 'big-1', name: 'Special Jollof Rice', description: 'Party-style jollof rice with grilled chicken and plantain', price: 2000, image: sharedImages.jollof, category: 'Rice Dishes', popular: true, preparationTime: 15 },
      { id: 'big-2', name: 'Chinese Fried Rice', description: 'Special fried rice with prawns and mixed veggies', price: 2500, image: sharedImages.friedrice, category: 'Rice Dishes', preparationTime: 15 },
      { id: 'big-3', name: 'Pounded Yam & Ogbono', description: 'Fresh pounded yam served with ogbono soup', price: 2200, image: sharedImages.poundedyam, category: 'Swallow', popular: true, preparationTime: 18 },
      { id: 'big-4', name: 'Spaghetti & Meatballs', description: 'Creamy spaghetti topped with juicy meatballs', price: 1800, image: sharedImages.spaghetti, category: 'Pasta', preparationTime: 12 },
      { id: 'big-5', name: 'Chicken Suya Platter', description: 'Premium chicken suya with special spice blend', price: 1500, image: sharedImages.suya, category: 'Grills', preparationTime: 12 },
      { id: 'big-6', name: 'Sausage Roll (3 pcs)', description: 'Freshly baked sausage rolls', price: 600, image: sharedImages.snacks, category: 'Snacks', preparationTime: 5 },
      { id: 'big-7', name: 'Fresh Juice', description: 'Freshly blended orange, watermelon, or pineapple juice', price: 800, image: sharedImages.drinks, category: 'Drinks', preparationTime: 5 },
    ],
  },
  {
    id: 'ssspecial',
    name: 'SS Special',
    description: 'Quick service restaurant with signature spicy dishes loved by students.',
    rating: 4.3,
    reviewCount: 245,
    deliveryTime: '10-20 min',
    priceRange: '₦400 - ₦2,500',
    isOpen: true,
    openHours: '7:30 AM - 8:30 PM',
    tags: ['Spicy', 'Fast', 'Affordable'],
    emoji: '🌶️',
    menu: [
      { id: 'ss-1', name: 'Pepper Jollof Rice', description: 'Extra spicy jollof rice with fried fish', price: 1200, image: sharedImages.jollof, category: 'Rice Dishes', popular: true, preparationTime: 8 },
      { id: 'ss-2', name: 'Coconut Fried Rice', description: 'Coconut-infused fried rice with chicken', price: 1500, image: sharedImages.friedrice, category: 'Rice Dishes', preparationTime: 10 },
      { id: 'ss-3', name: 'Amala & Ewedu', description: 'Soft amala with ewedu and gbegiri soup', price: 1500, image: sharedImages.poundedyam, category: 'Swallow', preparationTime: 12 },
      { id: 'ss-4', name: 'Indomie Special', description: 'Loaded indomie noodles with egg and sausage', price: 800, image: sharedImages.spaghetti, category: 'Noodles', popular: true, preparationTime: 8 },
      { id: 'ss-5', name: 'Hot Suya Wrap', description: 'Suya wrapped in fresh tortilla with veggies', price: 1000, image: sharedImages.suya, category: 'Wraps', preparationTime: 10 },
      { id: 'ss-6', name: 'Puff Puff (6 pcs)', description: 'Sweet golden puff puff balls', price: 400, image: sharedImages.snacks, category: 'Snacks', preparationTime: 5 },
      { id: 'ss-7', name: 'Zobo Drink', description: 'Chilled homemade hibiscus drink', price: 300, image: sharedImages.drinks, category: 'Drinks', preparationTime: 2 },
    ],
  },
  {
    id: 'munchbox',
    name: 'Munch Box',
    description: 'Trendy fast food spot serving Instagram-worthy meals and snacks.',
    rating: 4.4,
    reviewCount: 189,
    deliveryTime: '15-25 min',
    priceRange: '₦600 - ₦3,500',
    isOpen: true,
    openHours: '9:00 AM - 9:00 PM',
    tags: ['Fast Food', 'Snacks', 'Trendy'],
    emoji: '📦',
    menu: [
      { id: 'mb-1', name: 'Loaded Jollof Box', description: 'Jollof rice box with grilled chicken, plantain & salad', price: 1800, image: sharedImages.jollof, category: 'Box Meals', popular: true, preparationTime: 12 },
      { id: 'mb-2', name: 'Fried Rice Box', description: 'Fried rice with turkey and coleslaw in a box', price: 1600, image: sharedImages.friedrice, category: 'Box Meals', preparationTime: 10 },
      { id: 'mb-3', name: 'Shawarma (Large)', description: 'Loaded chicken shawarma with extra toppings', price: 2500, image: sharedImages.suya, category: 'Wraps', popular: true, preparationTime: 10 },
      { id: 'mb-4', name: 'Spaghetti Jollof', description: 'Unique spaghetti cooked in jollof style', price: 1200, image: sharedImages.spaghetti, category: 'Pasta', preparationTime: 10 },
      { id: 'mb-5', name: 'Chicken & Chips', description: 'Crispy fried chicken with seasoned fries', price: 2000, image: sharedImages.snacks, category: 'Fast Food', preparationTime: 12 },
      { id: 'mb-6', name: 'Smoothie Bowl', description: 'Fresh fruit smoothie blend', price: 1200, image: sharedImages.drinks, category: 'Drinks', preparationTime: 5 },
    ],
  },
  {
    id: 'ngk',
    name: 'NGK',
    description: 'No-frills cafeteria serving classic Nigerian meals at student-friendly prices.',
    rating: 4.1,
    reviewCount: 156,
    deliveryTime: '10-20 min',
    priceRange: '₦300 - ₦2,000',
    isOpen: true,
    openHours: '6:30 AM - 8:00 PM',
    tags: ['Budget', 'Nigerian', 'Quick'],
    emoji: '🍲',
    menu: [
      { id: 'ngk-1', name: 'Jollof Rice & Beef', description: 'Classic jollof rice with stewed beef', price: 1000, image: sharedImages.jollof, category: 'Rice Dishes', popular: true, preparationTime: 8 },
      { id: 'ngk-2', name: 'White Rice & Stew', description: 'Plain rice with tomato stew and fish', price: 800, image: sharedImages.friedrice, category: 'Rice Dishes', preparationTime: 8 },
      { id: 'ngk-3', name: 'Eba & Vegetable Soup', description: 'Garri eba with fresh vegetable soup', price: 1000, image: sharedImages.poundedyam, category: 'Swallow', preparationTime: 10 },
      { id: 'ngk-4', name: 'Beans & Plantain', description: 'Stewed beans with fried plantain', price: 700, image: sharedImages.snacks, category: 'Local', popular: true, preparationTime: 8 },
      { id: 'ngk-5', name: 'Moi Moi', description: 'Steamed bean pudding with egg', price: 400, image: sharedImages.snacks, category: 'Snacks', preparationTime: 5 },
      { id: 'ngk-6', name: 'Water & Minerals', description: 'Bottled water or soft drink', price: 200, image: sharedImages.drinks, category: 'Drinks', preparationTime: 1 },
    ],
  },
  {
    id: 'nabis',
    name: 'Nabis',
    description: 'Cozy restaurant known for generous portions and homestyle cooking.',
    rating: 4.2,
    reviewCount: 203,
    deliveryTime: '20-30 min',
    priceRange: '₦500 - ₦3,000',
    isOpen: false,
    openHours: '8:00 AM - 7:00 PM',
    tags: ['Homestyle', 'Nigerian', 'Comfort Food'],
    emoji: '🏠',
    menu: [
      { id: 'nab-1', name: 'Native Jollof', description: 'Traditional palm oil jollof with smoked fish', price: 1500, image: sharedImages.jollof, category: 'Rice Dishes', popular: true, preparationTime: 15 },
      { id: 'nab-2', name: 'Ofada Rice & Sauce', description: 'Local ofada rice with designer sauce', price: 1800, image: sharedImages.friedrice, category: 'Rice Dishes', preparationTime: 15 },
      { id: 'nab-3', name: 'Fufu & Oha Soup', description: 'Smooth fufu with oha leaf soup', price: 1600, image: sharedImages.poundedyam, category: 'Swallow', preparationTime: 15 },
      { id: 'nab-4', name: 'Pepper Soup', description: 'Spicy goat meat pepper soup', price: 1200, image: sharedImages.poundedyam, category: 'Soups', popular: true, preparationTime: 10 },
      { id: 'nab-5', name: 'Grilled Fish', description: 'Whole grilled tilapia with pepper sauce', price: 2500, image: sharedImages.suya, category: 'Grills', preparationTime: 20 },
      { id: 'nab-6', name: 'Chapman', description: 'Classic Nigerian cocktail drink', price: 600, image: sharedImages.drinks, category: 'Drinks', preparationTime: 5 },
    ],
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    description: 'The ultimate dining destination for premium Nigerian and continental cuisine.',
    rating: 4.6,
    reviewCount: 287,
    deliveryTime: '25-35 min',
    priceRange: '₦1,000 - ₦5,000',
    isOpen: true,
    openHours: '9:00 AM - 10:00 PM',
    tags: ['Premium', 'Continental', 'Fine Dining'],
    emoji: '⭐',
    menu: [
      { id: 'ult-1', name: 'Premium Jollof Platter', description: 'Signature jollof rice with grilled chicken, plantain & coleslaw', price: 2500, image: sharedImages.jollof, category: 'Rice Dishes', popular: true, preparationTime: 18 },
      { id: 'ult-2', name: 'Stir-Fry Rice', description: 'Asian-inspired stir-fry rice with chicken and veggies', price: 2800, image: sharedImages.friedrice, category: 'Rice Dishes', preparationTime: 15 },
      { id: 'ult-3', name: 'Seafood Pasta', description: 'Creamy pasta with prawns and calamari', price: 3500, image: sharedImages.spaghetti, category: 'Pasta', popular: true, preparationTime: 18 },
      { id: 'ult-4', name: 'Mixed Grill Platter', description: 'Assorted grilled meats with pepper sauce', price: 4000, image: sharedImages.suya, category: 'Grills', preparationTime: 25 },
      { id: 'ult-5', name: 'Pounded Yam & Assorted', description: 'Fresh pounded yam with egusi and assorted meat', price: 2800, image: sharedImages.poundedyam, category: 'Swallow', preparationTime: 20 },
      { id: 'ult-6', name: 'Milkshake', description: 'Thick creamy milkshake in various flavors', price: 1500, image: sharedImages.drinks, category: 'Drinks', preparationTime: 5 },
    ],
  },
  {
    id: 'bingham-village',
    name: 'Bingham Village',
    description: 'Budget-friendly meals perfect for students. Quality food without breaking the bank.',
    rating: 4.0,
    reviewCount: 178,
    deliveryTime: '10-15 min',
    priceRange: '₦200 - ₦1,500',
    isOpen: true,
    openHours: '6:00 AM - 8:00 PM',
    tags: ['Budget', 'Quick', 'Student Favorite'],
    emoji: '🏘️',
    menu: [
      { id: 'bv-1', name: 'Economy Rice & Stew', description: 'Affordable rice with stew and one meat', price: 500, image: sharedImages.jollof, category: 'Rice Dishes', popular: true, preparationTime: 5 },
      { id: 'bv-2', name: 'Fried Rice (Small)', description: 'Small portion fried rice with chicken', price: 700, image: sharedImages.friedrice, category: 'Rice Dishes', preparationTime: 5 },
      { id: 'bv-3', name: 'Garri & Soup', description: 'Quick eba with your choice of soup', price: 600, image: sharedImages.poundedyam, category: 'Swallow', preparationTime: 5 },
      { id: 'bv-4', name: 'Bread & Egg', description: 'Toasted bread with fried eggs', price: 400, image: sharedImages.snacks, category: 'Breakfast', popular: true, preparationTime: 5 },
      { id: 'bv-5', name: 'Akara & Pap', description: 'Bean cakes with smooth pap', price: 300, image: sharedImages.snacks, category: 'Breakfast', preparationTime: 5 },
      { id: 'bv-6', name: 'Sachet Water', description: 'Pure sachet water', price: 50, image: sharedImages.drinks, category: 'Drinks', preparationTime: 1 },
    ],
  },
  {
    id: 'green-plaza',
    name: 'Green Plaza',
    description: 'Your one-stop shop for snacks, drinks, and quick bites between classes.',
    rating: 4.2,
    reviewCount: 134,
    deliveryTime: '5-15 min',
    priceRange: '₦100 - ₦2,000',
    isOpen: true,
    openHours: '7:00 AM - 9:30 PM',
    tags: ['Snacks', 'Drinks', 'Essentials'],
    emoji: '🏪',
    menu: [
      { id: 'gp-1', name: 'Meat Pie', description: 'Freshly baked meat pie', price: 500, image: sharedImages.snacks, category: 'Snacks', popular: true, preparationTime: 3 },
      { id: 'gp-2', name: 'Sausage Roll', description: 'Crispy sausage roll', price: 400, image: sharedImages.snacks, category: 'Snacks', preparationTime: 3 },
      { id: 'gp-3', name: 'Doughnut (3 pcs)', description: 'Soft sugared doughnuts', price: 500, image: sharedImages.snacks, category: 'Snacks', preparationTime: 3 },
      { id: 'gp-4', name: 'Chin Chin Pack', description: 'Crunchy fried chin chin', price: 300, image: sharedImages.snacks, category: 'Snacks', preparationTime: 2 },
      { id: 'gp-5', name: 'Soft Drinks', description: 'Coca-Cola, Fanta, Sprite, or Pepsi', price: 300, image: sharedImages.drinks, category: 'Drinks', popular: true, preparationTime: 1 },
      { id: 'gp-6', name: 'Energy Drink', description: 'Power Horse, Bullet, or Fearless', price: 500, image: sharedImages.drinks, category: 'Drinks', preparationTime: 1 },
      { id: 'gp-7', name: 'Bottled Water', description: 'Eva or Nestle pure water', price: 200, image: sharedImages.drinks, category: 'Drinks', preparationTime: 1 },
    ],
  },
];

export const foodCategories = [
  { id: 'all', name: 'All', emoji: '🍽️' },
  { id: 'rice', name: 'Rice', emoji: '🍚' },
  { id: 'swallow', name: 'Swallow', emoji: '🥘' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝' },
  { id: 'grills', name: 'Grills', emoji: '🥩' },
  { id: 'snacks', name: 'Snacks', emoji: '🥧' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤' },
  { id: 'wraps', name: 'Wraps', emoji: '🌯' },
];
