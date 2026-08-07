// ---------------------------------------------------------------------------
// Pavilion All Day Dining — menu data
// Edit prices, names and flags here. Nothing else needs to change.
// ---------------------------------------------------------------------------

export type Diet = "veg" | "nonveg";

export interface Dish {
  name: string;
  description: string;
  price: number; // placeholder prices in INR
  diet: Diet;
  popular?: boolean;
  chefPick?: boolean;
  spicy?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  blurb: string;
  items: Dish[];
}

export const restaurant = {
  name: "Amber & Oak",
  tagline: "All Day Dining",
  city: "Indore",
  address: "Amber & Oak , Vijay Nagar, Indore, Madhya Pradesh 452010",
  phone: "+91 98260 00000",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pavilion+All+Day+Dining+Indore",
  hours: [
    { day: "Breakfast Buffet", time: "7:00 AM – 10:30 AM" },
    { day: "Lunch Buffet", time: "12:30 PM – 3:30 PM" },
    { day: "Evening À la carte", time: "4:00 PM – 7:00 PM" },
    { day: "Dinner Buffet", time: "7:00 PM – 11:00 PM" },
  ],
};

export const reviews = [
  {
    quote:
      "A lovely family evening — the ambience is warm and the little ones were looked after beautifully.",
    author: "Ritika S.",
    context: "Family dinner",
  },
  {
    quote:
      "Spotless kitchen, spotless tables. Hygiene here is clearly taken seriously, which we appreciated.",
    author: "Anand P.",
    context: "Business lunch",
  },
  {
    quote: "The buffet spread is generous and the staff are unfailingly courteous.",
    author: "Meher K.",
    context: "Sunday buffet",
  },
  {
    quote: "Comfortable seating, unhurried service and a menu that has something for everyone.",
    author: "Vivek J.",
    context: "Anniversary",
  },
];

