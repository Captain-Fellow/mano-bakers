// src/data/bakeryData.js
// 🎯 EASY PRODUCT MANAGEMENT - Edit this file to add/remove products!

export const BAKERY_DATA = {
  // 🏪 Business Information
  businessInfo: {
    name: "Mano Bakers",
    whatsappLink: "https://wa.me/message/5U2VP7MILEM3P1?src=qr",
    address: "123 Baker Street, Colombo 07, Sri Lanka",
    email: "hello@manobakers.me",
    hours: {
      weekdays: "7:00 AM - 8:00 PM",
      weekends: "8:00 AM - 6:00 PM"
    }
  },

  // 📱 WhatsApp Settings
  whatsapp: {
    link: "https://wa.me/message/5U2VP7MILEM3P1?src=qr",
    defaultMessage: "Hi Mano Bakers, I'd like to place an order. Can you help me?"
  },

  // 🍰 Product Categories with Item Codes
  categories: [
    {
      id: 'popular',
      name: 'Popular Items',
      description: 'Our customer favorites',
      codePrefix: 'POP',
      items: [
        {
          id: 1,
          code: 'POP001',
          name: 'Chocolate Fudge Cake',
          price: 1500,
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
          description: 'Rich, moist chocolate cake with creamy fudge frosting',
          tags: ['chocolate', 'popular', 'birthday'],
          available: true
        },
        {
          id: 2,
          code: 'POP002',
          name: 'Classic Cheesecake',
          price: 1200,
          image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
          description: 'Creamy New York style cheesecake with berry topping',
          tags: ['cheesecake', 'berries', 'classic'],
          available: true
        },
        {
          id: 3,
          code: 'POP003',
          name: 'Red Velvet Cupcakes',
          price: 250,
          image: 'https://images.unsplash.com/photo-1587736421142-9ac06e8f9e61?w=400&h=300&fit=crop',
          description: 'Soft red velvet cupcakes with cream cheese frosting',
          tags: ['cupcakes', 'red velvet', 'individual'],
          available: true
        }
      ]
    },
    {
      id: 'cakes',
      name: 'Cakes',
      description: 'Handcrafted cakes for every occasion',
      codePrefix: 'CAK',
      items: [
        {
          id: 4,
          code: 'CAK001',
          name: 'Vanilla Birthday Cake',
          price: 1800,
          image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop',
          description: 'Classic vanilla sponge with buttercream frosting',
          tags: ['vanilla', 'birthday', 'classic'],
          available: true
        },
        {
          id: 5,
          code: 'CAK002',
          name: 'Strawberry Cream Cake',
          price: 2000,
          image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
          description: 'Fresh strawberries with whipped cream layers',
          tags: ['strawberry', 'fresh fruit', 'cream'],
          available: true
        },
        {
          id: 6,
          code: 'CAK003',
          name: 'Black Forest Cake',
          price: 2200,
          image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
          description: 'Chocolate sponge with cherries and cream',
          tags: ['chocolate', 'cherry', 'traditional'],
          available: true
        }
      ]
    },
    {
      id: 'gateaux',
      name: 'Gateaux',
      description: 'Elegant French-style layered cakes',
      codePrefix: 'GAT',
      items: [
        {
          id: 7,
          code: 'GAT001',
          name: 'Opera Gateau',
          price: 2800,
          image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
          description: 'Elegant French layered cake with chocolate glaze',
          tags: ['french', 'elegant', 'chocolate'],
          available: true
        },
        {
          id: 8,
          code: 'GAT002',
          name: 'Tiramisu Gateau',
          price: 2500,
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
          description: 'Coffee-soaked layers with mascarpone cream',
          tags: ['italian', 'coffee', 'mascarpone'],
          available: true
        }
      ]
    },
    {
      id: 'design',
      name: 'Design Cakes',
      description: 'Custom designed cakes for special occasions',
      codePrefix: 'DSN',
      items: [
        {
          id: 9,
          code: 'DSN001',
          name: 'Custom Wedding Cake',
          price: 5000,
          image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop',
          description: 'Elegant multi-tier wedding cake with custom design',
          tags: ['wedding', 'custom', 'multi-tier'],
          available: true,
          customizable: true
        },
        {
          id: 10,
          code: 'DSN002',
          name: 'Kids Birthday Cake',
          price: 3000,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
          description: 'Colorful themed cake perfect for children\'s parties',
          tags: ['kids', 'birthday', 'colorful', 'themed'],
          available: true,
          customizable: true
        }
      ]
    },
    {
      id: 'savory',
      name: 'Savory',
      description: 'Delicious savory baked goods',
      codePrefix: 'SAV',
      items: [
        {
          id: 11,
          code: 'SAV001',
          name: 'Chicken Pastry',
          price: 180,
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
          description: 'Flaky pastry filled with seasoned chicken',
          tags: ['pastry', 'chicken', 'savory'],
          available: true
        },
        {
          id: 12,
          code: 'SAV002',
          name: 'Vegetable Quiche',
          price: 220,
          image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400&h=300&fit=crop',
          description: 'Rich quiche with fresh seasonal vegetables',
          tags: ['quiche', 'vegetarian', 'vegetables'],
          available: true
        }
      ]
    },
    {
      id: 'sweet',
      name: 'Sweet',
      description: 'Individual sweet treats and pastries',
      codePrefix: 'SWT',
      items: [
        {
          id: 13,
          code: 'SWT001',
          name: 'Chocolate Éclair',
          price: 150,
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
          description: 'Choux pastry filled with cream and chocolate glaze',
          tags: ['eclair', 'chocolate', 'pastry'],
          available: true
        },
        {
          id: 14,
          code: 'SWT002',
          name: 'Fruit Tart',
          price: 200,
          image: 'https://images.unsplash.com/photo-1464347744102-11db6282f854?w=400&h=300&fit=crop',
          description: 'Crispy tart shell with pastry cream and fresh fruits',
          tags: ['tart', 'fruit', 'pastry cream'],
          available: true
        }
      ]
    }
  ]
};

/*
🎯 HOW TO ADD A NEW PRODUCT:
1. Find the category you want to add to
2. Add a new object to the 'items' array:

{
  id: 15, // Use next available number
  code: 'CAK004', // Use category prefix + sequential number
  name: 'Your New Product Name',
  price: 2500, // Price in Rs.
  image: 'https://your-image-url.com/image.jpg',
  description: 'Detailed product description',
  tags: ['tag1', 'tag2', 'tag3'],
  available: true,
  customizable: false // Optional: for custom products
}

🎯 CATEGORY CODE PREFIXES:
POP = Popular Items
CAK = Cakes
GAT = Gateaux
DSN = Design Cakes  
SAV = Savory
SWT = Sweet

🎯 HOW TO ADD A NEW CATEGORY:
Add a new object to the 'categories' array:

{
  id: 'beverages',
  name: 'Beverages',
  description: 'Hot and cold drinks',
  codePrefix: 'BEV',
  items: [
    // Add beverage items here
  ]
}

🎯 HOW TO UPDATE BUSINESS INFO:
Simply modify the 'businessInfo' and 'whatsapp' objects above
*/

export default BAKERY_DATA;