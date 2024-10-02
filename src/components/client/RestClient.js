import axios from 'axios';
import { tokenPropertyVal, DeleteCookie, tokenSetter } from '../utils/CookieUtils';
import { USER_DATA, CURRRENY } from '../constant/DefaultValue.js';

// const express = require('express');
// export const app = express();

const serverURL = process.env.VUE_APP_BASE_URL;
const mayaURL = process.env.VUE_APP_MAYA_GATEWAY;
// const PORT = process.env.PORT || 3000;

const headers = {
  'Content-Type': 'application/json'
};

const mayaHeader = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Basic cGstQkNRNVBsVHJwYVZlQTJrWVdlQmcwWmFPb3p3TGVaN0NOVEVsbkphMjdKQzo='
};

// Middleware to parse JSON bodies
// app.use(bodyParser.json());

export const client = axios.create({
    baseURL: serverURL,
    headers: headers
});

export const maya = axios.create({
  baseURL: mayaURL,
  headers: mayaHeader
});

client.interceptors.request.use(
  (config) => {
    const accessToken = tokenPropertyVal(USER_DATA, "accessToken");
    const status = tokenPropertyVal(USER_DATA, "status");
    if (accessToken !== null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Payment-Auth"] = status;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    // console.log('this is the response: ' + JSON.stringify(response));
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && tokenPropertyVal(USER_DATA, "accessToken") !== null) {
      // Unauthorized error, try to refresh the token
      try {
        const response = client.post('/auth/refresh/token', {
          CredentialDTO : {
            refreshToken: tokenPropertyVal("refreshToken")
          }
        });

        tokenSetter(response.data);
        const newAccessToken = tokenPropertyVal(USER_DATA, "accessToken");
        const status = tokenPropertyVal(USER_DATA, "status");
        // Retry the original request with the new access token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.headers["Payment-Auth"] = status;
        return client(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, log out user or handle the error
        console.error('Failed to refresh token:', refreshError);
        // For example, log out the user
        DeleteCookie(USER_DATA);
        // Redirect to login page or show an error message
        window.location.href = "/";
      }
    }
    
    return Promise.reject(error);
  }
);

export function MayaPaymentData(emailAddress, referenceId) {
  return ({
      "totalAmount": {
        "value": process.env.VUE_APP_SUBSCRIPTION_AMOUNT,
        "currency": CURRRENY
      },
      "buyer": {
        "contact": {
          "email": emailAddress
        }
      },
      "redirectUrl": {
        "success": serverURL.concat(process.env.VUE_APP_CHECKOUT_SUCCESS_PATH),
        "failure": serverURL.concat(process.env.VUE_APP_CHECKOUT_FAILURE_PATH),
        "cancel": serverURL.concat(process.env.VUE_APP_CHECKOUT_CANCEL_PATH)
      },
      "requestReferenceNumber": referenceId
  });
}