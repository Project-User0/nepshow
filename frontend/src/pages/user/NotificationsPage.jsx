import { useState, useEffect } from 'react'
import Usernav from '../../components/user/Usernav'
import { deleteNotification, getUserNotifications, markNotificationAsRead } from '../../utils/paymentAPI'

function Notification() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getUserNotifications()
      if (response.success) {
        setNotifications(response.data?.notifications || [])
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch notifications')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId)
      setNotifications(notifications.map(n => 
        n._id === notificationId ? { ...n, isRead: true } : n
      ))
    } catch (err) {
      setError(err.message || 'Failed to mark notification as read')
    }
  }

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId)
      setNotifications(notifications.filter(n => n._id !== notificationId))
    } catch (err) {
      setError(err.message || 'Failed to delete notification')
    }
  }

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'payment_success':
        return '💳'
      case 'payment_failed':
        return '❌'
      case 'new_movie':
        return '🎬'
      case 'subscription_expiring':
        return '⏰'
      case 'subscription_expired':
        return '⛔'
      case 'comment_reply':
        return '💬'
      case 'system':
        return 'ℹ️'
      default:
        return '🔔'
    }
  }

  const formatDate = (date) => {
    const now = new Date()
    const notificationDate = new Date(date)
    const diffMs = now - notificationDate
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return notificationDate.toLocaleDateString()
  }

  return (
    <>
      <div className="w-full">
        <Usernav />
        <div className="min-h-screen bg-gray-950 mt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Notifications</h1>
              <p className="text-gray-400">Stay updated with latest activity</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900 border border-red-700 text-red-100 rounded-lg">
                {error}
              </div>
            )}

            {/* Notifications List */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`rounded-lg border transition p-5 flex items-start justify-between ${
                      notification.isRead
                        ? 'bg-gray-900 border-gray-700'
                        : 'bg-gray-800 border-blue-600'
                    }`}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className="text-3xl mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {notification.title}
                            </h3>
                            <p className="text-gray-300 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-xs text-gray-500">
                                {formatDate(notification.createdAt)}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                notification.type.includes('payment') ? 'bg-purple-900 text-purple-200' :
                                notification.type.includes('movie') ? 'bg-blue-900 text-blue-200' :
                                notification.type.includes('subscription') ? 'bg-yellow-900 text-yellow-200' :
                                'bg-gray-700 text-gray-200'
                              }`}>
                                {notification.type.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-semibold px-3 py-1 rounded hover:bg-blue-900 hover:bg-opacity-30 transition"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="text-red-400 hover:text-red-300 text-sm font-semibold px-3 py-1 rounded hover:bg-red-900 hover:bg-opacity-30 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification


