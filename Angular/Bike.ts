class Bike {
    constructor(
        public price: number,
        public max_speed: string,
        public miles = 0
    ){}
    displayInfo = () => {
        console.log(`price: ${this.price}, max speed: ${this.max_speed}, miles: ${this.miles}`)
        return this;
    };
    ride = () => {
        this.miles += 10;
        console.log(`Riding, miles: ${this.miles}`)
        return this;
    }
    reverse = () => {
        if(this.miles >= 5){
            this.miles -= 5;
        }else{
            this.miles = 0;
        }
        console.log(`Reversing, miles: ${this.miles}`)
        return this;
    }
}
var bike1 = new Bike(200, "25mph");
bike1.ride().ride().ride().reverse().displayInfo();
var bmw2 = new Bike(500, "75mph");
bmw2.ride().ride().reverse().reverse().displayInfo()
var old3 = new Bike(100, "10mph");
old3.reverse().reverse().reverse().displayInfo();