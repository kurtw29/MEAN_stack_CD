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

// BST remove
BST.prototype.remove = function(val){
    if(this.root == null){
        return this;
    }else{
    // var fakeNode = new BSTNode();
    console.log("root is not null")
    this.root = this.root.remove(val);
    }
}

//BSTNode remove recursion - having BSTNode do the work
BSTNode.prototype.remove = function(val){
    console.log(`CALLING ${this.val}.remove(${val})`)
    if(this.val < val){
        console.log("CALLING REMOVE FOR this.right")
        if(this.right){
        this.right = this.right.remove(val);
        }
    }else if(this.val > val){
        console.log("CALLING REMOVE FOR this.left")
        if(this.left){
        this.left = this.left.remove(val);
        }
    }else{
        // this is the leaf node case:
        if(this.left == null && this.right == null){
            return null;
        // if left exits:
        }else if(this.left != null){
            // replace this with max_left
            //find the max_left
            var parent = this.left.find_parent_max();
            var max;
            if(parent == null){
                max = this.left;
            }else{
                max = parent.right;
                parent.right = null;
                max.left = this.left;
            }
            max.right = this.right;
            return max;
        // if right exists;
        }else{
            //replace this with min_right
            var parent = this.right.find_parent_min();
            var min;
            if(parent == null){
                min = this.right;
            }else{
                min = parent.left;
                parent.left = null;
                min.right = this.right;
            }
            min.left = this.left;
            return min;
        }

   }
   return this
}

//Find the max function
BSTNode.prototype.find_parent_max = function(){
    var follower = null;
    var walker = this;
    while(walker.right){
        follower = walker;
        walker = walker.right;
    }
    return follower;   //this returns the right-most node of the BST-subtree
}
BSTNode.prototype.find_parent_min = function(){
    var follower = null;
    var walker = this;
    while(walker.left){
        follower = walker;
        walker = walker.left;
    }
    return follower;   //this returns the right-most node of the BST-subtree
}

//testing here:
var test = new BST();

test.insert(16);
console.log('inserted 16')
test.insert(1);
console.log('inserted 1')
test.insert(2);
console.log('inserted 2')
test.insert(5);
console.log('inserted 5')
test.insert(27);
console.log('inserted 27')
test.insert(20);
console.log('inserted 20')
test.insert(68);
console.log('inserted 68')
test.start_traverse();
console.log('height_level of BST:',test.height());
test.remove(27);
test.start_traverse();
