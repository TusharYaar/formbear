import axios from "axios";

const BASE_URL = "https://formbear.tusharyaar.me/api";

export const getUserProfile = async (IdToken) => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });
  return response.data;
};

export const getUserForms = async (IdToken) => {
  const response = await axios.get(`${BASE_URL}/user-forms`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });

  return response.data;
};

export const deleteUserForm = async (IdToken, formId) => {
  const response = await axios.delete(`${BASE_URL}/user-forms/${formId}`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });
  return response.data;
};
export const toggleUserFormStar = async (IdToken, formId) => {
  const response = await axios.get(`${BASE_URL}/user-forms/${formId}/star`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });
  return response.data;
};

export const markUserFormViewed = async (IdToken, formId) => {
  const response = await axios.get(`${BASE_URL}/user-forms/${formId}/mark-read`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });
  return response.data;
};

export const deleteUserProfile = async (IdToken) => {
  const response = await axios.delete(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });
  return response.data;
};
