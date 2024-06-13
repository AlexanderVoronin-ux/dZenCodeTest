export const isDaytime = (
  sunriseTimestamp: number,
  sunsetTimestamp: number,
) => {
  const now = new Date().getTime() / 1000; // Convert to seconds
  return now >= sunriseTimestamp && now <= sunsetTimestamp;
};
