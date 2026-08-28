import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ReviewTable = ({ reviews }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  let filteredData = reviews.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (sortKey) {
    filteredData = [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (key) => {
    setSortOrder(sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <p className="text-sm text-gray-600 mt-2">Showing {filteredData.length} of {reviews.length} records</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              {['id', 'userName', 'movieTitle', 'rating', 'reviewText', 'status', 'date'].map(key => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    {key === 'id' ? 'ID' : key === 'userName' ? 'User Name' : 
                     key === 'movieTitle' ? 'Movie' : key === 'rating' ? 'Rating' : 
                     key === 'reviewText' ? 'Review' : key === 'status' ? 'Status' : 'Date'}
                    {sortKey === key && (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map(review => (
              <tr key={review.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{review.id}</td>
                <td className="px-6 py-4 text-sm font-medium">{review.userName}</td>
                <td className="px-6 py-4 text-sm">{review.movieTitle}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                    ⭐ {review.rating}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{review.reviewText.substring(0, 40)}...</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    review.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    review.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {review.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{review.date}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewTable;
