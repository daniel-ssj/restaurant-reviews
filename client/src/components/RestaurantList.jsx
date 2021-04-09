import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import StarRating from './StarRating'

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)
  let history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestaurantFinder.get('')
        setRestaurants(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    try {
      const res = await RestaurantFinder.delete(`/${id}`)
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdate = (id, e) => {
    e.stopPropagation()
    history.push(`/restaurants/${id}/update`)
  }

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) => {
    if (!restaurant.count) return <span>0 Reviews</span>
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span style={{ marginLeft: '0.5rem' }}>{`(${restaurant.count})`}</span>
      </>
    )
  }

  return (
    <div className='list-group'>
      <table className='table table-striped table-hover'>
        <thead>
          <tr className='bg-primary' style={{ color: '#e0e0e0' }}>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => {
            return (
              <tr
                key={restaurant.id}
                onClick={() => handleRestaurantSelect(restaurant.id)}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td>
                  <button
                    onClick={(e) => handleUpdate(restaurant.id, e)}
                    className='btn btn-warning'
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(restaurant.id, e)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
