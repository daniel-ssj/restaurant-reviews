import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {
  let getDatePosted = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    return new Date(date).toLocaleDateString('en-US', options)
  }

  return (
    <div className='row rows-cols-3 mb-2'>
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            className='card text-white bg-primary mb-3 mr-4'
            style={{ maxWidth: '30%', marginRight: 4 }}
          >
            <div className='card-header d-flex justify-content-between'>
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} />
              </span>
            </div>
            <div className='card-body'>
              <p className='card-text'>{review.review}</p>
            </div>
            <div className='card-footer'>
              {getDatePosted(review.date_posted)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { Reviews }
