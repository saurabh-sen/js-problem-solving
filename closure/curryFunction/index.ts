function infiniteCurry(...args){
  const allArgs = [...args];
  if(args.length === 0)return allArgs.reduce((prev, cur) => prev + cur, 0);
  else{
    const curry = function(...args2){
      allArgs.push(...args2);
      if(args2.length === 0)return allArgs.reduce((prev, cur) => prev + cur, 0);
      else return curry;
    }
    return curry;
  }
}

console.log(infiniteCurry(1, 2, 3, 4)())
//should return 10
//currying function
console.log(infiniteCurry(1)(2)(3)(4)())
//should return 10
