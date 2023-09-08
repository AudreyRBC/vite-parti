export function debounce(func: any, time?: number) {
  time = time || 200; // 100 by default if no param
  let timer: any;
  return function (event: Event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, time, event);
  };
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}