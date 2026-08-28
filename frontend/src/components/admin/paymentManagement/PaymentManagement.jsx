import React, { useEffect, useState } from 'react';
import PaymentTable from './PaymentTable';
import { fetchPaymentsAPI } from '../../../utils/api';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const response = await fetchPaymentsAPI();
        const list = response?.data?.payments || [];
        setPayments(list.map((payment, index) => ({
          id: index + 1,
          transactionId: payment.transactionId,
          userName: payment.user?.name || 'Unknown',
          amount: payment.amount,
          paymentMethod: payment.paymentMethod?.replace('_', ' ') || 'N/A',
          status: payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1),
          date: payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : '—',
        })));
      } catch (err) {
        setError(err.message || 'Unable to fetch payments');
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
        <p className="text-gray-600 mt-1">View all payment transactions (View-only)</p>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      {loading ? <div className="rounded-lg bg-white p-6 text-gray-600">Loading payments...</div> : <PaymentTable payments={payments} />}
    </div>
  );
};

export default PaymentManagement;
