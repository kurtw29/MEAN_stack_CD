//************************************ */
// 1. Setting types:
// 
var myString: string;
// I can assign myString like this:
myString = "Bee stinger";
// Why is there a problem with this? What can I do to fix this?
myString = '9';  // "myString" variable is defined as a 'string', so we need to change the number into a string
// 

// **********************************************/
// 2. Setting the types for function parameters
function sayHello(name: string){
    return `Hello, ${name}!`;
 }
 // This is working great:
 console.log(sayHello("Kermit"));
 // Why isn't this working? I want it to return "Hello, 9!"
 console.log(sayHello("9"));  // the function sayHello sets its parameter to be name:string, so we need to make sure the parameter is a string by using quotes
// 

// ********************************************** /
// 3. Optional parameters
function fullName(firstName: string, lastName: string, middleName?: string){    // the '?' next to middleName makes the argument "middleName" optional, so it doesn't have to be included
    let fullName = `${firstName} ${middleName} ${lastName}`;
    return fullName;
 }
 // This works:
 console.log(fullName("Mary", "Moore", "Tyler"));
 // What do I do if someone doesn't have a middle name?
 console.log(fullName("Jimbo", "Jones"));  
// ************8

// *******************************************
// 4. INTERFACES AND FUNCTION PARAMETERS
interface Student {
    firstName: string;
    lastName: string;
    belts: number;
 }
 function graduate(ninja: Student){
    return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
 }
 const christine = {
    firstName: "Christine",
    lastName: "Yang",
    belts: 2
 }
 
 const jay = {
    firstName: "Jay",
    lastName: "Patel",
    belts: 4  // the belt is missing "s", the name is not the same as what we shaped in the interface Student, added 's' to belt
 }
 // This seems to work fine:
 console.log(graduate(christine));
 // This one has problems:
 console.log(graduate(jay));
// *************


// *******************************************
// 5. CLASSES AND FUNCTION PARAMETERS
class Ninja {
    fullName: string;
    constructor(
       public firstName: string,
       public lastName: string){
          this.fullName = `${firstName} ${lastName}`;
       }
    debug?(){           // *'add '?' next to debug to make it optional
       console.log("Console.log() is my friend.")
    }
 }
 // This is not making an instance of Ninja, for some reason:
 const shane = new Ninja('Alan', 'Turing');     // *Need to add "new" to create instance, also we need to include 2 parameters, first & last name.
 // Since I'm having trouble making an instance of Ninja, I decided to do this:
 const turing = {
    fullName: "Alan Turing",
    firstName: "Alan",
    lastName: "Turing",
    //** adding the 'debug method' into 'turing' to match with the class "Ninja" properties */
    debug(){
        console.log("Console.log() is my friend.")
    }
 }
 // Now I'll make a study function, which is a lot like our graduate function from above:
 function study(programmer: Ninja){
    return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
 }
 // Now this has problems:
 console.log(study(turing));
// **********

// **************************************************
// 6. Arrow functions
var increment = x => x + 1;
// This works great:
console.log(increment(3));
var square = (x) => {return x * x};  // added "( )" and added the word, "return" for function syntax
// This is not showing me what I want: (b/c we need to include paranteese to make "square a function" and include the return statement)
console.log(square(4));
// This is not working:
var multiply = (x,y) => x * y;    // *add "( )" when taking in multiple parameters
// Nor is this working:
var math = (x, y) => {let sum = x + y;  // add "{ }", because var "math" is a function, we need to say what function math() does inside the "{}"
   let product = x * y;
   let difference = Math.abs(x-y);
   return [sum, product, difference];
}
// ***************

// ******************************************
// 7. 
class Elephant {
   constructor(public age: number){}
   birthday = () => {       // replace the function with "=>" arrow function here, so the constructor will create "_this = this" inside the constructor
      this.age++;
   }
}
const babar = new Elephant(8);
setTimeout(babar.birthday, 1000)
setTimeout(function(){
   console.log(`Babar's age is ${babar.age}.`)
   }, 2000)
// Why didn't babar's age change? Fix this by using an arrow function in the Elephant class.
