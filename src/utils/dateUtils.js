import { format } from 'date-fns';

export const formatDateTime = (date) => format(new Date(date), 'PPpp');

export const getCurrentTimestamp = () => new Date().toISOString();