import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getPokemon();
   }
  
  getPokemon(){
    let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    bulbasaur.subscribe(data => {
      console.log("Got bulbasur!", data)
      console.log("Bulbasaur's abilities are:")
      let abilities = data['abilities']
      for(var x in abilities){
        console.log(abilities[x].ability.name)
        let ability_name = abilities[x].ability.name
        let other_poke = this._http.get(abilities[x].ability.url);
        other_poke.subscribe(pokemon => {
          console.log("All pokemon with the ability", ability_name, "are: ", pokemon);
          let poke = pokemon['pokemon']
          for(var p in poke){
            console.log(poke[p].pokemon.name);
          }
        })
      };
    }
  }
  Abilities(){
    let abilities = this._http.get('')
  } 
}
