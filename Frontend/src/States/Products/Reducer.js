import {
    GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FAILURE,
    GET_PRODUCTS_BY_CATEGORY_REQUEST, GET_PRODUCTS_BY_CATEGORY_SUCCESS, GET_PRODUCTS_BY_CATEGORY_FAILURE,
    GET_HOT_DEALS_REQUEST, GET_HOT_DEALS_SUCCESS, GET_HOT_DEALS_FAILURE,
    FILTER_PRODUCTS_REQUEST, FILTER_PRODUCTS_SUCCESS, FILTER_PRODUCTS_FAILURE,
    GET_RELATED_PRODUCTS_REQUEST, GET_RELATED_PRODUCTS_SUCCESS, GET_RELATED_PRODUCTS_FAILURE,
    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE,
} from './Types';

const initialState = {
    products:         [],
    product:          null,
    relatedProducts:  [],
    hotDeals:         [],
    filteredProducts: [],
    loading:          false,
    error:            null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {

        // ── GET ALL ──
        case GET_ALL_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };
        case GET_ALL_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // ── GET BY ID ──
        case GET_PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, product: action.payload, error: null };
        case GET_PRODUCT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // ── GET BY CATEGORY ──
        case GET_PRODUCTS_BY_CATEGORY_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };
        case GET_PRODUCTS_BY_CATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // ── HOT DEALS ──
        case GET_HOT_DEALS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_HOT_DEALS_SUCCESS:
            return { ...state, loading: false, hotDeals: action.payload, error: null };
        case GET_HOT_DEALS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // ── FILTER ──
        case FILTER_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null };
        case FILTER_PRODUCTS_SUCCESS:
            return { ...state, loading: false, filteredProducts: action.payload, error: null };
        case FILTER_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // ── RELATED ──
        case GET_RELATED_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_RELATED_PRODUCTS_SUCCESS:
            return { ...state, loading: false, relatedProducts: action.payload, error: null };
        case GET_RELATED_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // ── CREATE ──
        case CREATE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, products: [...state.products, action.payload], error: null };
        case CREATE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // ── UPDATE ──
        case UPDATE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state, loading: false, error: null,
                products: state.products.map(p =>
                    p._id === action.payload._id ? action.payload : p
                ),
            };
        case UPDATE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // ── DELETE ──
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state, loading: false, error: null,
                products: state.products.filter(p => p._id !== action.payload),
            };
        case DELETE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default productReducer;