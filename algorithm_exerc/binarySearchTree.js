// ***We put the method in the "insert" instead of the BST

// Setting the Object constructors:
function BST(val){
    this.root = val;
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
            this.right = insert(val)
        }
    }else if(val < this.val){
        if(this.left == null){
            this.left = new BSTNode(val)
        }else{
            this.left.insert(val)
        }
    }
}