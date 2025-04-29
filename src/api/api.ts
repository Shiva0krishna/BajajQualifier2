// API functions for the application

import { User, FormResponse } from '../types';

const API_BASE_URL = 'https://dynamic-form-generator-9rl7.onrender.com';

/**
 * Create a new user
 * @param user User data containing rollNumber and name
 * @returns Promise with the API response
 */
export const createUser = async (user: User): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
    throw new Error('Failed to create user: Unknown error');
  }
};

/**
 * Get form structure from the API
 * @param rollNumber User's roll number
 * @returns Promise with the form structure
 */
export const getForm = async (rollNumber: string): Promise<FormResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-form?rollNumber=${rollNumber}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch form');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch form: ${error.message}`);
    }
    throw new Error('Failed to fetch form: Unknown error');
  }
};