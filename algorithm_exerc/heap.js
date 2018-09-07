function Heap(){
    this.heap = [undefined];
    
}
Heap.prototype.addToHeap = function (val){
    if(this.heap.length == 0){
        this.heap[1] = val;
    } else{
        this.heap.push(val);
        var c = this.heap.length-1;
        var p = Math.trunc(c/2);
        while( p >=1 && this.heap[p] > this.heap[c]){
            var temp = this.heap[c];
            this.heap[c] = this.heap[p];
            this.heap[p] = temp;
            c = p
            p = Math.trunc(c/2);
        }
    }
    return this.heap;        
}

Heap.prototype.remove = function(){
    // Checking the [] and [undefine, val1] cases
    if(this.heap.length == 1){
        this.heap.pop();
        return console.log("no more element")
    }else if(this.heap.length == 2){
        this.heap.pop();
        return this.heap;
    }else{
        //swap first value (mininmum) with the last index of array value
        var temp = this.heap[1];
        this.heap[1] = this.heap[this.heap.length-1]
        this.heap[this.heap.length-1] = temp;
        // pop the last index of array
        this.heap.pop();
        var p = 1;
        var c1 = p*2;
        var c2 = p*2+1;
        console.log("\nbefore the while loop: ", this.heap)
        var counter = 0;
        // Starting the "sinking/bubble down process"
        while( ((this.heap[c1] != undefined && this.heap[c2] == undefined) && 
                this.heap[p] > this.heap[c1])
                 || 
                ((this.heap[c1] != undefined && this.heap[c2] != undefined) && ((this.heap[p] > this.heap[c1])|| this.heap[p] > this.heap[c2]))
        ){
                counter++;
                console.log("\nentered the while loop. Counter: ",counter)
                console.log("heap[",p,"]:",this.heap[p], " heap[",c1,"]:",this.heap[c1], " heap[",c2,"]:",this.heap[c2])
                    if(this.heap[p] > this.heap[c1]){
                        var temp = this.heap[p];
                        this.heap[p] = this.heap[c1];
                        this.heap[c1] = temp;
                        p = c1;
                        c1 = p*2
                        c2 = p*2+1
                    }else if(this.heap[p] > this.heap[c2]){
                        var temp = this.heap[p];
                        this.heap[p] = this.heap[c2];
                        this.heap[c2] = temp;
                        p = c2;
                        c1 = p*2
                        c2 = p*2+1
                }
            }
            console.log("finishing while",counter," loop")
            console.log("heap[",p,"]:",this.heap[p], " heap[",c1,"]:",this.heap[c1], " heap[",c2,"]:",this.heap[c2])
       
        }
        return this.heap;
}

var arr = new Heap()
arr.addToHeap(5)
console.log(arr);
arr.remove();
arr.addToHeap(5);
arr.addToHeap(6);
console.log(arr);
arr.remove();
console.log(arr);
arr.addToHeap(7);
arr.addToHeap(8);
arr.addToHeap(9);
arr.addToHeap(11);
arr.addToHeap(13);
arr.addToHeap(15);
arr.addToHeap(17);
arr.addToHeap(21);
console.log(arr);
arr.remove();
console.log(arr);
