// controllers/PriceController.js

const axios = require('axios');

const API_KEY     = process.env.DATA_GOV_API_KEY;
const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';   // ✅ correct resource ID
const BASE_URL    = `https://api.data.gov.in/resource/${RESOURCE_ID}`;

// ─── Mock data (used when API key is missing or API is down) ──────────────────
const MOCK_RECORDS = [
  { state:'Maharashtra', district:'Nanded',     market:'Nanded',       commodity:'Tomato',    variety:'Local',   arrival_date:'14/02/2026', min_price:'600',  max_price:'1200', modal_price:'900'  },
  { state:'Maharashtra', district:'Nanded',     market:'Nanded',       commodity:'Onion',     variety:'Local',   arrival_date:'14/02/2026', min_price:'400',  max_price:'900',  modal_price:'650'  },
  { state:'Maharashtra', district:'Nanded',     market:'Nanded',       commodity:'Potato',    variety:'Local',   arrival_date:'14/02/2026', min_price:'500',  max_price:'900',  modal_price:'700'  },
  { state:'Maharashtra', district:'Nanded',     market:'Nanded',       commodity:'Brinjal',   variety:'Local',   arrival_date:'14/02/2026', min_price:'300',  max_price:'700',  modal_price:'500'  },
  { state:'Maharashtra', district:'Nanded',     market:'Nanded',       commodity:'Cabbage',   variety:'Local',   arrival_date:'14/02/2026', min_price:'200',  max_price:'600',  modal_price:'400'  },
  { state:'Maharashtra', district:'Nashik',     market:'Nashik',       commodity:'Tomato',    variety:'Hybrid',  arrival_date:'14/02/2026', min_price:'700',  max_price:'1400', modal_price:'1000' },
  { state:'Maharashtra', district:'Nashik',     market:'Nashik',       commodity:'Onion',     variety:'Red',     arrival_date:'14/02/2026', min_price:'500',  max_price:'1000', modal_price:'750'  },
  { state:'Maharashtra', district:'Nashik',     market:'Nashik',       commodity:'Grapes',    variety:'Local',   arrival_date:'14/02/2026', min_price:'4000', max_price:'8000', modal_price:'6000' },
  { state:'Maharashtra', district:'Pune',       market:'Pune',         commodity:'Tomato',    variety:'Hybrid',  arrival_date:'14/02/2026', min_price:'700',  max_price:'1400', modal_price:'1000' },
  { state:'Maharashtra', district:'Pune',       market:'Pune',         commodity:'Cabbage',   variety:'Local',   arrival_date:'14/02/2026', min_price:'200',  max_price:'500',  modal_price:'350'  },
  { state:'Maharashtra', district:'Pune',       market:'Pune',         commodity:'Carrot',    variety:'Local',   arrival_date:'14/02/2026', min_price:'800',  max_price:'1500', modal_price:'1100' },
  { state:'Maharashtra', district:'Latur',      market:'Latur',        commodity:'Onion',     variety:'Local',   arrival_date:'14/02/2026', min_price:'450',  max_price:'950',  modal_price:'700'  },
  { state:'Maharashtra', district:'Latur',      market:'Latur',        commodity:'Potato',    variety:'Local',   arrival_date:'14/02/2026', min_price:'400',  max_price:'800',  modal_price:'600'  },
  { state:'Maharashtra', district:'Nagpur',     market:'Nagpur',       commodity:'Tomato',    variety:'Local',   arrival_date:'14/02/2026', min_price:'550',  max_price:'1100', modal_price:'825'  },
  { state:'Maharashtra', district:'Aurangabad', market:'Aurangabad',   commodity:'Potato',    variety:'Local',   arrival_date:'14/02/2026', min_price:'450',  max_price:'850',  modal_price:'650'  },
  { state:'Punjab',      district:'Ludhiana',   market:'Ludhiana',     commodity:'Wheat',     variety:'Sharbati',arrival_date:'14/02/2026', min_price:'2200', max_price:'2500', modal_price:'2350' },
  { state:'Punjab',      district:'Amritsar',   market:'Amritsar',     commodity:'Rice',      variety:'Basmati', arrival_date:'14/02/2026', min_price:'3500', max_price:'5000', modal_price:'4200' },
  { state:'Punjab',      district:'Jalandhar',  market:'Jalandhar',    commodity:'Potato',    variety:'Local',   arrival_date:'14/02/2026', min_price:'600',  max_price:'1000', modal_price:'800'  },
  { state:'Haryana',     district:'Karnal',     market:'Karnal',       commodity:'Wheat',     variety:'Local',   arrival_date:'14/02/2026', min_price:'2100', max_price:'2450', modal_price:'2280' },
  { state:'Uttar Pradesh',district:'Agra',      market:'Agra',         commodity:'Potato',    variety:'Local',   arrival_date:'14/02/2026', min_price:'500',  max_price:'900',  modal_price:'700'  },
  { state:'Uttar Pradesh',district:'Lucknow',   market:'Lucknow',      commodity:'Onion',     variety:'Local',   arrival_date:'14/02/2026', min_price:'400',  max_price:'850',  modal_price:'625'  },
  { state:'Karnataka',   district:'Bangalore',  market:'Bangalore',    commodity:'Tomato',    variety:'Hybrid',  arrival_date:'14/02/2026', min_price:'800',  max_price:'1600', modal_price:'1200' },
  { state:'Gujarat',     district:'Ahmedabad',  market:'Ahmedabad',    commodity:'Cotton',    variety:'Bt',      arrival_date:'14/02/2026', min_price:'6000', max_price:'7500', modal_price:'6750' },
  { state:'Gujarat',     district:'Surat',      market:'Surat',        commodity:'Onion',     variety:'Local',   arrival_date:'14/02/2026', min_price:'420',  max_price:'880',  modal_price:'650'  },
];

