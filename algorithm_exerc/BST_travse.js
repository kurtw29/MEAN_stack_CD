//This is "in-order" traversing
BST.prototype.traverse = function(){
    if(this.root){
        this.root.traverse();
    }
}
traverse = function(){
    if(this.left != null){
        this.left.traverse();
    }
    console.log(this.val)
    if(this.right != null){
        this.right.traverse();
    }
}