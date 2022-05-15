import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import styles from './countryPicker.module.css';
import {fetchCountryData} from '../../api'

export default function CountryPicker({handleCountry}) {
  const [fetchedCountries, setCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      setCountries(await fetchCountryData())
    }
    fetchCountries()
  }, [setCountries]);
  
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountry(e.target.value)}>
        <option value=''>Global</option>
        {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}
