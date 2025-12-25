import React from 'react';

const RecentOrders = () => {
  const orders = [
    { id: '#ORD-001', customer: 'John Smith', date: '2024-01-15', amount: '$245.99', status: 'Delivered', statusColor: 'bg-green-100 text-green-800' },
    { id: '#ORD-002', customer: 'Emma Johnson', date: '2024-01-15', amount: '$89.50', status: 'Processing', statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: '#ORD-003', customer: 'Michael Brown', date: '2024-01-14', amount: '$1,245.00', status: 'Delivered', statusColor: 'bg-green-100 text-green-800' },
    { id: '#ORD-004', customer: 'Sarah Davis', date: '2024-01-14', amount: '$67.99', status: 'Shipped', statusColor: 'bg-blue-100 text-blue-800' },
    { id: '#ORD-005', customer: 'Robert Wilson', date: '2024-01-13', amount: '$534.25', status: 'Pending', statusColor: 'bg-gray-100 text-gray-800' },
    { id: '#ORD-006', customer: 'Lisa Anderson', date: '2024-01-13', amount: '$321.75', status: 'Cancelled', statusColor: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recent Orders</h2>
        <button className="text-primary hover:text-primary-dark text-sm font-semibold">
          View All →
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Order ID</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Customer</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Date</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Amount</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4 font-medium">{order.id}</td>
                <td className="py-4 px-4">{order.customer}</td>
                <td className="py-4 px-4 text-gray-500">{order.date}</td>
                <td className="py-4 px-4 font-semibold">{order.amount}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-primary hover:text-primary-dark text-sm font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;