// ─── Normalize field names from API (they return capitalized keys) ─────────────
const normalize = (r) => ({
  state:        r.State        || r.state        || '',
  district:     r.District     || r.district     || '',
  market:       r.Market       || r.market       || '',
  commodity:    r.Commodity    || r.commodity    || '',
  variety:      r.Variety      || r.variety      || '',
  arrival_date: r.Arrival_Date || r.arrival_date || '',
  min_price:    String(r.Min_Price   || r.min_price   || '0'),
  max_price:    String(r.Max_Price   || r.max_price   || '0'),
  modal_price:  String(r.Modal_Price || r.modal_price || '0'),
});

// ─── Filter mock data by query params ─────────────────────────────────────────
const filterMock = (state, district, commodity) => {
  let results = MOCK_RECORDS;
  if (state)     results = results.filter(r => r.state.toLowerCase().includes(state.toLowerCase()));
  if (district)  results = results.filter(r => r.district.toLowerCase().includes(district.toLowerCase()));
  if (commodity) results = results.filter(r => r.commodity.toLowerCase().includes(commodity.toLowerCase()));
  return results;
};


// ════════════════════════════════════════════════════════════
//  GET /api/v1/prices
//  Query params: state, district, commodity, limit
//  Example: /api/v1/prices?state=Maharashtra&district=Nanded
// ════════════════════════════════════════════════════════════
exports.getPrices = async (req, res) => {
  const { state = '', district = '', commodity = '', limit = 100 } = req.query;

  // ── No API key → serve mock data so app still works ──
  if (!API_KEY) {
    console.warn('⚠️  DATA_GOV_API_KEY missing in .env — returning mock data');
    const records = filterMock(state, district, commodity);
    return res.status(200).json({
      success: true,
      source: 'mock',
      message: 'Add DATA_GOV_API_KEY in .env to get real prices',
      total: records.length,
      records,
    });
  }

  // ── Real API call ──
  try {
    // ✅ Correct filter format — field names use .keyword suffix
    const params = {
      'api-key': API_KEY,
      format: 'json',
      limit: Number(limit),
      offset: 0,
    };
    if (state)     params['filters[state.keyword]']     = state;
    if (district)  params['filters[district.keyword]']  = district;
    if (commodity) params['filters[commodity.keyword]'] = commodity;

    const response = await axios.get(BASE_URL, { params, timeout: 10000 });
    const records  = (response.data.records || []).map(normalize);

    console.log(`✅ Prices fetched from data.gov.in — ${records.length} records`);

    return res.status(200).json({
      success: true,
      source: 'live',
      total: response.data.total || records.length,
      records,
    });

  } catch (err) {
    console.error('❌ data.gov.in API error:', err.message);

    // ── API failed → graceful fallback to mock ──
    const records = filterMock(state, district, commodity);
    return res.status(200).json({
      success: true,
      source: 'mock_fallback',
      message: 'Live API unavailable, showing cached data',
      total: records.length,
      records,
    });
  }
};


// ════════════════════════════════════════════════════════════
//  GET /api/v1/prices/test
//  Open in browser to verify your API key is working
// ════════════════════════════════════════════════════════════
exports.testApiKey = async (req, res) => {
  if (!API_KEY) {
    return res.status(200).json({
      success: false,
      message: '❌ DATA_GOV_API_KEY is not set in your .env file',
    });
  }

  try {
    // ── NO filters at all, just get raw data to see what fields exist ──
    const response = await axios.get(BASE_URL, {
      params: {
        'api-key': API_KEY,
        format: 'json',
        limit: 3,
      },
      timeout: 10000,
    });

    return res.status(200).json({
      success: true,
      message: '✅ API key working — check raw_fields to see real field names',
      total_available: response.data.total,
      // Show raw record so you can see EXACT field names
      raw_first_record: response.data.records?.[0] || null,
      // Also show all field names
      raw_fields: response.data.records?.[0] ? Object.keys(response.data.records[0]) : [],
    });

  } catch (err) {
    return res.status(200).json({
      success: false,
      message: '❌ ' + (err.response?.data?.message || err.message),
      full_error: err.response?.data || null,
    });
  }
};


// ════════════════════════════════════════════════════════════
//  GET /api/v1/prices/debug
//  Shows the raw API response with no processing at all
// ════════════════════════════════════════════════════════════
exports.debugRaw = async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { 'api-key': API_KEY, format: 'json', limit: 2 },
      timeout: 10000,
    });
    // Return completely raw — no processing
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ error: err.message, data: err.response?.data });
  }
};


// ════════════════════════════════════════════════════════════
//  GET /api/v1/prices/commodities
//  Returns the full list of vegetables for your frontend dropdown
// ════════════════════════════════════════════════════════════
exports.getCommodities = (req, res) => {
  const list = [
    'Tomato','Onion','Potato','Brinjal','Cabbage','Cauliflower',
    'Bitter Gourd','Bottle Gourd','Capsicum','Carrot','Chilli Green',
    'Coriander','Cotton','Drumstick','French Beans','Garlic','Ginger',
    'Grapes','Lady Finger','Lemon','Methi','Peas','Potato','Pumpkin',
    'Radish','Rice','Ridge Gourd','Spinach','Turmeric','Wheat',
  ];
  res.status(200).json({ success: true, commodities: list });
};