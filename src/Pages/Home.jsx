import Carausel from "../component/Carausel";
import MidBanner from "../component/MidBanner";
import Features from "../component/Features";
import Navbar2 from "../component/Navbar2";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

  const [categories] = useState([
      {
        id: 1,
        name: 'Electronics',
        slug: 'electronics',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop',
        description: 'Latest gadgets and devices',
        productCount: 245,
        subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Smart Watches', 'Gaming']
      },
      {
        id: 2,
        name: 'Fashion',
        slug: 'clothes',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop',
        description: 'Clothing and accessories',
        productCount: 189,
        subcategories: ['Men', 'Women', 'Kids', 'Accessories', 'Shoes']
      },
      {
        id: 3,
        name: 'Home & Garden',
        slug: 'furniture',
        image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&auto=format&fit=crop',
        description: 'Furniture and decor',
        productCount: 156,
        subcategories: ['Furniture', 'Kitchen', 'Decor', 'Garden', 'Lighting']
      },
      {
        id: 4,
        name: 'Beauty',
        slug: 'beauty',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop',
        description: 'Cosmetics and skincare',
        productCount: 98,
        subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare', 'Tools']
      },
      {
        id: 5,
        name: 'Sports',
        slug: 'sports',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop',
        description: 'Sports equipment and gear',
        productCount: 76,
        subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Yoga', 'Cycling']
      },
      {
        id: 6,
        name: 'Books',
        slug: 'books',
        image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&auto=format&fit=crop',
        description: 'Books and magazines',
        productCount: 321,
        subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Business']
      },
      {
        id: 7,
        name: 'Toys & Games',
        slug: 'toys-games',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop',
        description: 'Toys and entertainment',
        productCount: 142,
        subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Educational', 'Outdoor']
      },
      {
        id: 8,
        name: 'Automotive',
        slug: 'automotive',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop',
        description: 'Car accessories and parts',
        productCount: 89,
        subcategories: ['Car Care', 'Interior', 'Exterior', 'Tools', 'Electronics']
      },
      {
        id: 9,
        name: 'Health',
        slug: 'health',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop',
        description: 'Health and wellness',
        productCount: 112,
        subcategories: ['Vitamins', 'Medical', 'Personal Care', 'Fitness', 'Wellness']
      },
      {
        id: 10,
        name: 'Office',
        slug: 'office',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop',
        description: 'Office supplies',
        productCount: 67,
        subcategories: ['Stationery', 'Furniture', 'Electronics', 'Storage', 'Supplies']
      },
      {
        id: 11,
        name: 'Jewelry',
        slug: 'jewelry',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop',
        description: 'Fine jewelry and watches',
        productCount: 54,
        subcategories: ['Necklaces', 'Rings', 'Watches', 'Bracelets', 'Earrings']
      },
      {
        id: 12,
        name: 'Food & Beverage',
        slug: 'Food',
        image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&auto=format&fit=crop',
        description: 'Gourmet food and drinks',
        productCount: 203,
        subcategories: ['Snacks', 'Beverages', 'Organic', 'International', 'Specialty']
      }
    ]);
          
    return (
      
      <>
      <Navbar2/>
      <div className="overflow-x-hidden">
        <Carausel />
        <div className="py-8 px-4 sm:px-6 lg:px-8">
      
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/categories/${category.slug}`}
                      className="group bg-white rounded-xl shadow border overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-xl font-bold">{category.name}</h3>
                          <p className="text-sm text-white/80">{category.description}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            {category.subcategories.slice(0, 3).map(sub => sub).join(', ')}
                            {category.subcategories.length > 3 && '...'}
                          </div>
                          <div className="text-primary font-semibold">
                            {category.productCount} products
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
                </div>
        <MidBanner />
        
        <Features />
      </div>
      <Footer/>
      </>
      
    );
  }

export default Home;
