import { lightFormat } from 'date-fns';

export const formatDateTime = (d: Date) => lightFormat(d, 'dd/MM/yyyy - HH:mm');

export const formatTime = (d: Date) => lightFormat(d, 'HH:mm');

export const formatOrderId = (id: string) => `#${id.padStart(4, '0')}`;
