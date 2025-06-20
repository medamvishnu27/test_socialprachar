// Blog.js
import { useState, useEffect } from 'react';
import { ChevronRight, Clock, Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { db } from '../../firebase';
import { collection, getDocs, orderBy} from 'firebase/firestore';
import Sidebar from './Asidebar';
import Footer from './../footer/footer';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [blogPosts, setBlogPosts] = useState(null);
    const [featuredPost, setFeaturedPost] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 8; // Adjust based on your total pages

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch blog posts
                const postsSnapshot = await getDocs(collection(db, 'blog'), orderBy("createdAt", "desc"));
                const postsData = postsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBlogPosts(postsData);

                // Fetch the latest featured post (most recent blog post)
                if (postsData.length > 0) {
                    setFeaturedPost(postsData[0]); // Set the latest post as featured
                }

                // Fetch categories
                const categoriesSnapshot = await getDocs(collection(db, 'blog'));
                const categoriesData = categoriesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCategories(categoriesData);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center space-y-4">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0"></div>
                    </div>
                    <p className="text-gray-600 font-medium">Loading amazing content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
                    <p className="text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>access the different of courses using our course Blog | social parchar</title>
            </Helmet>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
                {/* Main content */}
                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Featured post */}
                    {featuredPost && (
                        <div className="mb-16 transform transition-all duration-500 hover:scale-[1.02]">
                            <div className="flex items-center space-x-3 mb-8">
                                {/* <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div> */}
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                                    Featured Story
                                </h2>
                            </div>
                            
                            <div className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                 onClick={() => navigate(`/courseBlog/${featuredPost.id}`)}>
                                <div className="lg:flex">
                                    <div className="lg:w-1/2 relative overflow-hidden">
                                        <img
                                            className="w-full  lg:h-96  transition-transform duration-700 group-hover:scale-110"
                                            src={featuredPost.imageUrl}
                                            alt="Featured post"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex items-center space-x-4 mb-6">
                                            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                                                {featuredPost.category}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-600 flex items-center space-x-2">
                                                <Clock className="h-4 w-4" />
                                                <span className="font-medium">{featuredPost.readTime}</span>
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
                                            {featuredPost.title}
                                        </h3>
                                        <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
                                            {featuredPost.excerpt}
                                        </p>
                                        
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                                    <User className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{featuredPost.author}</p>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                        <Calendar className="h-3 w-3" />
                                                        <time dateTime={featuredPost.date}>{featuredPost.date}</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col xl:flex-row space-y-12 xl:space-y-0 xl:space-x-12">
                        {/* Blog posts */}
                        <div className="xl:w-2/3">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Latest Articles</h1>
                                    <p className="text-gray-600">Discover insights, tips, and stories from our community</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {blogPosts.map((post, index) => (
                                    <article 
                                        key={post.id} 
                                        className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
                                        onClick={() => navigate(`/courseBlog/${post.id}`)}
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            animation: 'fadeInUp 0.6s ease-out forwards'
                                        }}
                                    >
                                        <div className="md:flex">
                                            <div className="md:w-80 relative overflow-hidden">
                                                <img
                                                    className="h-64 md:h-full w-full  transition-transform duration-700 group-hover:scale-110"
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className="flex-1 p-8">
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-200">
                                                        {post.category}
                                                    </span>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="text-sm text-gray-500 flex items-center space-x-1">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{post.readTime}</span>
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                        <Calendar className="h-4 w-4" />
                                                        <time dateTime={post.date}>{post.date}</time>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
                                                        <span className="text-sm font-medium">Read more</span>
                                                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Enhanced Pagination */}
                            <div className="flex justify-center items-center space-x-3 mt-16">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                    className="flex items-center justify-center m-1  w-12 h-12 border border-gray-300 text-sm font-medium rounded-5 text-gray-700 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </button>
                                
                                <div className="flex space-x-2">
                                    {(() => {
                                        const getPaginationRange = () => {
                                            if (totalPages <= 3) {
                                                return Array.from({ length: totalPages }, (_, i) => i + 1);
                                            }
                                            
                                            if (currentPage <= 2) {
                                                return [1, 2, 3];
                                            }
                                            
                                            if (currentPage >= totalPages - 1) {
                                                return [totalPages - 2, totalPages - 1, totalPages];
                                            }
                                            
                                            return [currentPage - 1, currentPage, currentPage + 1];
                                        };

                                        return getPaginationRange().map(pageNumber => (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`w-12 h-12 text-sm m-2 font-medium rounded-full rounded-4 transition-all duration-300 ${
                                                    currentPage === pageNumber 
                                                        ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg transform scale-110 border-2 border-indigo-300' 
                                                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-lg'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        ));
                                    })()}
                                    
                                    {currentPage < totalPages - 2 && totalPages > 3 && (
                                        <span className="flex items-center px-2 text-gray-400">...</span>
                                    )}
                                </div>
                                
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center justify-center w-12 h-12 border border-gray-300 text-sm font-medium rounded-5 text-gray-700 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="xl:w-1/3">
                            <Sidebar featuredPost={featuredPost} categories={categories} />
                        </div>
                    </div>
                </main>
                <Footer/>
                
                {/* Add custom CSS for animations */}
                <style jsx>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .line-clamp-2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    
                    .line-clamp-3 {
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                `}</style>
            </div>
        </>
    );
};

export default Blog;