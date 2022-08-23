import axios from "axios";

export const PostRequest = (url, data) => {
  return axios.post(url, data);
};

export const getRequest = (url) => {
  return axios.get(url);
};

export const updateRequest = (url) => {
  return axios.put(url);
};
