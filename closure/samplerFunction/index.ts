const sampler = (callback: (...args: any[]) => any, limit: number) => {
  let counter = 1;
  return <T extends (...args: any[]) => any>(...args: Parameters<T>) => {
    if (counter >= limit) {
      counter = 1;
      callback(...args);
    } else{
      ++counter;
      console.log('no execution')
      };
  }
}

function message() {
  console.log("yeelooo");
}
const sample = sampler(message, 4);
sample();
sample();
sample();
sample(); // yeelooo
sample();
sample();
sample();
sample(); // yeelooo