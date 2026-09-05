import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Film,
  DollarSign,
  MessageSquare,
} from 'lucide-react';
import { apiClient } from '../../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [movies, setMovies] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userStatsRes, paymentStatsRes, moviesRes, paymentsRes] = await Promise.all([
          apiClient.get('/users/stats'),
          apiClient.get('/payments/stats'),
          apiClient.get('/movies?limit=3'),
          apiClient.get('/payments?limit=3'),
        ]);
        const userStats = userStatsRes.data?.data || {};
        const paymentStats = paymentStatsRes.data?.data || {};
        setStats({
          users: userStats.totalUsers || 0,
          activeUsers: userStats.activeUsers || 0,
          premiumUsers: userStats.premiumUsers || 0,
          revenue: paymentStats.totalRevenue || 0,
          monthlyUserGrowth: userStats.monthlyUserGrowth || [],
          weeklyUserGrowth: userStats.weeklyUserGrowth || [],
          monthlyRevenue: paymentStats.monthlyRevenue || [],
        });
        setMovies(moviesRes.data?.data?.movies || []);
        setPayments(paymentsRes.data?.data?.payments || []);
      } catch (error) {
        console.error('Dashboard data load failed', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const revenueByMonth = new Map(
    (stats?.monthlyRevenue || []).map((item) => [`${item._id.year}-${item._id.month}`, item.revenue]),
  );
  const revenueData = (stats?.monthlyUserGrowth || []).map((item) => ({
    month: new Date(item._id.year, item._id.month - 1).toLocaleString('en-US', { month: 'short' }),
    revenue: revenueByMonth.get(`${item._id.year}-${item._id.month}`) || 0,
    users: item.count,
  }));

  const movieData = [
    { name: 'Premium', value: Math.max(stats?.premiumUsers || 0, 1) },
    { name: 'Active', value: Math.max(stats?.activeUsers || 0, 1) },
    { name: 'Users', value: Math.max(stats?.users || 0, 1) },
  ];

  const userGrowthData = (stats?.weeklyUserGrowth || []).map((item) => ({
    day: new Date(`${item.date}T00:00:00`).toLocaleString('en-US', { weekday: 'short' }),
    newUsers: item.newUsers,
    activeUsers: item.activeUsers,
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.users?.toLocaleString() || '0',
      change: `${stats?.activeUsers || 0} active`,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Premium Users',
      value: stats?.premiumUsers?.toLocaleString() || '0',
      change: 'subscription active',
      icon: Film,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `Rs. ${Number(stats?.revenue || 0).toLocaleString()}`,
      change: 'from payments',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Recent Activity',
      value: payments.length.toString(),
      change: 'recent payments',
      icon: MessageSquare,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-green-600 text-sm mt-2 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon size={32} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Users Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue & Users Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue (Rs)" />
              <Bar dataKey="users" fill="#8b5cf6" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Movie Genre Distribution */}
        <div className="bg-white rounded-lg shadow-md p-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Users Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={movieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {movieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly User Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="newUsers"
              stroke="#10b981"
              name="New Users"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="#f59e0b"
              name="Active Users"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Movies */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Movies Added</h2>
          <div className="space-y-3 overflow-y-scroll h-64">
            {movies.map((movie) => (
              <div key={movie._id} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{movie.title}</p>
                  <p className="text-sm text-gray-500">{movie.createdAt ? new Date(movie.createdAt).toLocaleDateString() : '—'}</p>
                </div>
                <p className="text-sm font-semibold text-blue-600">{movie.rating || 0} rating</p>
              </div>
            ))}
            {!loading && movies.length === 0 && <p className="text-sm text-gray-500">No movies found.</p>}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Payments</h2>
          <div className="space-y-3 h-64 overflow-y-scroll">
            {payments.map((payment) => (
              <div key={payment._id} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{payment.user?.name || 'Unknown user'}</p>
                  <p className="text-sm text-gray-500">{payment.plan || 'Payment'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{payment.currency || 'Rs.'} {Number(payment.amount || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">{payment.status || 'pending'} · {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : '—'}</p>
                </div>
              </div>
            ))}
            {!loading && payments.length === 0 && <p className="text-sm text-gray-500">No payments found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
