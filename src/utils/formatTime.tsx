export const formatTime = (value: number) => {
  const seconds = Math.floor((value / 1) % 60);
  const minutes = Math.floor((value / 60) % 60);
  const hours = Math.floor((value / 3600) % 60);

  const formatTime = (timeValue: number, unit: string) => (timeValue ? `${timeValue}${unit}` : '');

  const isHours = formatTime(hours, 'h');
  const isMinutes = formatTime(minutes, 'm');
  return `${isHours} ${isMinutes} ${seconds}s`;
};
