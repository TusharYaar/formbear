import axios from 'axios';
import {
  getUniqueId,
  getManufacturer,
  getDeviceName,
} from 'react-native-device-info';

const BASE_URL = 'https://66dd-49-36-37-192.ngrok.io/api';

export const getUserProfile = async IdToken => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${IdToken}`,
    },
  });
  return response.data;
};

export const addMobileDevice = async (IdToken, messageToken) => {
  try {
    const deviceInfo = {
      device_id: getUniqueId(),
      manufacturer: await getManufacturer(),
      message_token: messageToken,
      device_name: await getDeviceName(),
    };

    await axios.post(
      `${BASE_URL}/mobile`,
      {...deviceInfo},
      {
        headers: {
          Authorization: `Bearer ${IdToken}`,
        },
      },
    );
    return deviceInfo;
  } catch (error) {
    throw error;
  }
};

export const getUserForms = async IdToken => {
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
