String.prototype.hashCode = function(){
    var hash = 0;
    if(this.length == 0){
        return hash;
    }
    for(i=0; i<this.length; i++){
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash) + char;  // bitwise operators are used to manipulate the string in binary
        hash &= hash;                
    }
    return hash;                         // by the end of the loop, the hash is unique to this string
}

// Now, when we need a particular string's hash code, we may call its hashCode method, which we just created
// var hashedKey = "role".hashCode();

function mod(input, div){
        return (input % div + div) % div;
}

// use the function to get the index position where we should store our data
// var idx = mod(hashedKey, hashMap.length);

function HashMap(cap){
    this.cap = cap;
    this.hash = [];
    for(let i = 0; i < cap; i++){
        this.hash.push([]);
    }
    HashMap.prototype.add = function(key, val){
        index = mod(key.hashCode(), cap);
        var kvp_arr = this.hash[index];
        var key_exists = false;
        for(var i = 0; i < kvp_arr.length ; i++){
            var kvp = kvp_arr[i];
            if(kvp[0] == key){
                kvp[1] = val;
                key_exists = true;
            }
        }
        if( key_exists == false){
            kvp_arr.push([key,val])
        }
    }
}


