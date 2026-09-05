import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import MovieTable from './MovieTable';
import MovieForm from './MovieForm';
import { apiClient } from '../../../utils/api';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    loadMovies();
     }, [page]);

  const loadMovies = async () => {
    try {
      setLoading(true);
         const response = await apiClient.get('/movies', { params: { page, limit: 10 } });
      const movieList = response?.data?.data?.movies || response?.data?.data || [];
         setPagination(response?.data?.data?.pagination || null);
      setMovies(movieList);
    } catch (error) {
      console.error('Failed to fetch movies', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleSaveMovie = async (movieData) => {
    try {
      if (editingMovie) {
        await apiClient.put(`/movies/${editingMovie._id || editingMovie.id}`, movieData);
      } else {
        await apiClient.post('/movies', movieData);
      }

      await loadMovies();
      setShowForm(false);
      setEditingMovie(null);
    } catch (error) {
      console.error('Failed to save movie', error);
      alert(error?.response?.data?.message || 'Failed to save movie');
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;

    try {
      await apiClient.delete(`/movies/${id}`);
      await loadMovies();
    } catch (error) {
      console.error('Failed to delete movie', error);
      alert(error?.response?.data?.message || 'Failed to delete movie');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Movie Management</h1>
          <p className="text-gray-600 mt-1">Manage all movies in the system</p>
        </div>
        <button onClick={handleAddMovie} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <Plus size={20} />
          Add Movie
        </button>
      </div>

      {loading ? <p className="text-gray-600">Loading movies...</p> : <MovieTable movies={movies} pagination={pagination} onPageChange={setPage} onEdit={handleEditMovie} onDelete={handleDeleteMovie} />}

      {showForm && (
        <MovieForm movie={editingMovie} onSave={handleSaveMovie} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default MovieManagement;
