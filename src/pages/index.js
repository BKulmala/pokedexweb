import Head from 'next/head'
import Image from 'next/image'
import { Girassol, Inter } from 'next/font/google'
import pokemonBackground from './../../public/grid.png'
import React, {useState, useEffect } from 'react'
import { supabase } from '../../api'
const inter = Inter({ subsets: ['latin'] })

function changeGIF(pokemon) {
  var img = document.getElementById("test");
  img.src = "https://projectpokemon.org/images/normal-sprite/" + pokemon + ".gif";
}



function Home({ Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar }) {
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
        <ul>
      {Kanto.map((country) => (
        <li style={{background:"var(--"+country.type+")", }} class="filler" onClick={() => changeGIF(country.Pokemon)} key={country.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country.Pokemon + '.png'} alt='country.Pokemon'/>
          <br /><br />
          {country.Pokemon}
          </li>
      ))}
      {Johto.map((country) => (
        <li style={{background:"var(--"+country.type+")", }} class="filler" onClick={() => changeGIF(country.Pokemon)} key={country.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {country.Pokemon}
          </li>
      ))}
      {Hoenn.map((country) => (
        <li style={{background:"var(--"+country.type+")", }} class="filler" onClick={() => changeGIF(country.Pokemon)} key={country.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {country.Pokemon}
          </li>
      ))}
      {Sinnoh.map((country) => (
        <li style={{background:"var(--"+country.type+")", }} class="filler" onClick={() => changeGIF(country.Pokemon)} key={country.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {country.Pokemon}
          </li>
      ))}
      {Unova.map((country) => (
        <li style={{background:"var(--"+country.type+")", }} class="filler" onClick={() => changeGIF(country.Pokemon)} key={country.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {country.Pokemon}
          </li>
      ))}
      {Kalos.map((country) => (
        <li style={{background:"var(--"+country.type+")", }} class="filler" onClick={() => changeGIF(country.Pokemon)} key={country.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {country.Pokemon}
          </li>
      ))}
      {Alola.map((country) => (
        <li style={{background:"var(--"+country.type+")", }} class="filler" onClick={() => changeGIF(country.Pokemon)} key={country.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/sun-moon/normal/' + country.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {country.Pokemon}
          </li>
      ))}
      {Galar.map((country) => (
        <li style={{background:"var(--"+country.type+")", }} class="filler" onClick={() => changeGIF(country.Pokemon)} key={country.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/sword-shield/normal/' + country.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {country.Pokemon}
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
  var dataKanto;
  {let { data } = await supabase.from('Kanto').select()
  dataKanto = data;}
  var dataJohto;
  {let { data } = await supabase.from('Johto').select()
  dataJohto = data;}
  var dataHoenn;
  {let { data } = await supabase.from('Hoenn').select()
  dataHoenn = data;}
  var dataSinnoh;
  {let { data } = await supabase.from('Sinnoh').select()
  dataSinnoh = data;}
  var dataUnova;
  {let { data } = await supabase.from('Unova').select()
  dataUnova = data;}
  var dataKalos;
  {let { data } = await supabase.from('Kalos').select()
  dataKalos = data;}
  var dataAlola;
  {let { data } = await supabase.from('Alola').select()
  dataAlola = data;}
  var dataGalar;
  {let { data } = await supabase.from('Galar').select()
  dataGalar = data;}
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