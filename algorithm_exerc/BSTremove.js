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