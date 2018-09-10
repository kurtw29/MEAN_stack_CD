//building the Object Constructor:
function BSTNode(val){
    this.right = null;
    this.left = null;
    this.val = val;
}

function BST(){
    this.root = null;
}

BST.prototype.insert(val){
    this(this.root == null){
        this.root = new BSTNode(val);
        return BST;
    }
    while(node != null){
        if(val >= node.val){
            if(node.right == null){
                node.right = new BSTNode(val);
                return BST;
            }else{
                node = node.right;
            }
        }else{
            if(node.left == null){
                node.left = new BSTNode(val);
                return this;
            }else{
                node = node.left;
            }
        }
    }
    return BST;
}

