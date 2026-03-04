import { api } from '../../config/apiConfig';
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


// ── GET ALL PRODUCTS ──
export const getAllProducts = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
    try {
        const { data } = await api.get('/product');
        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: message });
    }
};


// ── GET PRODUCT BY ID ──
export const getProductById = (id) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/product/${id}`);
        dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: message });
    }
};


// ── GET PRODUCTS BY CATEGORY ──
export const getProductsByCategory = (category) => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_BY_CATEGORY_REQUEST });
    try {
        const { data } = await api.get(`/product/category/${category}`);
        dispatch({ type: GET_PRODUCTS_BY_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: GET_PRODUCTS_BY_CATEGORY_FAILURE, payload: message });
    }
};


// ── GET HOT DEALS ──
export const getHotDeals = (limit = 10) => async (dispatch) => {
    dispatch({ type: GET_HOT_DEALS_REQUEST });
    try {
        const { data } = await api.get(`/product/hot-deals?limit=${limit}`);
        dispatch({ type: GET_HOT_DEALS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: GET_HOT_DEALS_FAILURE, payload: message });
    }
};


// ── FILTER PRODUCTS ──
export const filterProducts = (filters) => async (dispatch) => {
    dispatch({ type: FILTER_PRODUCTS_REQUEST });
    try {
        const params = new URLSearchParams(filters).toString();
        const { data } = await api.get(`/product/filter?${params}`);
        dispatch({ type: FILTER_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: FILTER_PRODUCTS_FAILURE, payload: message });
    }
};


// ── GET RELATED PRODUCTS ──
export const getRelatedProducts = (id) => async (dispatch) => {
    dispatch({ type: GET_RELATED_PRODUCTS_REQUEST });
    try {
        const { data } = await api.get(`/product/${id}/related`);
        dispatch({ type: GET_RELATED_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: GET_RELATED_PRODUCTS_FAILURE, payload: message });
    }
};


// ── CREATE PRODUCT (Admin) ──
export const createProduct = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const { data } = await api.post('/product/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: message });
    }
};


// ── UPDATE PRODUCT (Admin) ──
export const updateProduct = (id, formData) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        const { data } = await api.put(`/product/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: message });
    }
};


// ── DELETE PRODUCT (Admin) ──
export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        const { data } = await api.delete(`/product/${id}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: message });
    }
};