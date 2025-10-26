import api from './api';

export const getBanner = () => {
  return api.get('/banners');
};

export const updateBanner = (formData) => {
  return api.put('/banners', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const resetBanner = () => {
  return api.post('/banners/reset');
};