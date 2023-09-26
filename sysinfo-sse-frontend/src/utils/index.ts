export const secondsToTime = (seconds: number): string => {
  const date = new Date(0);
  date.setSeconds(seconds);
  let timeParts = date.toISOString().slice(11, 19).split(':');
  return `${timeParts[0]}h ${timeParts[1]}m ${timeParts[2]}s`;
}
