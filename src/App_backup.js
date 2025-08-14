import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone, MapPin, Clock, ChefHat } from 'lucide-react';
import BAKERY_DATA from './data/bakeryData';
import './App.css';

const ManoBakersApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('popular');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // New state for delivery/pickup options
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [pickupTime, setPickupTime] = useState('now'); // 'now' or 'later'
  const [pickupDateTime, setPickupDateTime] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('manoBakersCart');
    const savedOrderType = localStorage.getItem('manoBakersOrderType');
    const savedDeliveryAddress = localStorage.getItem('manoBakersDeliveryAddress');
    const savedContactNumber = localStorage.getItem('manoBakersContactNumber');
    const savedPickupTime = localStorage.getItem('manoBakersPickupTime');
    const savedPickupDateTime = localStorage.getItem('manoBakersPickupDateTime');
    const savedSpecialNotes = localStorage.getItem('manoBakersSpecialNotes');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    
    if (savedOrderType) setOrderType(savedOrderType);
    if (savedDeliveryAddress) setDeliveryAddress(savedDeliveryAddress);
    if (savedContactNumber) setContactNumber(savedContactNumber);
    if (savedPickupTime) setPickupTime(savedPickupTime);
    if (savedPickupDateTime) setPickupDateTime(savedPickupDateTime);
    if (savedSpecialNotes) setSpecialNotes(savedSpecialNotes);
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('manoBakersCart', JSON.stringify(cart));
  }, [cart]);

  // Save order details to localStorage
  useEffect(() => {
    localStorage.setItem('manoBakersOrderType', orderType);
  }, [orderType]);

  useEffect(() => {
    localStorage.setItem('manoBakersDeliveryAddress', deliveryAddress);
  }, [deliveryAddress]);

  useEffect(() => {
    localStorage.setItem('manoBakersContactNumber', contactNumber);
  }, [contactNumber]);

  useEffect(() => {
    localStorage.setItem('manoBakersPickupTime', pickupTime);
  }, [pickupTime]);

  useEffect(() => {
    localStorage.setItem('manoBakersPickupDateTime', pickupDateTime);
  }, [pickupDateTime]);

  useEffect(() => {
    localStorage.setItem('manoBakersSpecialNotes', specialNotes);
  }, [specialNotes]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Validate contact number (10 digits)
  const validateContactNumber = (number) => {
    const cleaned = number.replace(/\D/g, ''); // Remove non-digits
    if (cleaned.length !== 10) {
      setContactNumberError('*Type your mobile number correctly with 10 digits');
      return false;
    }
    setContactNumberError('');
    return true;
  };

  // Handle contact number input
  const handleContactNumberChange = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Only allow digits
    if (cleaned.length <= 10) {
      setContactNumber(cleaned);
      if (cleaned.length === 10) {
        setContactNumberError('');
      } else if (cleaned.length > 0) {
        setContactNumberError('*Type your mobile number correctly with 10 digits');
      }
    }
  };

  // Clear cart after successful order
  const clearCartAfterOrder = () => {
    setCart([]);
    setDeliveryAddress('');
    setContactNumber('');
    setContactNumberError('');
    setPickupDateTime('');
    setSpecialNotes('');
    setOrderType('delivery');
    setPickupTime('now');
    
    // Clear localStorage
    localStorage.removeItem('manoBakersCart');
    localStorage.removeItem('manoBakersDeliveryAddress');
    localStorage.removeItem('manoBakersContactNumber');
    localStorage.removeItem('manoBakersPickupDateTime');
    localStorage.removeItem('manoBakersSpecialNotes');
    localStorage.removeItem('manoBakersOrderType');
    localStorage.removeItem('manoBakersPickupTime');
  };

  // Generate a unique order number based on date, time and client info
  const generateOrderNumber = () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0,10).replace(/-/g, '');
    const timeStr = now.getHours().toString().padStart(2, '0') + 
                    now.getMinutes().toString().padStart(2, '0');
    // Create a hash from timestamp to simulate IP-based identifier
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `MB-${dateStr}-${timeStr}-${randomPart}`;
  };

  // 🛒 Generate WhatsApp Order Message
  const generateOrderMessage = () => {
    if (cart.length === 0) return '';

    const orderDate = new Date().toLocaleDateString('en-GB');
    const orderTime = new Date().toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const orderNumber = generateOrderNumber();

    let message = `🛒 *NEW ORDER - Mano Bakers*\n\n`;
    message += `📅 Date: ${orderDate}\n`;
    message += `🕐 Time: ${orderTime}\n`;
    message += `🔢 Order #: ${orderNumber}\n\n`;
    
    // Order Type Information
    message += `📋 *Order Type:* ${orderType === 'delivery' ? 'Delivery' : 'Pickup'}\n`;
    
    if (orderType === 'delivery') {
      message += `📍 *Delivery Address:* ${deliveryAddress || 'Not provided'}\n`;
      message += `📞 *Contact Number:* ${contactNumber || 'Not provided'}\n`;
    } else {
      message += `⏰ *Pickup Time:* ${pickupTime === 'now' ? 'Now' : `Later - ${pickupDateTime || 'Not specified'}`}\n`;
    }
    
    if (specialNotes.trim()) {
      message += `📝 *Special Notes:* ${specialNotes}\n`;
    }
    
    message += `\n📋 *Order Details:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      message += `\n*Item ${index + 1}:*\n`;
      message += `📦 Code: *${item.code}*\n`;
      message += `🍰 Item: ${item.name}\n`;
      message += `📊 Qty: ${item.quantity}\n`;
      message += `💰 Price: Rs. ${item.price.toLocaleString()} each\n`;
      message += `💵 Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
      message += `━━━━━━━━━━━━━━━━━━━━\n`;
    });

    message += `\n💰 *TOTAL: Rs. ${getTotalPrice().toLocaleString()}*\n`;
    message += `📦 *Total Items: ${getTotalItems()}*\n\n`;
    
    if (orderType === 'delivery') {
      message += `💳 Please send us the payment receipt for Rs. ${getTotalPrice().toLocaleString()} to our WhatsApp.\n\n`;
    }
    
    message += `📞 Please confirm this order and let me know if you need any changes.\n\n`;
    message += `Thank you for choosing Mano Bakers! 🙏`;

    return message;
  };

  // 📱 Send Order via WhatsApp
  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) {
      alert('Your cart is empty! Please add items before placing an order.');
      return;
    }

    // Validation for delivery orders
    if (orderType === 'delivery') {
      if (!deliveryAddress.trim()) {
        alert('Please enter your delivery address.');
        return;
      }
      if (!contactNumber.trim()) {
        alert('Please enter your contact number.');
        return;
      }
      if (!validateContactNumber(contactNumber)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    // Validation for pickup orders
    if (orderType === 'pickup' && pickupTime === 'later' && !pickupDateTime) {
      alert('Please select your preferred pickup date and time.');
      return;
    }

    const orderMessage = generateOrderMessage();
    const encodedMessage = encodeURIComponent(orderMessage);
    
    // Use direct WhatsApp API with phone number
    const whatsappURL = `https://wa.me/${BAKERY_DATA.whatsapp.phone}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    // Clear cart and form after successful order
    setTimeout(() => {
      clearCartAfterOrder();
      alert('Order sent successfully! Your cart has been cleared.');
    }, 1000);
  };

  // 📱 General WhatsApp Contact
  const openWhatsApp = () => {
    window.open(`https://wa.me/${BAKERY_DATA.whatsapp.phone}`, '_blank');
  };

  const Header = () => (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black-95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center space-x-2 hover-opacity-80 transition-opacity"
          >
            <ChefHat className="text-amber-300 w-8 h-8" />
            <h1 className="text-2xl md-text-3xl font-serif text-white font-bold tracking-wide">
              Mano Bakers
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md-flex items-center space-x-8">
            <button
              onClick={() => setCurrentView('home')}
              className={`text-white hover-text-amber-300 transition-colors font-medium ${
                currentView === 'home' ? 'text-amber-300' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className={`text-white hover-text-amber-300 transition-colors font-medium ${
                currentView === 'about' ? 'text-amber-300' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => setCurrentView('menu')}
              className={`text-white hover-text-amber-300 transition-colors font-medium ${
                currentView === 'menu' ? 'text-amber-300' : ''
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className={`text-white hover-text-amber-300 transition-colors font-medium ${
                currentView === 'contact' ? 'text-amber-300' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('cart')}
              className="relative text-white hover-text-amber-300 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute negative-top-2 negative-right-2 bg-rose-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md-hidden text-white hover-text-amber-300 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md-hidden mt-4 py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setCurrentView('home');
                  setMobileMenuOpen(false);
                }}
                className="text-white hover-text-amber-300 transition-colors text-left font-medium"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentView('about');
                  setMobileMenuOpen(false);
                }}
                className="text-white hover-text-amber-300 transition-colors text-left font-medium"
              >
                About
              </button>
              <button
                onClick={() => {
                  setCurrentView('menu');
                  setMobileMenuOpen(false);
                }}
                className="text-white hover-text-amber-300 transition-colors text-left font-medium"
              >
                Menu
              </button>
              <button
                onClick={() => {
                  setCurrentView('contact');
                  setMobileMenuOpen(false);
                }}
                className="text-white hover-text-amber-300 transition-colors text-left font-medium"
              >
                Contact
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black-70"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md-text-7xl font-serif mb-6 text-white leading-tight">
            Artisan Baked
            <span className="text-amber-300 block">Delights</span>
          </h2>
          <p className="text-xl md-text-2xl text-gray-200 mb-8 leading-relaxed">
            Where tradition meets innovation in every bite
          </p>
          <button
            onClick={() => setCurrentView('menu')}
            className="bg-gradient-to-r from-amber-400 to-orange-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover-scale-105 transition-all duration-300 shadow-lg hover-shadow-xl"
          >
            View Our Menu
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-serif text-center mb-16 text-white">Why Choose Mano Bakers?</h3>
          <div className="grid md-grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover-scale-110 transition-transform duration-300">
                <ChefHat className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-white">Artisan Quality</h4>
              <p className="text-gray-300 leading-relaxed">
                Handcrafted with premium ingredients and traditional techniques passed down through generations.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-rose-400 to-pink-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover-scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-white">Fresh Daily</h4>
              <p className="text-gray-300 leading-relaxed">
                Baked fresh every morning to ensure the highest quality and taste in every product.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-400 to-indigo-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover-scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-white">Local Favorite</h4>
              <p className="text-gray-300 leading-relaxed">
                Proudly serving our community with love, passion, and the finest baked goods.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const MenuPage = () => (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-serif text-center mb-12 text-white">Our Delicious Menu</h2>
        
        {/* Category Navigation - Made Scrollable for Mobile */}
        <div className="category-scroll-container mb-12">
          <div className="category-scroll-wrapper">
            {BAKERY_DATA.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-button px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black shadow-lg'
                    : 'bg-gray-800 text-white hover-bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items - Responsive Grid */}
        <div className="grid grid-cols-1 sm-grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-6">
          {BAKERY_DATA.categories
            .find(cat => cat.id === activeCategory)
            ?.items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover-shadow-2xl hover-scale-105 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover-scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-black-80 text-amber-300 px-2 py-1 rounded text-xs font-mono">
                    {item.code}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black-50 to-transparent opacity-0 group-hover-opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-300">Rs. {item.price.toLocaleString()}</span>
                  <button
                    onClick={() => {
                      addToCart(item);
                      // Add animation class to cart button
                      document.getElementById('floating-cart-button')?.classList.add('cart-pulse');
                      // Remove animation class after animation completes
                      setTimeout(() => {
                        document.getElementById('floating-cart-button')?.classList.remove('cart-pulse');
                      }, 1000);
                    }}
                    className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-4 py-2 rounded-full font-medium hover-scale-105 transition-all duration-300 shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-serif text-center mb-12 text-white">Your Cart</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <p className="text-xl text-gray-400 mb-8">Your cart is empty</p>
            <button
              onClick={() => setCurrentView('menu')}
              className="bg-gradient-to-r from-amber-400 to-orange-400 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-2xl p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                          <p className="text-amber-300 font-mono text-sm bg-gray-800 px-2 py-1 rounded inline-block mt-1">
                            Code: {item.code}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover-text-red-300 font-medium transition-colors ml-4"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <p className="text-amber-300 font-bold">Rs. {item.price.toLocaleString()}</p>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-700 hover-bg-gray-600 rounded-full flex items-center justify-center text-white font-bold transition-colors"
                            >
                              -
                            </button>
                            <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-700 hover-bg-gray-600 rounded-full flex items-center justify-center text-white font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <p className="text-white font-bold">
                          Subtotal: Rs. {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Type Selection */}
            <div className="bg-gray-900 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Order Type</h3>
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    orderType === 'delivery'
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black'
                      : 'bg-gray-800 text-white hover-bg-gray-700'
                  }`}
                >
                  🚚 Delivery
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    orderType === 'pickup'
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black'
                      : 'bg-gray-800 text-white hover-bg-gray-700'
                  }`}
                >
                  🏪 Pickup
                </button>
              </div>

              {/* Delivery Options */}
              {orderType === 'delivery' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter your full delivery address"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => handleContactNumberChange(e.target.value)}
                      placeholder="Enter your 10-digit mobile number"
                      maxLength="10"
                      className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
                        contactNumberError 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-gray-700 focus:border-amber-400'
                      }`}
                    />
                    {contactNumberError && (
                      <p className="text-red-400 text-sm mt-1">{contactNumberError}</p>
                    )}
                  </div>
                  <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                    <p className="text-green-300 text-sm">
                      💳 Please send us the payment receipt for Rs. {getTotalPrice().toLocaleString()} to our WhatsApp after placing the order.
                    </p>
                  </div>
                </div>
              )}

              {/* Pickup Options */}
              {orderType === 'pickup' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Pickup Time
                    </label>
                    <div className="flex space-x-4 mb-4">
                      <button
                        onClick={() => setPickupTime('now')}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                          pickupTime === 'now'
                            ? 'bg-gradient-to-r from-green-400 to-green-500 text-black'
                            : 'bg-gray-800 text-white hover-bg-gray-700'
                        }`}
                      >
                        Pickup Now
                      </button>
                      <button
                        onClick={() => setPickupTime('later')}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                          pickupTime === 'later'
                            ? 'bg-gradient-to-r from-green-400 to-green-500 text-black'
                            : 'bg-gray-800 text-white hover-bg-gray-700'
                        }`}
                      >
                        Pickup Later
                      </button>
                    </div>
                    
                    {pickupTime === 'later' && (
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Preferred Pickup Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          value={pickupDateTime}
                          onChange={(e) => setPickupDateTime(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Special Notes */}
            <div className="bg-gray-900 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Special Notes</h3>
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Any special instructions or requirements? (Optional)"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none resize-none"
                rows={3}
              />
            </div>
            
            {/* Order Summary */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-white">Total Items:</span>
                <span className="text-xl font-bold text-amber-300">{getTotalItems()}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-semibold text-white">Total Amount:</span>
                <span className="text-3xl font-bold text-amber-300">Rs. {getTotalPrice().toLocaleString()}</span>
              </div>
              <button
                onClick={sendOrderToWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Phone className="w-6 h-6" />
                <span>Send Order via WhatsApp</span>
              </button>
              <p className="text-gray-400 text-sm text-center mt-3">
                Your order will be sent with all details including item codes, quantities, and {orderType} information
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-center mb-12 text-white">About Mano Bakers</h2>
          
          <div className="grid md-grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                alt="Our bakery"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-amber-300">Our Story</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Founded with a passion for creating exceptional baked goods, Mano Bakers has been serving 
                the community with love and dedication. Our journey began with a simple mission: to bring 
                joy through the art of baking.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Using only the finest ingredients and time-honored techniques, we craft each item with 
                meticulous attention to detail. From our signature cakes to artisanal pastries, every 
                product reflects our commitment to quality and taste.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-8 text-amber-300">Our Values</h3>
            <div className="grid md-grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-2xl p-6">
                <h4 className="text-xl font-semibold mb-4 text-white">Quality</h4>
                <p className="text-gray-300">We never compromise on the quality of our ingredients or our baking process.</p>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6">
                <h4 className="text-xl font-semibold mb-4 text-white">Tradition</h4>
                <p className="text-gray-300">Our recipes honor traditional baking methods while embracing modern innovation.</p>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6">
                <h4 className="text-xl font-semibold mb-4 text-white">Community</h4>
                <p className="text-gray-300">We're proud to be part of our local community and serve our neighbors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-center mb-12 text-white">Contact Us</h2>
          
          <div className="grid md-grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-amber-300">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-amber-300 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Address</h4>
                    <p className="text-gray-300">{BAKERY_DATA.businessInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-amber-300 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-gray-300">+{BAKERY_DATA.whatsapp.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-amber-300 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Hours</h4>
                    <p className="text-gray-300">Weekdays: {BAKERY_DATA.businessInfo.hours.weekdays}</p>
                    <p className="text-gray-300">Weekends: {BAKERY_DATA.businessInfo.hours.weekends}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={openWhatsApp}
                className="mt-8 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Message us on WhatsApp</span>
              </button>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-amber-300">Visit Our Store</h3>
              <div className="bg-gray-900 rounded-2xl p-6">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                  alt="Our bakery location"
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <p className="text-gray-300 leading-relaxed">
                  Visit our cozy bakery to experience the aroma of freshly baked goods and 
                  see our skilled bakers at work. We're always happy to help you choose 
                  the perfect treats for any occasion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FloatingCartButton = () => (
    <div className="fixed-buttons-container">
      {/* WhatsApp Contact Button */}
      <button
        onClick={openWhatsApp}
        className="fixed-button whatsapp-button"
      >
        <Phone className="w-6 h-6" />
        <span className="button-tooltip">
          Contact Us
        </span>
      </button>
      
      {/* Cart Button */}
      <button
        id="floating-cart-button"
        onClick={() => setCurrentView('cart')}
        className="fixed-button cart-button"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {getTotalItems() > 0 && (
            <span className="cart-count">
              {getTotalItems()}
            </span>
          )}
        </div>
        <span className="button-tooltip">
          View Cart {getTotalItems() > 0 ? `(${getTotalItems()} items)` : ''}
        </span>
      </button>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'cart':
        return <CartPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      {renderCurrentView()}
      <FloatingCartButton />
    </div>
  );
};

export default ManoBakersApp;
