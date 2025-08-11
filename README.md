# 🍰 Mano Bakers - Professional Bakery Website

A beautiful, responsive React website for Mano Bakers with complete WhatsApp ordering system and category-based item codes.

![Mano Bakers Preview](https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=400&fit=crop)

## ✨ Features

- **🎨 Modern Design**: Classic black & white theme with warm accent colors
- **📱 Mobile-First**: Fully responsive design for all devices
- **🛒 Smart Cart System**: Add items, manage quantities, live totals
- **📱 WhatsApp Integration**: Direct order messaging with formatted details
- **🏷️ Item Code System**: Category-based codes (POP001, CAK001, etc.)
- **⚡ Easy Management**: Single-file product updates
- **🎭 Interactive UI**: Smooth animations and hover effects
- **🔍 SEO Optimized**: Proper meta tags and structured data

## 🏗️ Technology Stack

- **Frontend**: React 18 + Custom CSS
- **Icons**: Lucide React
- **Hosting**: GitHub Pages
- **Domain**: Namecheap (manobakers.me)
- **WhatsApp**: Business Integration

## 📦 Product Categories & Codes

| Category | Code | Examples |
|----------|------|----------|
| Popular Items | POP | POP001, POP002, POP003 |
| Cakes | CAK | CAK001, CAK002, CAK003 |
| Gateaux | GAT | GAT001, GAT002 |
| Design Cakes | DSN | DSN001, DSN002 |
| Savory | SAV | SAV001, SAV002 |
| Sweet | SWT | SWT001, SWT002 |

## 🚀 Quick Start

### Prerequisites

```bash
# Install Node.js (LTS version)
# Download from: https://nodejs.org/

# Verify installation
node --version
npm --version
```

### 1. Create Project

```bash
# Create React app
npx create-react-app mano-bakers
cd mano-bakers

# Install dependencies
npm install lucide-react gh-pages
```

### 2. Replace Files

Copy all the provided files into your project according to the folder structure shown above.

### 3. Test Locally

```bash
# Start development server
npm start

# Open http://localhost:3000
# Test all functionality before deploying
```

## 🌐 Deployment Guide

### Step 1: GitHub Repository

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: Mano Bakers website"

# Create repository on GitHub
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/mano-bakers.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to GitHub Pages

```bash
# Deploy the site
npm run deploy

# Wait 2-5 minutes for deployment
# Test at: https://YOUR_USERNAME.github.io/mano-bakers
```

### Step 3: Configure Custom Domain

#### Configure Namecheap DNS

1. Login to **Namecheap** → **Domain List** → **Manage manobakers.me**
2. Go to **Advanced DNS** tab
3. **Delete existing records**
4. **Add these A records**:

```
Type: A Record, Host: @, Value: 185.199.108.153, TTL: Automatic
Type: A Record, Host: @, Value: 185.199.109.153, TTL: Automatic
Type: A Record, Host: @, Value: 185.199.110.153, TTL: Automatic
Type: A Record, Host: @, Value: 185.199.111.153, TTL: Automatic
Type: CNAME Record, Host: www, Value: manobakers.me, TTL: Automatic
```

5. **Save changes** and wait 24-48 hours for DNS propagation

## 📱 WhatsApp Order System

### Order Message Format

When customers place orders, they receive this formatted message:

```
🛒 NEW ORDER - Mano Bakers

📅 Date: 11/08/2025
🕐 Time: 14:30

📋 Order Details:
━━━━━━━━━━━━━━━━━━━━

Item 1:
📦 Code: POP001
🍰 Item: Chocolate Fudge Cake
📊 Qty: 2
💰 Price: Rs. 1,500 each
💵 Subtotal: Rs. 3,000
━━━━━━━━━━━━━━━━━━━━

💰 TOTAL: Rs. 3,000
📦 Total Items: 2

📞 Please confirm this order and let me know the delivery details.

Thank you for choosing Mano Bakers! 🙏
```

### WhatsApp Integration

- **Business Link**: `https://wa.me/message/5U2VP7MILEM3P1?src=qr`
- **Cart Orders**: Detailed formatted messages
- **Contact Buttons**: General inquiries
- **Sticky Button**: Always accessible

## 🛠️ Product Management

### Adding New Products

Edit `src/data/bakeryData.js`:

```javascript
// Add to existing category
{
  id: 15,
  code: 'CAK004', // Category prefix + sequential number
  name: 'Lemon Drizzle Cake',
  price: 1800,
  image: 'https://your-image-url.com/image.jpg',
  description: 'Moist lemon sponge with tangy glaze',
  tags: ['lemon', 'citrus', 'popular'],
  available: true
}
```

### Adding New Categories

```javascript
// Add to categories array
{
  id: 'beverages',
  name: 'Beverages',
  description: 'Hot and cold drinks',
  codePrefix: 'BEV',
  items: [
    {
      id: 15,
      code: 'BEV001',
      name: 'Artisan Coffee',
      price: 300,
      image: 'https://coffee-image.jpg',
      description: 'Premium blend coffee',
      tags: ['coffee', 'hot'],
      available: true
    }
  ]
}
```

### Updating Business Information

```javascript
businessInfo: {
  name: "Mano Bakers",
  whatsappLink: "https://wa.me/message/5U2VP7MILEM3P1?src=qr",
  address: "Your Address Here",
  email: "your@email.com",
  hours: {
    weekdays: "7:00 AM - 8:00 PM",
    weekends: "8:00 AM - 6:00 PM"
  }
}
```

## 🔄 Development Workflow

### Making Changes

```bash
# Edit files locally
npm start  # Test changes at localhost:3000

# Deploy updates
git add .
git commit -m "Describe your changes"
git push
npm run deploy
```

## 🧪 Testing Checklist

### Before Deployment

- [ ] All pages load correctly
- [ ] Cart functionality works
- [ ] Item codes display properly
- [ ] WhatsApp integration functional
- [ ] Mobile responsive design
- [ ] Images load properly

### After Deployment

- [ ] GitHub Pages site accessible
- [ ] Custom domain works (after DNS propagation)
- [ ] SSL certificate active (https)
- [ ] WhatsApp orders work from live site
- [ ] All features work on mobile

## 🎯 Customer Journey

1. **Visit** → manobakers.me
2. **Browse** → Menu with item codes
3. **Add to Cart** → See codes and totals
4. **Review Order** → Complete cart details
5. **Send WhatsApp** → Formatted order message
6. **Receive** → Professional order details

## 📞 Support & Maintenance

### Site URLs

- **Primary**: https://manobakers.me
- **WWW**: https://www.manobakers.me

### Maintenance Tasks

- **Weekly**: Check for broken images
- **Monthly**: Update menu items as needed
- **Quarterly**: Review and update business information

## 🏆 Project Success Metrics

✅ **Professional Design** - Modern bakery aesthetics  
✅ **WhatsApp Orders** - Direct customer ordering  
✅ **Item Codes** - Easy inventory management  
✅ **Mobile Responsive** - Works on all devices  
✅ **Easy Updates** - Single-file product management  
✅ **SEO Optimized** - Search engine friendly  
✅ **Fast Performance** - Quick loading times  
✅ **Domain Ready** - Professional web presence  

## 🎉 Congratulations!

Your professional bakery website is now ready to:
- Take orders via WhatsApp with detailed item codes
- Showcase your products professionally
- Provide excellent mobile experience
- Be easily maintained and updated

**Live at: https://manobakers.me** 🚀

---

*Made with ❤️ for Mano Bakers*