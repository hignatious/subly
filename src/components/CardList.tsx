import { useEffect, useState } from 'react';
import { Card } from './Card';
import { Medium } from '../Types';
import { Button } from './Button';
import { ShowError } from './ShowError';

// Curried functions are neat
const toggleFilter = (list: string[], setFunction: (newList: string[]) => void) => (value: string, ) => {
  if (list.includes(value)) setFunction(list.filter(s => s !== value))
  else setFunction(list.concat([value]))
}

interface FilterButtonProps {
  value: string,
  filtered: string[],
  toggle: (val: string) => void
}

const FilterButton = ({value, filtered, toggle}: FilterButtonProps) => {
  const inactiveFilterStyle = "bg-white hover:bg-gray-200 text-gray-700 border-gray-700"
  const activeFilterStyle = "bg-gray-400 hover:bg-gray-300 text-gray-700 border-gray-700"
  return (
    <Button
      value={value}
      colorStyles={filtered.includes(value) ? activeFilterStyle : inactiveFilterStyle } onClick={() => toggle(value)}
    />
  )
}

export const CardList = () => {
    const url = process.env.REACT_APP_URL;


    const languages = ["en", "fr", "de", "es"]
    const [filterLanguages, setFilterLanguages] = useState<string[]>([])
    const toggleLanguage = toggleFilter(filterLanguages, setFilterLanguages);

    const statuses = ["ready", "transcribing", "error"]
    const [filterStatuses, setFilterStatuses] = useState<string[]>(statuses)
    const toggleStatus = toggleFilter(filterStatuses, setFilterStatuses);

    const [ data, setData ] = useState<Medium[]>([])
    const [ error, setError ] = useState("")
    const [ filteredData, setFilteredData ] = useState<Medium[]>([])
  
    useEffect(() => {
      if (url) {
        // I like using promise chains sometimes, they are interoperable with async-await
        // since useEffect requires synchronous functions I find this approach simpler.
        fetch(url)
        .then(res => res.json())
        .then(setData)
        .catch(e => {
          console.error(e);
          setData([]);
          setError(e.message);
        });
      }
      else {
        const err = "Configuration Error: REACT_APP_URL was not set during build, please check your .env file and rebuild."
        console.error(err)
        setData([])
        setError(err)
      }
    }, [url]);

    useEffect(() => {
      const filtered = data.filter(row => {
        let result = filterStatuses.includes(row.status);
        for (const lang of filterLanguages) {
          if (!row.languages.includes(lang)) {
            result = false;
            break;
          }
        }
        return result
      })
      setFilteredData(filtered)
    }, [data, filterLanguages, filterStatuses]);


    if (error) {
      // I actually did have errors when trying to access the original URL so this seemed like a good opportunity to have a re-useable ShowError component
      return (
        <div className='bg-red-100 text-gray-700 m-auto max-w-screen-lg'>
          <ShowError>{error}</ShowError>
        </div>
      )
    }

    return (
        
        <div>
          <div className='p-7 mx-auto max-w-screen-lg text-sm font-semibold'>
              <h1 className='text-lg'>Filters</h1>
              Show Status: 
              <div className='mb-2'>{statuses.map(status => (<FilterButton value={status} filtered={filterStatuses} toggle={toggleStatus} />))}</div>
              Show with languages:
              <div className='mb-2'>{languages.map(lang => (<FilterButton value={lang} filtered={filterLanguages} toggle={toggleLanguage} />))}</div>
          </div>
          
          <div className="flex justify-evenly flex-wrap m-auto max-w-screen-lg">
            {filteredData.map((row) => (<Card data={row} />))}
          </div>
        </div>
    )
}