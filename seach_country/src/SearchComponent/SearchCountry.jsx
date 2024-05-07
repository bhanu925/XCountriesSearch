import './SearchCountry.css';
import axios from 'axios';
import React from 'react'
import { useEffect , useState } from 'react';

export default function SearchCountry() {

    const [ countries ,setCountries ] = useState([]);
    const [ selectedCountry , setSelectedCountry ] = useState('');

    useEffect(() => {
        const fetchCountries =async()=>{
            try{
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data)
            }
            catch(err){
                console.error(err);
            }           
        }
        fetchCountries();
    },[])

    const filteredCountries = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(selectedCountry.toLowerCase());
    })

  return (
    <div className='container'>
        <div>
            <input type="text" name="search" className='search' 
            placeholder="Search for countries..."
            onChange={(e) =>setSelectedCountry(e.target.value)}
            />
        </div>
       
        <div className='Allcards'>
        {
            filteredCountries.map((item,index) => {
                return (
                    <div className='card'>
                    <img src={item.flags.png} alt={item.name.common} className='flags'/>
                    <h2>{item.name.common}</h2>
                    </div>
                )
            })
        }
        </div>

    </div>
  )
}
