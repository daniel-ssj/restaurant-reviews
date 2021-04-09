import React, { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import AuthApi from '../apis/AuthApi'

const AddReview = () => {
  const [reviewText, setReview] = useState('')
  const [rating, setRating] = useState('Rating')
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userName = await AuthApi.get('/user', {
        headers: {
          token: localStorage.token,
        },
      })

      const res = await RestaurantFinder.post(`/${id}/addreview`, {
        restaurant_id: id,
        name: userName.data.name,
        review: reviewText,
        rating,
      })
      history.push('/')
      history.push(location.pathname)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='mb-2'>
      <form action=''>
        <div className='form-row'>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <br />
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id='rating'
              className='custom-select'
            >
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='review'>Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReview(e.target.value)}
            id='review'
            className='form-control'
          ></textarea>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddReview
