export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(date);
  const location = 'Dhaka';

  return `${formattedDate}, ${location}`;
};
