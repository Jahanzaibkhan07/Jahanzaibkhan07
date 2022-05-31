import axios from "axios";
import { SERVER_IP } from "../../configs/env.js";

import {
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_RESET,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_IMAGE_REQUEST,
  PRODUCT_IMAGE_SUCCESS,
  PRODUCT_IMAGE_FAIL,
} from "../constants/productsConstants";

import jwtInterceptor from "./jwtInterceptor.js";
export const addProductAction = (prod) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/product/create`,
      prod
    );

    dispatch({
      type: PRODUCT_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

// GET and UPDATE APIs to be implemented later

// export const getProductAction = (salonId, ) => async (dispatch) => {
//   try {
//     dispatch({
//       type: PRODCATEGORY_GET_REQUEST,
//       Accept: "application/json",
//     });
//     const { data } = await jwtInterceptor.get(
//       `${SERVER_IP}/api/v1/prod_category/all/${salonId}`
//     );

//     dispatch({
//       type: PRODCATEGORY_GET_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODCATEGORY_GET_FAIL,
//       payload: error.response && error.response.data.error,
//     });
//   }
// };

// export const updateProdCatAction = (Id, Body) => async (dispatch) => {
//   try {
//     dispatch({
//       type: PRODCATEGORY_UPDATE_REQUEST,
//       Accept: "application/json",
//     });
//     const { data } = await jwtInterceptor.put(
//       `${SERVER_IP}/api/v1/prod_category/update/${Id}`,
//       Body
//     );
//     dispatch({
//       type: PRODCATEGORY_UPDATE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODCATEGORY_UPDATE_FAIL,
//       payload: error.response && error.response.data.error,
//     });
//   }
// };

// export const clientToggleAction = (Id, Body) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CLIENTS_TOGGLE_REQUEST,
//       Accept: "application/json",
//     });
//     const { data } = await jwtInterceptor.put(
//       `${SERVER_IP}/api/v1/client/update/${Id}`,
//       Body
//     );
//     dispatch({
//       type: CLIENTS_TOGGLE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: CLIENTS_TOGGLE_FAIL,
//       payload: error.response && error.response.data.error,
//     });
//   }
// };

// export const searchClientsAction = (branchId, val) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CLIENTS_SEARCH_REQUEST,
//       Accept: "application/json",
//     });
//     const { data } = await jwtInterceptor.get(
//       `${SERVER_IP}/api/v1/client/all/${branchId}?search=${val}`
//     );

//     dispatch({
//       type: CLIENTS_GET_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: CLIENTS_SEARCH_FAIL,
//       payload: error.response && error.response.data.error,
//     });
//   }
// };

export const addProdImageAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_IMAGE_REQUEST,
      // Accept: "application/json",
    });
    // debugger;
    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/image-upload/`,
      formData
    );
    // debugger;
    dispatch({
      type: PRODUCT_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_IMAGE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
