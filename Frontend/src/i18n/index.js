import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Auth
      signup: 'Sign Up', login: 'Login', logout: 'Logout',
      name: 'Full Name', email: 'Email', password: 'Password', language: 'Language',
      farmer: 'Farmer', customer: 'Customer',

      // Nav
      home: 'Home', marketplace: 'Marketplace', livePrices: 'Live Prices',
      forFarmers: 'For Farmers', about: 'About', farmerDashboard: 'Farmer Dashboard',

      // Common
      welcome: 'Welcome to AgriConnect', tagline: 'Connecting Farmers & Customers',
      search: 'Search', searchPlaceholder: 'Search crops, farmers...',
      loading: 'Loading...', save: 'Save', cancel: 'Cancel', submit: 'Submit',
      edit: 'Edit', delete: 'Delete', back: 'Back', next: 'Next', close: 'Close',
      viewAll: 'View All', seeMore: 'See More', backToHome: 'Back to Home',
      noResults: 'No results found',

      // Products
      products: 'Products', addProduct: 'Add Product', price: 'Price',
      quantity: 'Quantity', quality: 'Quality', category: 'Category',
      description: 'Description', stock: 'Stock', unit: 'Unit',
      addToCart: 'Add to Cart', buyNow: 'Buy Now', outOfStock: 'Out of Stock',
      inStock: 'In Stock', productDetails: 'Product Details',

      // Cart
      cart: 'Cart', myCart: 'My Cart', emptyCart: 'Your cart is empty',
      total: 'Total', subtotal: 'Subtotal', checkout: 'Checkout',
      removeItem: 'Remove Item', continueShopping: 'Continue Shopping',

      // Orders
      orders: 'Orders', myOrders: 'My Orders', orderStatus: 'Order Status',
      orderDate: 'Order Date', orderTotal: 'Order Total',
      pending: 'Pending', delivered: 'Delivered', cancelled: 'Cancelled',
      processing: 'Processing', shipped: 'Shipped',

      // Wishlist
      wishlist: 'Wishlist', myWishlist: 'My Wishlist',
      emptyWishlist: 'Your wishlist is empty', addToWishlist: 'Add to Wishlist',
      removeFromWishlist: 'Remove from Wishlist',

      // Messages
      messages: 'Messages', sendMessage: 'Send Message',
      typeMessage: 'Type your message...', noMessages: 'No messages yet',

      // Chatbot
      chatbot: 'AgriBot Assistant', askQuestion: 'Ask a question...',
      send: 'Send', chatbotWelcome: 'Hello! I am AgriBot 🌱 How can I help you today?',

      // Profile / Account
      profile: 'Profile', myAccount: 'My Account', settings: 'Settings',
      updateProfile: 'Update Profile', changePassword: 'Change Password',
      mobile: 'Mobile Number', address: 'Address', photo: 'Photo',

      // Marketplace
      filter: 'Filter', sort: 'Sort', allCategories: 'All Categories',
      priceRange: 'Price Range', nearMe: 'Near Me',
      vegetables: 'Vegetables', fruits: 'Fruits', grains: 'Grains',
      dairy: 'Dairy', organic: 'Organic',

      // Live Prices
      livePriceTitle: 'Live Market Prices', todayPrices: "Today's Prices",
      commodity: 'Commodity', marketPrice: 'Market Price', change: 'Change',
      lastUpdated: 'Last Updated',

      // For Farmers
      forFarmersTitle: 'For Farmers', listProduct: 'List Your Product',
      manageOrders: 'Manage Orders', earnings: 'Earnings',
      totalSales: 'Total Sales', activeListings: 'Active Listings',

      // Checkout
      checkoutTitle: 'Checkout', deliveryAddress: 'Delivery Address',
      paymentMethod: 'Payment Method', placeOrder: 'Place Order',
      orderSummary: 'Order Summary', deliveryCharge: 'Delivery Charge',

      // About
      aboutTitle: 'About AgriConnect', ourMission: 'Our Mission',
      ourTeam: 'Our Team', contactUs: 'Contact Us',

      // Splash
      splashTagline: 'Farm Fresh • Direct to You',

      // Errors
      error: 'Error', tryAgain: 'Try Again',
      somethingWrong: 'Something went wrong',
      notFound: 'Not Found',
    }
  },
  hi: {
    translation: {
      // Auth
      signup: 'साइन अप करें', login: 'लॉगिन करें', logout: 'लॉगआउट',
      name: 'पूरा नाम', email: 'ईमेल', password: 'पासवर्ड', language: 'भाषा',
      farmer: 'किसान', customer: 'ग्राहक',

      // Nav
      home: 'होम', marketplace: 'बाज़ार', livePrices: 'लाइव कीमतें',
      forFarmers: 'किसानों के लिए', about: 'हमारे बारे में', farmerDashboard: 'किसान डैशबोर्ड',

      // Common
      welcome: 'AgriConnect में आपका स्वागत है', tagline: 'किसानों और ग्राहकों को जोड़ना',
      search: 'खोजें', searchPlaceholder: 'फसल, किसान खोजें...',
      loading: 'लोड हो रहा है...', save: 'सहेजें', cancel: 'रद्द करें', submit: 'जमा करें',
      edit: 'संपादित करें', delete: 'हटाएं', back: 'वापस', next: 'अगला', close: 'बंद करें',
      viewAll: 'सब देखें', seeMore: 'और देखें', backToHome: 'होम पर वापस',
      noResults: 'कोई परिणाम नहीं मिला',

      // Products
      products: 'उत्पाद', addProduct: 'उत्पाद जोड़ें', price: 'कीमत',
      quantity: 'मात्रा', quality: 'गुणवत्ता', category: 'श्रेणी',
      description: 'विवरण', stock: 'स्टॉक', unit: 'इकाई',
      addToCart: 'कार्ट में जोड़ें', buyNow: 'अभी खरीदें', outOfStock: 'स्टॉक में नहीं',
      inStock: 'स्टॉक में है', productDetails: 'उत्पाद विवरण',

      // Cart
      cart: 'कार्ट', myCart: 'मेरी कार्ट', emptyCart: 'आपकी कार्ट खाली है',
      total: 'कुल', subtotal: 'उप-कुल', checkout: 'चेकआउट',
      removeItem: 'हटाएं', continueShopping: 'खरीदारी जारी रखें',

      // Orders
      orders: 'ऑर्डर', myOrders: 'मेरे ऑर्डर', orderStatus: 'ऑर्डर स्थिति',
      orderDate: 'ऑर्डर तारीख', orderTotal: 'ऑर्डर कुल',
      pending: 'लंबित', delivered: 'डिलीवर', cancelled: 'रद्द',
      processing: 'प्रक्रिया में', shipped: 'भेजा गया',

      // Wishlist
      wishlist: 'विशलिस्ट', myWishlist: 'मेरी विशलिस्ट',
      emptyWishlist: 'आपकी विशलिस्ट खाली है', addToWishlist: 'विशलिस्ट में जोड़ें',
      removeFromWishlist: 'विशलिस्ट से हटाएं',

      // Messages
      messages: 'संदेश', sendMessage: 'संदेश भेजें',
      typeMessage: 'संदेश लिखें...', noMessages: 'अभी तक कोई संदेश नहीं',

      // Chatbot
      chatbot: 'AgriBot सहायक', askQuestion: 'प्रश्न पूछें...',
      send: 'भेजें', chatbotWelcome: 'नमस्ते! मैं AgriBot हूं 🌱 आज मैं आपकी कैसे मदद करूं?',

      // Profile
      profile: 'प्रोफाइल', myAccount: 'मेरा खाता', settings: 'सेटिंग्स',
      updateProfile: 'प्रोफाइल अपडेट करें', changePassword: 'पासवर्ड बदलें',
      mobile: 'मोबाइल नंबर', address: 'पता', photo: 'फोटो',

      // Marketplace
      filter: 'फ़िल्टर', sort: 'क्रमबद्ध', allCategories: 'सभी श्रेणियां',
      priceRange: 'मूल्य सीमा', nearMe: 'मेरे पास',
      vegetables: 'सब्जियां', fruits: 'फल', grains: 'अनाज',
      dairy: 'डेयरी', organic: 'जैविक',

      // Live Prices
      livePriceTitle: 'लाइव बाज़ार कीमतें', todayPrices: 'आज की कीमतें',
      commodity: 'वस्तु', marketPrice: 'बाज़ार कीमत', change: 'बदलाव',
      lastUpdated: 'अंतिम अपडेट',

      // For Farmers
      forFarmersTitle: 'किसानों के लिए', listProduct: 'उत्पाद सूचीबद्ध करें',
      manageOrders: 'ऑर्डर प्रबंधित करें', earnings: 'कमाई',
      totalSales: 'कुल बिक्री', activeListings: 'सक्रिय लिस्टिंग',

      // Checkout
      checkoutTitle: 'चेकआउट', deliveryAddress: 'डिलीवरी पता',
      paymentMethod: 'भुगतान विधि', placeOrder: 'ऑर्डर दें',
      orderSummary: 'ऑर्डर सारांश', deliveryCharge: 'डिलीवरी शुल्क',

      // About
      aboutTitle: 'AgriConnect के बारे में', ourMission: 'हमारा मिशन',
      ourTeam: 'हमारी टीम', contactUs: 'संपर्क करें',

      // Splash
      splashTagline: 'ताज़ा खेत से • सीधे आपके पास',

      // Errors
      error: 'त्रुटि', tryAgain: 'फिर कोशिश करें',
      somethingWrong: 'कुछ गलत हुआ', notFound: 'नहीं मिला',
    }
  },
  mr: {
    translation: {
      // Auth
      signup: 'साइन अप करा', login: 'लॉगिन करा', logout: 'लॉगआउट',
      name: 'पूर्ण नाव', email: 'ईमेल', password: 'पासवर्ड', language: 'भाषा',
      farmer: 'शेतकरी', customer: 'ग्राहक',

      // Nav
      home: 'मुख्यपृष्ठ', marketplace: 'बाजारपेठ', livePrices: 'थेट किमती',
      forFarmers: 'शेतकऱ्यांसाठी', about: 'आमच्याबद्दल', farmerDashboard: 'शेतकरी डॅशबोर्ड',

      // Common
      welcome: 'AgriConnect मध्ये आपले स्वागत आहे', tagline: 'शेतकरी आणि ग्राहकांना जोडणे',
      search: 'शोधा', searchPlaceholder: 'पिके, शेतकरी शोधा...',
      loading: 'लोड होत आहे...', save: 'जतन करा', cancel: 'रद्द करा', submit: 'सबमिट करा',
      edit: 'संपादित करा', delete: 'हटवा', back: 'मागे', next: 'पुढे', close: 'बंद करा',
      viewAll: 'सर्व पहा', seeMore: 'अधिक पहा', backToHome: 'मुख्यपृष्ठावर परत',
      noResults: 'कोणतेही परिणाम सापडले नाहीत',

      // Products
      products: 'उत्पादने', addProduct: 'उत्पादन जोडा', price: 'किंमत',
      quantity: 'प्रमाण', quality: 'गुणवत्ता', category: 'श्रेणी',
      description: 'वर्णन', stock: 'साठा', unit: 'एकक',
      addToCart: 'कार्टमध्ये जोडा', buyNow: 'आत्ता खरेदी करा', outOfStock: 'साठा नाही',
      inStock: 'साठ्यात आहे', productDetails: 'उत्पादन तपशील',

      // Cart
      cart: 'कार्ट', myCart: 'माझी कार्ट', emptyCart: 'तुमची कार्ट रिकामी आहे',
      total: 'एकूण', subtotal: 'उप-एकूण', checkout: 'चेकआउट',
      removeItem: 'काढा', continueShopping: 'खरेदी सुरू ठेवा',

      // Orders
      orders: 'ऑर्डर', myOrders: 'माझे ऑर्डर', orderStatus: 'ऑर्डर स्थिती',
      orderDate: 'ऑर्डर तारीख', orderTotal: 'ऑर्डर एकूण',
      pending: 'प्रलंबित', delivered: 'वितरित', cancelled: 'रद्द',
      processing: 'प्रक्रियेत', shipped: 'पाठवले',

      // Wishlist
      wishlist: 'विशलिस्ट', myWishlist: 'माझी विशलिस्ट',
      emptyWishlist: 'तुमची विशलिस्ट रिकामी आहे', addToWishlist: 'विशलिस्टमध्ये जोडा',
      removeFromWishlist: 'विशलिस्टमधून काढा',

      // Messages
      messages: 'संदेश', sendMessage: 'संदेश पाठवा',
      typeMessage: 'संदेश लिहा...', noMessages: 'अद्याप कोणतेही संदेश नाहीत',

      // Chatbot
      chatbot: 'AgriBot सहाय्यक', askQuestion: 'प्रश्न विचारा...',
      send: 'पाठवा', chatbotWelcome: 'नमस्ते! मी AgriBot आहे 🌱 आज मी तुम्हाला कशी मदत करू?',

      // Profile
      profile: 'प्रोफाइल', myAccount: 'माझे खाते', settings: 'सेटिंग्ज',
      updateProfile: 'प्रोफाइल अपडेट करा', changePassword: 'पासवर्ड बदला',
      mobile: 'मोबाइल नंबर', address: 'पत्ता', photo: 'फोटो',

      // Marketplace
      filter: 'फिल्टर', sort: 'क्रमवारी', allCategories: 'सर्व श्रेणी',
      priceRange: 'किंमत श्रेणी', nearMe: 'माझ्या जवळ',
      vegetables: 'भाज्या', fruits: 'फळे', grains: 'धान्य',
      dairy: 'दुग्धजन्य', organic: 'सेंद्रिय',

      // Live Prices
      livePriceTitle: 'थेट बाजार किमती', todayPrices: 'आजच्या किमती',
      commodity: 'वस्तू', marketPrice: 'बाजार किंमत', change: 'बदल',
      lastUpdated: 'शेवटचे अपडेट',

      // For Farmers
      forFarmersTitle: 'शेतकऱ्यांसाठी', listProduct: 'उत्पादन सूचीबद्ध करा',
      manageOrders: 'ऑर्डर व्यवस्थापित करा', earnings: 'कमाई',
      totalSales: 'एकूण विक्री', activeListings: 'सक्रिय यादी',

      // Checkout
      checkoutTitle: 'चेकआउट', deliveryAddress: 'वितरण पत्ता',
      paymentMethod: 'पेमेंट पद्धत', placeOrder: 'ऑर्डर द्या',
      orderSummary: 'ऑर्डर सारांश', deliveryCharge: 'वितरण शुल्क',

      // About
      aboutTitle: 'AgriConnect बद्दल', ourMission: 'आमचे ध्येय',
      ourTeam: 'आमची टीम', contactUs: 'आमच्याशी संपर्क साधा',

      // Splash
      splashTagline: 'शेताची ताजी उत्पादने • थेट तुमच्यासाठी',

      // Errors
      error: 'त्रुटी', tryAgain: 'पुन्हा प्रयत्न करा',
      somethingWrong: 'काहीतरी चुकले', notFound: 'सापडले नाही',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;