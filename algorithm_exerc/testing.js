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

// Finding the height of the BST:
BST.prototype.height = function(){
    //check the null case
    if(this.root == null){
        return 0;
    //if not null, check the BSTNode's height function
    }else{
        var height_level = this.root.height();
        return height_level;
    }
}

BSTNode.prototype.height = function(){
    // Check the end case
    if(this.left == null && this.right == null){
        return 1
    }
    // check the LEFT (lower number)
    if(this.left != null){
        // invoke the height function to check that node's height
        var left = this.left.height();
    }else{
        //nothing at the left, so return 0;
        var left = 0
    }
    // After checking left, check the RIGHT side (higher number).
    if(this.right != null){
        var right = this.right.height();
    }else{
        var right = 0
    }
    // After checking, we compare LEFT and RIGHT height, we return the higher height plus 1
    if(left > right){
        left++;
        return left;
    }else{
        right++;
        return right;
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
console.log('height_level of BST:',test.height());