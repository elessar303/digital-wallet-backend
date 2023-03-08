export const isDateOneYearOld = (date: Date): boolean => {
  const currentDate = new Date();
  const oneYearAgo = new Date().setFullYear(currentDate.getFullYear() - 1);

  return date <= new Date(oneYearAgo);
};
