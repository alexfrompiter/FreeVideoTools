export function digit2(num: number): string {
  return (num < 10 ? '0' : '') + num;
}

export function formatTime(num: number): string {
  const allSecs = Math.round(num / 1000);
  const secs = allSecs % 60;
  const allMins = (allSecs - secs) / 60;
  const mins = allMins % 60;
  const hours = (allMins - mins) / 60;
  let ret = '';

  if (hours > 0) {
    ret = digit2(hours) + ':';
  }

  return ret + digit2(mins) + ':' + digit2(secs);
}
