import actionTypes from './actionTypes';
import { apiCategory, apiGetAreas, apiGetPrices } from '../../services';

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apiCategory();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                msg: response.data.msg,
                categories: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null,
        });
    }
};

export const getPrices = () => async (dispatch) => {
    try {
        const response = await apiGetPrices();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response.data.response.sort((a, b) => {
                    return +a.order - +b.order;
                }),
            });
        } else {
            dispatch({
                type: actionTypes.GET_PRICES,
                msg: response.data.msg,
                prices: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null,
        });
    }
};

export const getAreas = () => async (dispatch) => {
    try {
        const response = await apiGetAreas();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AREAS,
                areas: response.data.response.sort((a, b) => {
                    return +a.order - +b.order;
                }),
            });
        } else {
            dispatch({
                type: actionTypes.GET_AREAS,
                msg: response.data.msg,
                areas: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AREAS,
            areas: null,
        });
    }
};