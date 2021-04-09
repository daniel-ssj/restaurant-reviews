import React, { useContext, useState } from 'react'

import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('Price range')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await RestaurantFinder.post('/', {
        name,
        location,
        price_range: priceRange,
      })
      addRestaurants(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form action=''>
        <div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              className='form-control'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className='form-group'
            >
              <option disabled>Price range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$$</option>
            </select>
          </div>
          <button
            className='btn btn-primary mb-3 mt-3'
            type='submit'
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
