const dateToString = (dateString: Date) => {
  const date = new Date(dateString);
  const format = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${format(year % 100)}.${format(month)}.${format(day)}`;
};

export default dateToString;
