import React, { useEffect, useState } from 'react';
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
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userStatsRes, paymentStatsRes] = await Promise.all([
          apiClient.get('/users/stats'),
          apiClient.get('/payments/stats'),
        ]);
        setStats({
          users: userStatsRes.data?.data?.totalUsers || 0,
          activeUsers: userStatsRes.data?.data?.activeUsers || 0,
          premiumUsers: userStatsRes.data?.data?.premiumUsers || 0,
          movies: 0,
          revenue: paymentStatsRes.data?.data?.totalRevenue || 0,
          reviews: 0,
        });
        setPayments(paymentStatsRes.data?.data?.monthlyRevenue || []);
      } catch (error) {
        console.error('Dashboard data load failed', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const revenueData = [
    { month: 'Jan', revenue: 4000, users: 2400 },
    { month: 'Feb', revenue: 3000, users: 1398 },
    { month: 'Mar', revenue: 2000, users: 9800 },
    { month: 'Apr', revenue: 2780, users: 3908 },
    { month: 'May', revenue: 1890, users: 4800 },
    { month: 'Jun', revenue: 2390, users: 3800 },
  ];

  const movieData = [
    { name: 'Premium', value: Math.max(stats?.premiumUsers || 0, 1) },
    { name: 'Active', value: Math.max(stats?.activeUsers || 0, 1) },
    { name: 'Users', value: Math.max(stats?.users || 0, 1) },
  ];

  const userGrowthData = [
    { day: 'Mon', newUsers: 120, activeUsers: 2400 },
    { day: 'Tue', newUsers: 132, activeUsers: 2210 },
    { day: 'Wed', newUsers: 101, activeUsers: 2290 },
    { day: 'Thu', newUsers: 134, activeUsers: 2000 },
    { day: 'Fri', newUsers: 90, activeUsers: 2181 },
    { day: 'Sat', newUsers: 230, activeUsers: 2500 },
    { day: 'Sun', newUsers: 200, activeUsers: 2100 },
  ];

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
      change: 'monthly entries',
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
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
              <Bar dataKey="users" fill="#8b5cf6" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Movie Genre Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Movie by Genre</h2>
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
          <div className="space-y-3">
            {[
              { title: 'Inception', date: '2 days ago', views: 1230 },
              { title: 'The Matrix', date: '5 days ago', views: 892 },
              { title: 'Interstellar', date: '1 week ago', views: 2145 },
            ].map((movie, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{movie.title}</p>
                  <p className="text-sm text-gray-500">{movie.date}</p>
                </div>
                <p className="text-sm font-semibold text-blue-600">{movie.views} views</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reviews</h2>
          <div className="space-y-3">
            {[
              { user: 'John Doe', movie: 'Avatar', rating: 4.5, date: '1 hour ago' },
              { user: 'Jane Smith', movie: 'Titanic', rating: 5, date: '3 hours ago' },
              { user: 'Mike Johnson', movie: 'Avengers', rating: 4, date: '5 hours ago' },
            ].map((review, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{review.user}</p>
                  <p className="text-sm text-gray-500">{review.movie}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
