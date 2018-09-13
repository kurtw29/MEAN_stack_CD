BST.prototype.height = function(){
    if(this.root == null){
        return 0;
    }else{
        var height_level = this.root.height();
        return height_level;
    }
}

BSTNode.prototype.height = function(){
    if(this.left == null && this.right == null){
        return 1
    }

    if(this.left != null){
        var left = this.left.height();
    }else{
        var left = 0
    }

    if(this.right != null){
        var right = this.right.height();
    }else{
        var right = 0
    }

    if(left > right){
        left++;
        return left;
    }else{
        right++;
        return right;
    }

}