const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const submitRTI = async (payload) => {
  const options = {
    method: 'POST',
    body: payload,
  };

  const response = await fetch(`${API_BASE_URL}/api/rti`, options);
  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(responseBody?.message || 'Failed to submit RTI request');
  }

  return responseBody;
};

export const fetchRTIs = async () => {
  const response = await fetch(`${API_BASE_URL}/api/rti`);
  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(responseBody?.message || 'Unable to load RTI data');
  }

  return responseBody?.data || [];
};

export const fetchRTIById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/rti/${id}`);
  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(responseBody?.message || 'Unable to load RTI detail');
  }

  return responseBody?.data || null;
};

export const updateRTI = async (id, payload) => {
  const options = {
    method: 'PUT',
    body: payload,
  };

  const response = await fetch(`${API_BASE_URL}/api/rti/${id}`, options);
  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(responseBody?.message || 'Failed to update RTI request');
  }

  return responseBody;
};

export const deleteRTI = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/rti/${id}`, {
    method: 'DELETE',
  });
  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(responseBody?.message || 'Failed to delete RTI record');
  }

  return responseBody;
};
