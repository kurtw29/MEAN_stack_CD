module.exports=function(reqNum, sessionNum){
    if(reqNum == sessionNum){
        result ={
            response:"Nice!"+reqNum+" was the number!",
            background:"green",
            again:"again"

        }    
    }else if(reqNum > sessionNum){
        result ={
            response:"Your number is too high",
            background:"red",
            again:undefined

        }    
    }else{
        result ={
            response:"Your number is too low",
            background:"red",
            again:undefined
        }
    }
    return result;
}