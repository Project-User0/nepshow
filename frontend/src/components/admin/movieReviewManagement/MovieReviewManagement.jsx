import React from 'react';
import ReviewTable from './ReviewTable';

const MovieReviewManagement = () => {
  const [reviews] = React.useState([
    {
      id: 1,
      userName: 'John Doe',
      movieTitle: 'Inception',
      rating: 4.5,
      reviewText: 'Amazing movie with mind-bending plot',
      status: 'Approved',
      date: '2024-05-20',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      movieTitle: 'The Matrix',
      rating: 5,
      reviewText: 'Revolutionary film that changed cinema',
      status: 'Approved',
      date: '2024-05-19',
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      movieTitle: 'Interstellar',
      rating: 4,
      reviewText: 'Great cinematography but a bit long',
      status: 'Pending',
      date: '2024-05-18',
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Movie Reviews</h1>
        <p className="text-gray-600 mt-1">View all user reviews (Admin cannot modify)</p>
      </div>

      <ReviewTable reviews={reviews} />
    </div>
  );
};

export default MovieReviewManagement;
