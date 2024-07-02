import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData = null, headers = {}, params = {}) => {
  return axiosInstance({
    method,  // method is directly used
    url,     // url is directly used
    data: bodyData,
    headers, // default value is empty object
    params,  // default value is empty object
  });
};
