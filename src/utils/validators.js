import { MINIMUM_NAME_LENGTH, MESSAGES } from './constants';

export const isNameDuplicate = (users, name) => {
  return users.some(user => user.name.toLowerCase() === name.toLowerCase());
};

export const validateName = (name) => {
  if (!name.trim()) {
    return MESSAGES.EMPTY_NAME;
  }
  if (name.length < MINIMUM_NAME_LENGTH) {
    return MESSAGES.NAME_TOO_SHORT;
  }
  return null;
};