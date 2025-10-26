import api from './api';

/**
 * Mengambil data 'About Us' (singleton)
 */
export const getAbout = () => {
  return api.get('/about');
};

/**
 * Mengupdate data 'About Us'.
 * @param {FormData} formData - Data form (title, desc, file, dll.)
 */
export const updateAbout = (formData) => {
  return api.put('/about', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Mereset data 'About Us' ke default
 */
export const resetAbout = () => {
  return api.post('/about/reset');
};