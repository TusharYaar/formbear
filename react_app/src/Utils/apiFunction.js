import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getUserProfile = async (IdToken) => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });
  return response.data;
};

export const getUserForms = async (IdToken) => {
  const response = await axios.get(`${BASE_URL}/forms`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });

  return response.data;
};
