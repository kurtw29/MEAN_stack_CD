module.exports = function(){
    return{
        add: function(num1, num2){
            console.log("add(",num1,",",num2,"): ", num1+num2);
        },

        multiply: function(num1, num2){
            console.log("multiply(",num1,",",num2,"):", num1*num2);
        },

        square: function(num){
            console.log("square(",num,"):", num*num);
        },

        random: function(num1, num2){
            console.log("random(",num1,",",num2,"):", Math.random()*(num2 - num1)+num1 | 0);
        }
    }
};