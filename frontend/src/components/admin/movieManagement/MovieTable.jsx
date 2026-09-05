import { useState } from 'react';
import { ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react';
import Pagination from '../../shared/Pagination';

const MovieTable = ({ movies, pagination, onPageChange, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  let filteredData = (movies || []).filter(item => {
    const searchable = [
      item.title,
      item.director,
      Array.isArray(item.genre) ? item.genre.join(', ') : item.genre,
      item.releaseYear,
      item.status,
      item.rating,
    ];

    return searchable.some(value => String(value || '').toLowerCase().includes(searchTerm.toLowerCase()));
  });

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
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <p className="text-sm text-gray-600 mt-2">Showing {filteredData.length} of {movies.length} records</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              {['id', 'title', 'genre', 'director', 'releaseYear', 'rating', 'status'].map(key => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    {key === 'id' ? 'ID' : key === 'title' ? 'Title' : key === 'genre' ? 'Genre' : 
                     key === 'director' ? 'Director' : key === 'releaseYear' ? 'Year' : 
                     key === 'rating' ? 'Rating' : 'Status'}
                    {sortKey === key && (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map(movie => {
              const movieId = movie._id || movie.id;
              return (
                <tr key={movieId} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{movieId}</td>
                  <td className="px-6 py-4 text-sm font-medium">{movie.title}</td>
                  <td className="px-6 py-4 text-sm">{Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</td>
                  <td className="px-6 py-4 text-sm">{movie.director}</td>
                  <td className="px-6 py-4 text-sm">{movie.releaseYear}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {movie.rating}⭐
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      movie.status === 'Completed' || movie.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {movie.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2 flex">
                    <button onClick={() => onEdit(movie)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => onDelete(movieId)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-medium">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination paginationData={pagination} onPageChange={onPageChange} />
    </div>
  );
};

export default MovieTable;
