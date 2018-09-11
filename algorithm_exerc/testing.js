//creating:
function BST(){
    this.root = null;
    this.insert = function(val){
        if(this.root == null){
            this.root = new BSTNode(val);
        }else{
            this.root.insert(val);
        }
    }
}

function BSTNode(val){
    this.right = null;
    this.left = null;
    this.val = val;
    // var val = val;
}

//starting the insert function as one calls on the instance
BSTNode.prototype.insert = function(val){
    if(val > this.val){
        if(this.right == null){
            this.right = new BSTNode(val)
        }else{
            this.right.insert(val)
        }
    }else if(val < this.val){
        if(this.left == null){
            this.left = new BSTNode(val)
        }else{
            this.left.insert(val)
        }
    }
}

//traverse "in-order" below:
BSTNode.prototype.traverse = function(){
    if(this.left != null){
            this.left.traverse();
        }
        console.log(this.val)
        if(this.right != null){
            this.right.traverse();
        }
}

BST.prototype.start_traverse = function(){
    if(this.root){
        this.root.traverse();
    }else{
        console.log("No node")
    }
}


//testing here:
var test = new BST();

test.insert(16);
console.log('inserted 16')
test.insert(1);
console.log('inserted 59')
test.insert(5);
console.log('inserted 5')
test.insert(27);
console.log('inserted 27')
test.insert(68);
console.log('inserted 68')

test.start_traverse();