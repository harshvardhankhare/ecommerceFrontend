import React from 'react';

const TopProducts = () => {
  const products = [
    { name: 'Wireless Headphones', sales: 1245, revenue: '$24,900', growth: '+25%' },
    { name: 'Smart Watch Series 5', sales: 892, revenue: '$44,600', growth: '+18%' },
    { name: 'Laptop Backpack', sales: 756, revenue: '$15,120', growth: '+12%' },
    { name: 'Bluetooth Speaker', sales: 634, revenue: '$12,680', growth: '+8%' },
    { name: 'USB-C Hub', sales: 521, revenue: '$10,420', growth: '+5%' },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">Top Selling Products</h2>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="font-bold text-gray-600">{index + 1}</span>
              </div>
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">{product.sales} units sold</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{product.revenue}</p>
              <p className="text-sm text-green-500">{product.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;