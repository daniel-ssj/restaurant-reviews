import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import RestaurantFinder from '../apis/RestaurantFinder'
import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { Reviews } from '../components/Reviews'
import { Link } from 'react-router-dom'

const RestaurantDetailPage = ({ isAuthenticated }) => {
  const { id } = useParams()
  const history = useHistory()
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestaurantFinder.get(`/${id}`)
        setSelectedRestaurant(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    //console.log(selectedRestaurant[0][0].name)
    fetchData()
  }, [])

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className='text-center display-1 mt-3'>
            {selectedRestaurant[0][0].name +
              ' - ' +
              selectedRestaurant[0][0].location}
          </h1>
          <div className='mt-3'>
            <div className='text-center'>
              <StarRating rating={selectedRestaurant[0][0].average_rating} />
              <span className='text-warning ml-5'>
                {selectedRestaurant[1].length
                  ? `(${selectedRestaurant[1].length})`
                  : '(0)'}
              </span>
              <a onClick={() => history.push('/')} style={{ float: 'right' }}>
                Return home
              </a>
            </div>
            <div className='mt-3'>
              <Reviews reviews={selectedRestaurant[1]} />
            </div>
          </div>
          {isAuthenticated ? (
            <AddReview />
          ) : (
            <p className='mt-3 text-cemter'>
              You need to <Link to='/login'>login</Link> to add a review
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default RestaurantDetailPage
