import './SearchCountry.css';
import axios from 'axios';
import React from 'react'
import { useEffect , useState } from 'react';

export default function SearchCountry() {

    const [ countries ,setCountries ] = useState([]);
    const [ selectedCountry , setSelectedCountry ] = useState('');

    useEffect(() => {
        const fetchCountries =async()=>{
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(response.data)
        }
        fetchCountries();
    },[])

    const filteredCountries = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(selectedCountry.toLowerCase());
    })

  return (
    <div className='container'>
        <input type="search" name="search" className='search' 
        placeholder="Search for countries..."
        onChange={(e) =>setSelectedCountry(e.target.value)}
        />
        <div className='Allcards'>
        {
            filteredCountries.map((item,index) => {
                return (
                    <div className='card'>
                    <img src={item.flags.png} alt={item.name.common} className='flags'/>
                    <h3>{item.name.common}</h3>
                    </div>
                )
            })
        }
        </div>

    </div>
  )
}
