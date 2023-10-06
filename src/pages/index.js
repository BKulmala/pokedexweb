import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get } from "firebase/database";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import pokemonBackground from './../../public/grid.png'
import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField"
import FormGroup from "@mui/material/FormGroup"
import { Checkbox, FormControlLabel } from '@mui/material'
import { addDoc, collection, getFirestore, getDocs, doc, query, where } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const inter = Inter({ subsets: ['latin'] })
const firebaseConfig = {
  apiKey: "AIzaSyBujr-HqmiLG6de1x2epreoSasMhyIiOjA",
  authDomain: "pokedexweb-f6400.firebaseapp.com",
  databaseURL: "https://pokedexweb-f6400-default-rtdb.firebaseio.com",
  projectId: "pokedexweb-f6400",
  storageBucket: "pokedexweb-f6400.appspot.com",
  messagingSenderId: "378712720138",
  appId: "1:378712720138:web:1a78ef5dfa0039bcb7b0f3",
  measurementId: "G-9968912TVT"
};
function changeGIF(pokemon) {
  var img = document.getElementById("test");
  img.src = "https://projectpokemon.org/images/normal-sprite/" + pokemon + ".gif";
}
function Home({ Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar }) {
  var kantoCaught = [];
  var caught = false;
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [array, setArray] = useState([]);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  var caughtPokemon = { "Kanto":{}, "Johto":{}, "Hoenn":{}, "Sinnoh":{}, "Unova":{}, "Kalos":{}, "Alola":{}, "Galar":{} };
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  if (app.name && typeof window !== 'undefined') {
    const analytics = getAnalytics(app);
  }  
  const [value, setValue] = React.useState();
  return (
    <>

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="mainPage">
        <div class="pokemonChoice">
        <TextField
          id="outlined-basic"
          variant="filled"
          fullWidth
          label={/*user.email.slice(0,-10)*/"string"}
          onChange={(e) => setValue(e.target.value)}
          sx={{ 
            ml:6,
            mt:4
          }}
        />
        <ul>
<FormGroup>
        <FormControlLabel labelPlacement="end" 
                    control={<Checkbox sx={{left:45}}{...label}
                    onClick={e => {           
                      let copy = array;
                      console.log(copy);
                      if(e.target.checked == true) {
                        const fetchData = async () => {
                          const app = initializeApp(firebaseConfig);
                          const db = getFirestore(app);
                          const docRef = collection(db, "kanto");
                          const q = query(docRef, where("name", "!=", "shdfu7fdgsuh")); //we just want every pokemon. there will never be a pokemon named "shdfu7..."
                          const querySnapshot = await getDocs(q);
                          querySnapshot.forEach((doc) => {
                            kantoCaught.push([doc.data()]);
                          });
                          setArray(kantoCaught);
                        }
                        fetchData();
                      }
                      if(e.target.checked == false) {
                        setArray([]);
                    }}}/>}
                    label={<span style={{ position: 'relative', right:'-40px' }}>Toggle caught pokemon</span>} />
        </FormGroup>
        {array.map((country) => (
        <li style={{background:"var(--"+country[0].type+")", }} class="filler" onClick={() => changeGIF(country[0].name)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country[0].name + '.png'} alt='Bulbasaur'/>
        {country[0].name}
        </li>
        ))}
        {Kanto.filter(pokemon => {return pokemon[1].name.includes(value)}).map((country) => (
        <li style={{background:"var(--"+country[1].type+")", }} class="filler" onClick={() => changeGIF(country[1].name)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country[1].name + '.png'} alt='Bulbasaur'/>
        <Checkbox {...Kanto} color="default" onChange={e => {
          if(e.target.checked == true) {
            caughtPokemon.Kanto[country[1].name] = country[1].type;
            const docRef = addDoc(collection(db, "kanto"), {
              name: country[1].name,
              type: country[1].type
              });
            console.log(caughtPokemon);
          }
          if(e.target.checked == false) {
            delete caughtPokemon.Kanto[country[1].name];
            console.log(caughtPokemon);
          }
        }}/>
        {country[1].name}
        </li>
        ))}
        {Johto.filter(pokemon => {if(value == null) {return} else{return pokemon[1].name.includes(value)}}).map((country) => (
        <li style={{background:"var(--"+country[1].type+")", }} class="filler" onClick={() => changeGIF(country[1].name)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country[1].name + '.png'} alt='Bulbasaur'/>
        <Checkbox {...Johto} color="default" onChange={e => {
          if(e.target.checked == true) {
            caughtPokemon.Kanto[country[1].name] = country[1].type;
            const docRef = addDoc(collection(db, "kanto"), {
              name: country[1].name,
              type: country[1].type
              });
            console.log(caughtPokemon);
          }
          if(e.target.checked == false) {
            delete caughtPokemon.Kanto[country[1].name];
            console.log(caughtPokemon);
          }
        }}/>
        {country[1].name}
        </li>
        ))}
        {Hoenn.filter(pokemon => {if(value == null) {return} else{return pokemon[1].name.includes(value)}}).map((country) => (
        <li style={{background:"var(--"+country[1].type+")", }} class="filler" onClick={() => changeGIF(country[1].name)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country[1].name + '.png'} alt='Bulbasaur'/>
        <Checkbox {...Hoenn} color="default" onChange={e => {
          if(e.target.checked == true) {
            caughtPokemon.Kanto[country[1].name] = country[1].type;
            const docRef = addDoc(collection(db, "kanto"), {
              name: country[1].name,
              type: country[1].type
              });
            console.log(caughtPokemon);
          }
          if(e.target.checked == false) {
            delete caughtPokemon.Kanto[country[1].name];
            console.log(caughtPokemon);
          }
        }}/>
        {country[1].name}
        </li>
        ))}
        {Sinnoh.filter(pokemon => {if(value == null) {return} else{return pokemon[1].name.includes(value)}}).map((country) => (
        <li style={{background:"var(--"+country[1].type+")", }} class="filler" onClick={() => changeGIF(country[1].name)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country[1].name + '.png'} alt='Bulbasaur'/>
        <Checkbox {...Sinnoh} color="default" onChange={e => {
          if(e.target.checked == true) {
            caughtPokemon.Kanto[country[1].name] = country[1].type;
            const docRef = addDoc(collection(db, "kanto"), {
              name: country[1].name,
              type: country[1].type
              });
            console.log(caughtPokemon);
          }
          if(e.target.checked == false) {
            delete caughtPokemon.Kanto[country[1].name];
            console.log(caughtPokemon);
          }
        }}/>
        {country[1].name}
        </li>
        ))}
        {Unova.filter(pokemon => {if(value == null) {return} else{return pokemon[1].name.includes(value)}}).map((country) => (
        <li style={{background:"var(--"+country[1].type+")", }} class="filler" onClick={() => changeGIF(country[1].name)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country[1].name + '.png'} alt='Bulbasaur'/>
        <Checkbox {...Unova} color="default" onChange={e => {
          if(e.target.checked == true) {
            caughtPokemon.Kanto[country[1].name] = country[1].type;
            const docRef = addDoc(collection(db, "kanto"), {
              name: country[1].name,
              type: country[1].type
              });
            console.log(caughtPokemon);
          }
          if(e.target.checked == false) {
            delete caughtPokemon.Kanto[country[1].name];
            console.log(caughtPokemon);
          }
        }}/>
        {country[1].name}
        </li>
        ))}
        {Kalos.filter(pokemon => {if(value == null) {return} else{return pokemon[1].name.includes(value)}}).map((country) => (
        <li style={{background:"var(--"+country[1].type+")", }} class="filler" onClick={() => changeGIF(country[1].name)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country[1].name + '.png'} alt='Bulbasaur'/>
        <Checkbox {...Kalos} color="default" onChange={e => {
          if(e.target.checked == true) {
            caughtPokemon.Kanto[country[1].name] = country[1].type;
            const docRef = addDoc(collection(db, "kanto"), {
              name: country[1].name,
              type: country[1].type
              });
            console.log(caughtPokemon);
          }
          if(e.target.checked == false) {
            delete caughtPokemon.Kanto[country[1].name];
            console.log(caughtPokemon);
          }
        }}/>
        {country[1].name}
        </li>
        ))}
        {Alola.filter(pokemon => {if(value == null) {return} else{return pokemon[1].name.includes(value)}}).map((country) => (
        <li style={{background:"var(--"+country[1].type+")", }} class="filler" onClick={() => changeGIF(country[1].name)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/sword-shield/icon/' + country[1].name + '.png'} alt='Bulbasaur'/>
        <Checkbox {...Alola} color="default" onChange={e => {
          if(e.target.checked == true) {
            caughtPokemon.Kanto[country[1].name] = country[1].type;
            const docRef = addDoc(collection(db, "kanto"), {
              name: country[1].name,
              type: country[1].type
              });
            console.log(caughtPokemon);
          }
          if(e.target.checked == false) {
            delete caughtPokemon.Kanto[country[1].name];
            console.log(caughtPokemon);
          }
        }}/>
        {country[1].name}
        </li>
        ))}
        {Galar.filter(pokemon => {if(value == null) {return} else{return pokemon[1].name.includes(value)}}).map((country) => (
        <li style={{background:"var(--"+country[1].type+")", }} class="filler" onClick={() => changeGIF(country[1].name)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/sword-shield/icon/' + country[1].name + '.png'} alt='Bulbasaur'/>
        <Checkbox {...Galar} color="default" onChange={e => {
          if(e.target.checked == true) {
            caughtPokemon.Kanto[country[1].name] = country[1].type;
            const docRef = addDoc(collection(db, "kanto"), {
              name: country[1].name,
              type: country[1].type
              });
            console.log(caughtPokemon);
          }
          if(e.target.checked == false) {
            delete caughtPokemon.Kanto[country[1].name];
            console.log(caughtPokemon);
          }
        }}/>
        {country[1].name}
        </li>
        ))}
        </ul>
        </div>
        <div class="pokemonGIF">
          <Image class="GIFBackground" src={pokemonBackground}/>
          <Image id="test" class="displayGIF" width='inherit'height='500'src=""/>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const app = initializeApp(firebaseConfig);
  var dataKanto = [];
  {const dbRef = ref(getDatabase());
    var pokeExample = "sn";
    await get(child(dbRef, 'kanto')).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot = snapshot.toJSON();
        for(var i in snapshot) {
            dataKanto.push([i, snapshot[i]]);
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });}

  var dataJohto = [];
  {const dbRef = ref(getDatabase());
    await get(child(dbRef, 'johto')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot = snapshot.toJSON();
            for(var i in snapshot) {
                dataJohto.push([i, snapshot[i]]);
            }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });}
  var dataHoenn = [];
  {const dbRef = ref(getDatabase());
    await get(child(dbRef, 'hoenn')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot = snapshot.toJSON();
            for(var i in snapshot) {
              dataHoenn.push([i, snapshot[i]]);
            }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });}
  var dataSinnoh = [];
  {const dbRef = ref(getDatabase());
    await get(child(dbRef, 'sinnoh')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot = snapshot.toJSON();
            for(var i in snapshot) {
                dataSinnoh.push([i, snapshot[i]]);
            }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });}
  var dataUnova = [];
  {const dbRef = ref(getDatabase());
    await get(child(dbRef, 'unova')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot = snapshot.toJSON();
            for(var i in snapshot) {
                dataUnova.push([i, snapshot[i]]);
            }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });}
  var dataKalos = [];
  {const dbRef = ref(getDatabase());
    await get(child(dbRef, 'kalos')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot = snapshot.toJSON();
            for(var i in snapshot) {
                dataKalos.push([i, snapshot[i]]);
            }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });}
  var dataAlola = [];
  {const dbRef = ref(getDatabase());
    await get(child(dbRef, 'alola')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot = snapshot.toJSON();
            for(var i in snapshot) {
                dataAlola.push([i, snapshot[i]]);
            }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });}
  var dataGalar = [];
  {const dbRef = ref(getDatabase());
    await get(child(dbRef, 'galar')).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot = snapshot.toJSON();
            for(var i in snapshot) {
                dataGalar.push([i, snapshot[i]]);
            }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });}
  return {
    props: {
     Johto: dataJohto,
     Kanto: dataKanto,
     Hoenn: dataHoenn,
     Sinnoh: dataSinnoh,
     Unova: dataUnova,
     Kalos: dataKalos,
     Alola: dataAlola,
     Galar: dataGalar
    },
  }
}
export default Home;
