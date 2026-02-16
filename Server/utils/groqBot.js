const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const languageMap = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi'
};

const askGroq = async (question, role = 'CUSTOMER', language = 'en') => {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are AgriBot 🌱 - a smart assistant for AgriConnect, an agriculture platform connecting farmers and customers in India.

IMPORTANT: Always reply in ${languageMap[language]} language only.

${role === 'FARMER' ? `
You are talking to a FARMER. Help them with:
- How to list and add their products on the platform
- How to set prices for vegetables, fruits and dairy products
- How to improve product quality and presentation
- How to connect with more customers and grow their business
- Best farming practices, crop varieties and seasonal guidance
- Fertilizers, pest control and soil health
- How to manage orders and deliver products
- Government schemes and MSP prices for farmers
` : `
You are talking to a CUSTOMER. Help them with:
- Finding fresh vegetables, fruits and dairy products
- Checking quality, quantity and variety of products
- How to place orders and buy products on the platform
- Price comparisons and best deals
- Nutritional information about fruits and vegetables
- Seasonal availability of products
- How to connect with local farmers directly
- Delivery and payment related questions
`}

Always be friendly and helpful.
Keep answers short and to the point.`
      },
      {
        role: 'user',
        content: question
      }
    ]
  });

  return response.choices[0].message.content;
};

module.exports = askGroq;