// pivot rule:
// pivot.left.value < pivot.value (order doesn't matter)
// pivot.right.value > pivot.value (order doesn't matter)

//write a function that sort a given array that follows pivot rules:

function partition(arr){
    const pivot = arr[Math.floor(Math.random()*(arr.length-1))];
    console.log("this is pivot: ", pivot);
    var i = 0;
    var k = arr.length -1;
    while( i != k){
        while(arr[i] < pivot){
            i++;
        }
        while(arr[k] > pivot){
            k--;
        }
        var temp = arr[k];
        arr[k] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

//testing:
//already follow pivot
arr1 = [5, 7, -2, 19, 30, 24]

//pivot
arr2 = [24, 12, 40, 112, -23, 33]

console.log(partition(arr2));
