import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, ChevronRight, BookOpen, TrendingUp, Star, Eye, Calendar, User } from 'lucide-react';

const Asidebar = ({ featuredPost, categories, popularPosts = [] }) => {
  const navigate = useNavigate();

  // Mock popular posts if not provided
  const defaultPopularPosts = [
    { id: 1, title: "Getting Started with React Hooks", views: "2.1k", category: "React" },
    { id: 2, title: "Modern CSS Grid Techniques", views: "1.8k", category: "CSS" },
    { id: 3, title: "JavaScript Best Practices 2024", views: "3.2k", category: "JavaScript" }
  ];

  const postsToShow = popularPosts.length > 0 ? popularPosts : defaultPopularPosts;

  return (
    <aside className="space-y-8">
      {/* About Blog Section */}
      <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">About Our Blog</h3>
        </div>
        
        <p className="text-gray-600 leading-relaxed mb-6">
          {featuredPost?.excerpt || 'Discover cutting-edge insights, comprehensive guides, and expert perspectives on technology, design, and business innovation.'}
        </p>
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/courseBlog/${featuredPost?.id}`)}
            className="group/btn flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium transition-all duration-300"
          >
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>Featured</span>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Tag className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Categories</h3>
        </div>
        
        <div className="space-y-3">
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <div
                key={cat.id || cat.name || index}
                className="group/item flex items-center justify-between p-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 cursor-pointer transition-all duration-300 border border-transparent hover:border-indigo-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center group-hover/item:from-indigo-200 group-hover/item:to-purple-200 transition-all duration-300">
                    <Tag className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-700 font-medium group-hover/item:text-indigo-600 transition-colors duration-300">
                    {cat.name || cat.category || 'Uncategorized'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover/item:bg-indigo-100 group-hover/item:text-indigo-600 transition-all duration-300">
                    {cat.count || Math.floor(Math.random() * 20) + 1}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 transform group-hover/item:translate-x-1 group-hover/item:text-indigo-500 transition-all duration-300" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Tag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No categories available yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Popular Posts Section */}
      {/* <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Popular Posts</h3>
        </div>
        
        <div className="space-y-4">
          {postsToShow.slice(0, 3).map((post, index) => (
            <div
              key={post.id || index}
              className="group/post flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 cursor-pointer transition-all duration-300 border border-transparent hover:border-orange-100"
              onClick={() => navigate(`/courseBlog/${post.id}`)}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center group-hover/post:from-orange-200 group-hover/post:to-red-200 transition-all duration-300">
                <span className="text-orange-600 font-bold text-sm">#{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 group-hover/post:text-orange-600 transition-colors duration-300 line-clamp-2 mb-2">
                  {post.title}
                </h4>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Newsletter Signup */}
      {/* <div className="group bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
          <p className="text-indigo-100 mb-6 text-sm leading-relaxed">
            Get the latest articles and insights delivered straight to your inbox.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
            />
            <button className="w-full bg-white text-indigo-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105">
              Subscribe Now
            </button>
          </div>
        </div>
      </div> */}

      {/* Stats Card */}
      {/* <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Blog Stats</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">127</div>
            <div className="text-sm text-gray-500">Articles</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">45k</div>
            <div className="text-sm text-gray-500">Readers</div>
          </div>
        </div>
      </div> */}
    </aside>
  );
};

export default Asidebar;