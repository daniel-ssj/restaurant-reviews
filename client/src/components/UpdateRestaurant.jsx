import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = (props) => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState(0)
  const { id } = useParams()
  let history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      const res = await RestaurantFinder.get(`/${id}`)
      setName(res.data[0].name)
      setLocation(res.data[0].location)
      setPriceRange(res.data[0].price_range)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      })
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            id='name'
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type='text'
            id='location'
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='price_range'>Price range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id='price_range'
            className='form-control'
          >
            <option disabled>Price range</option>
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$$</option>
          </select>
        </div>
        <button className='btn btn-primary' onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
