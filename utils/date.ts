import { format, parseISO, formatDistanceToNow } from 'date-fns';

export const formatDate = (dateString: string, formatString: string = 'MMM dd, yyyy'): string => {
  const date = parseISO(dateString);
  return format(date, formatString);
};

export const formatTime = (dateString: string, formatString: string = 'HH:mm'): string => {
  const date = parseISO(dateString);
  return format(date, formatString);
};

export const formatDatetime = (dateString: string, formatString: string = 'MMM dd, yyyy HH:mm'): string => {
  const date = parseISO(dateString);
  return format(date, formatString);
};

export const formatRelativeTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const isSameDay = (date1: string, date2: string): boolean => {
  const d1 = parseISO(date1);
  const d2 = parseISO(date2);
  return format(d1, 'yyyy-MM-dd') === format(d2, 'yyyy-MM-dd');
};

export const getDayName = (dateString: string, formatString: string = 'EEEE'): string => {
  const date = parseISO(dateString);
  return format(date, formatString);
};