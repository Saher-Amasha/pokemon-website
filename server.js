const express = require('express');
const app = express();
const path = require('path');
const pokemon_data= require('./pokemons.json');
app.use("/assets",express.static("static-assets"));

//initialize the popularity array
var popularityArray = [3,2,1];
for (var i = 3; i <= pokemon_data.length; i++) {
   popularityArray.push(0);
}



app.get("/", (req,res) => {
    res.sendFile(path.resolve("./mainpage.html"));
});

app.get("/api/pokemons", (req,res) => {
    const result = pokemon_data.map((pokemon)=>{
        return {id:pokemon.id,
                name:pokemon.name,
                type0:pokemon.type[0],
                type1:pokemon.type[1]
                 }
    });
    res.send(result);
    

});
app.get('/api/mid/pokemons/:x',(req,res) =>{
    
    res.send(req.params);
});

app.get('/api/pokemons/:x',(req,res) =>{
    popularityArray[req.params.x-1]++;
    res.send( pokemon_data[req.params.x-1]);
});

app.get('/pokemons/:x',(req,res) =>{
    res.sendFile(path.resolve('./singular.html'),);
    
 });


app.get('/pokemons',(req,res) =>{
   res.sendFile(path.resolve("./allPokemons.html"));
 });

 app.get('/pokemons/visted/:x',(req,res) =>{
    res.send(popularityArray[req.params]);
  });


 //takes popularity array and returns the n most popular pokemons in it 
 function getTheNMostpopular(input_array,n)
 {
   //copy the input array so that any changes dont affect it 
   let inputArrayCopy = [...input_array];

   //array that stores the n most popular pokemons
   let nMaxPokemons=[];

   for (i = 0; i < n; i++) 
    {
        //gets the most popular pokemon  index in the copied array 
        currentMaxIndex = inputArrayCopy.indexOf(Math.max(...inputArrayCopy));

        //saves the most popular pokemon  in array nMaxIpokemons
        nMaxPokemons.push(pokemon_data[currentMaxIndex]);

        //replaces the value at the index of the most popular pokemon to be the minimum value in the copied array
        inputArrayCopy[currentMaxIndex]=Math.min(...inputArrayCopy);
    }
   return nMaxPokemons;
 }


//return the 3 most popular pokemons
 app.get('/top',(req,res) =>{
    res.send(getTheNMostpopular(popularityArray,3));
  }); 


  

app.listen(3000);