export const menu: MenuCategory[] = [
  {
    id: "soups",
    title: "Soups",
    blurb: "Slow-simmered, served piping hot with warm herbed rolls.",
    items: [
      { name: "Tomato Dhaniya Shorba", description: "Vine tomatoes, coriander root, cracked pepper.", price: 245, diet: "veg", popular: true },
      { name: "Burnt Garlic Clear Soup", description: "Delicate broth, water chestnut, spring onion.", price: 245, diet: "veg" },
      { name: "Sweet Corn Chicken", description: "Silken corn broth, shredded chicken, egg ribbons.", price: 295, diet: "nonveg" },
      { name: "Hot & Sour Vegetable", description: "Szechuan pepper, black vinegar, julienne vegetables.", price: 265, diet: "veg", spicy: true },
      { name: "Lemon Coriander Chicken", description: "Clear broth, lemongrass, fresh coriander.", price: 295, diet: "nonveg", chefPick: true },
    ],
  },
  {
    id: "starters",
    title: "Starters",
    blurb: "From the tandoor and the wok — perfect for sharing.",
    items: [
      { name: "Paneer Tikka Lasooni", description: "Cottage cheese, garlic yoghurt marinade, charred peppers.", price: 425, diet: "veg", popular: true },
      { name: "Dahi Ke Kebab", description: "Hung curd, cashew, saffron; crisp outside, molten within.", price: 395, diet: "veg", chefPick: true },
      { name: "Murgh Malai Tikka", description: "Cream cheese, green cardamom, mace.", price: 495, diet: "nonveg", popular: true },
      { name: "Tandoori Jhinga", description: "Tiger prawns, ajwain, smoked butter.", price: 795, diet: "nonveg" },
      { name: "Crispy Corn Salt & Pepper", description: "Golden corn, curry leaf, chilli flakes.", price: 345, diet: "veg", spicy: true },
      { name: "Chicken Seekh Kebab", description: "Minced chicken, mint, hand-rolled on skewers.", price: 495, diet: "nonveg" },
    ],
  },
  {
    id: "north-indian",
    title: "North Indian",
    blurb: "Signature curries in the Awadhi and Punjabi tradition.",
    items: [
      { name: "Dal Pavilion", description: "Black lentils simmered overnight, tomato, cream, butter.", price: 445, diet: "veg", popular: true, chefPick: true },
      { name: "Paneer Lababdar", description: "Silky tomato-onion gravy, kasuri methi.", price: 465, diet: "veg" },
      { name: "Subz Miloni", description: "Seasonal vegetables, cashew gravy, garam masala.", price: 425, diet: "veg" },
      { name: "Murgh Butter Masala", description: "Tandoori chicken, tomato velouté, honey butter.", price: 545, diet: "nonveg", popular: true },
      { name: "Laal Maas", description: "Slow-cooked mutton, Mathania chillies, smoked garlic.", price: 645, diet: "nonveg", spicy: true },
      { name: "Kadhai Chicken", description: "Crushed coriander seed, bell pepper, ginger juliennes.", price: 545, diet: "nonveg" },
    ],
  },
  {
    id: "chinese",
    title: "Chinese",
    blurb: "Wok-tossed to order over high flame.",
    items: [
      { name: "Chilli Paneer", description: "Dry-tossed, onion petals, green chilli.", price: 415, diet: "veg", popular: true, spicy: true },
      { name: "Vegetable Manchurian", description: "Hand-rolled dumplings, garlic-ginger gravy.", price: 395, diet: "veg" },
      { name: "Kung Pao Chicken", description: "Roasted peanuts, dried red chilli, black vinegar.", price: 525, diet: "nonveg", spicy: true },
      { name: "Fish in Hot Garlic Sauce", description: "Basa fillets, chilli-garlic glaze, scallion.", price: 595, diet: "nonveg", chefPick: true },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    blurb: "Cooked al dente, finished with imported cheese.",
    items: [
      { name: "Penne Arrabbiata", description: "San Marzano tomato, chilli, basil, pecorino.", price: 465, diet: "veg" },
      { name: "Spaghetti Aglio e Olio", description: "Garlic, olive oil, parsley, chilli flakes.", price: 445, diet: "veg", popular: true },
      { name: "Fettuccine Alfredo", description: "Cream, butter, parmesan, cracked pepper.", price: 495, diet: "veg" },
      { name: "Chicken Pesto Penne", description: "Basil pesto, grilled chicken, toasted pine nuts.", price: 575, diet: "nonveg", chefPick: true },
    ],
  },
  {
    id: "pizza",
    title: "Pizza",
    blurb: "Thin crust, stone-baked, 24-hour fermented dough.",
    items: [
      { name: "Margherita", description: "Fior di latte, tomato, fresh basil.", price: 445, diet: "veg", popular: true },
      { name: "Garden Harvest", description: "Zucchini, olives, peppers, sun-dried tomato.", price: 495, diet: "veg" },
      { name: "Tandoori Paneer Pizza", description: "Spiced paneer, onion, mint drizzle.", price: 525, diet: "veg" },
      { name: "Chicken Pepperoni", description: "House-cured pepperoni, mozzarella, oregano.", price: 595, diet: "nonveg", chefPick: true },
    ],
  },
  {
    id: "rice-noodles",
    title: "Rice & Noodles",
    blurb: "Long-grain basmati and hand-pulled noodles.",
    items: [
      { name: "Subz Dum Biryani", description: "Sealed with dough, saffron, fried onion, served with raita.", price: 495, diet: "veg", popular: true },
      { name: "Hyderabadi Murgh Biryani", description: "Kachhi style, mint, birista, mirchi ka salan.", price: 625, diet: "nonveg", popular: true, chefPick: true },
      { name: "Burnt Garlic Fried Rice", description: "Wok-tossed, spring onion, sesame oil.", price: 375, diet: "veg" },
      { name: "Hakka Noodles", description: "Julienne vegetables, soy, white pepper.", price: 375, diet: "veg" },
      { name: "Steamed Basmati Rice", description: "Long grain, fluffed with ghee.", price: 245, diet: "veg" },
    ],
  },
  {
    id: "breads",
    title: "Breads",
    blurb: "From the clay tandoor, brushed with white butter.",
    items: [
      { name: "Butter Naan", description: "Soft, blistered, generously buttered.", price: 105, diet: "veg", popular: true },
      { name: "Laccha Paratha", description: "Layered whole wheat, flaky and crisp.", price: 115, diet: "veg" },
      { name: "Garlic Naan", description: "Fresh garlic, coriander.", price: 125, diet: "veg" },
      { name: "Tandoori Roti", description: "Whole wheat, plain or buttered.", price: 85, diet: "veg" },
      { name: "Pavilion Bread Basket", description: "Chef's selection of four breads.", price: 345, diet: "veg", chefPick: true },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    blurb: "Made in-house each morning by our pastry team.",
    items: [
      { name: "Gulab Jamun", description: "Warm khoya dumplings, cardamom syrup.", price: 245, diet: "veg", popular: true },
      { name: "Shahi Tukda", description: "Saffron rabri, toasted brioche, pistachio.", price: 295, diet: "veg", chefPick: true },
      { name: "Baked Cheesecake", description: "Vanilla bean, berry compote.", price: 325, diet: "veg" },
      { name: "Chocolate Fondant", description: "Molten centre, vanilla ice cream.", price: 345, diet: "veg", popular: true },
    ],
  },
  {
    id: "beverages",
    title: "Beverages",
    blurb: "Fresh presses, classic brews and cooling coolers.",
    items: [
      { name: "Masala Chai", description: "Assam leaf, ginger, green cardamom.", price: 165, diet: "veg", popular: true },
      { name: "Filter Coffee", description: "South Indian blend, frothed milk.", price: 185, diet: "veg" },
      { name: "Fresh Lime Soda", description: "Sweet, salted or mixed.", price: 175, diet: "veg" },
      { name: "Salted Lassi", description: "Churned curd, roasted cumin.", price: 195, diet: "veg" },
      { name: "Cold Coffee with Ice Cream", description: "Double shot, vanilla scoop.", price: 265, diet: "veg", chefPick: true },
    ],
  },
];

export const gallery = [
  { label: "The Dining Room", note: "Garden-facing banquettes" },
  { label: "Live Buffet Counter", note: "Chef-attended stations" },
  { label: "Tandoor Kitchen", note: "Clay ovens, open view" },
  { label: "Family Corner", note: "Roomy tables for groups" },
  { label: "Pastry Display", note: "Baked every morning" },
  { label: "Private Dining", note: "Seats up to 20" },
];
