import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// const BASE_URL = "https://formbear.tusharyaar.me/api";

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

export const getUserAPITokens = async (IdToken) => {
  const response = await axios.get(`${BASE_URL}/tokens`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });
  return response.data;
};

export const addUserAPIToken = async (IdToken, expiry_duration, allow_delete) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/create-token`,
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
    data: {
      expiry_duration,
      allow_delete,
    },
  });
  return response.data;
};

export const deleteUserAPIToken = async (IdToken, apiToken) => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/tokens/${apiToken}`,
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });
  return response.data;
};
