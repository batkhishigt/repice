const arr = [1, 2, 3];

let myfunc = a => {
    console.log(`number : ${a}`);
}


const arr2 = [...arr, 22, 223];
myfunc(arr2)