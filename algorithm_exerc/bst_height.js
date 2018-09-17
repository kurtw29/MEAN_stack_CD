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
