import React from "react";
import { Link } from "react-router-dom";

const destinations = [
    {
        to: "/data-science",
        title: "Data Science",
        description: "Comprehensive data science course",
        label: "Explore course",
        colSpan: "col-span-1",
        icon: (
            <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        to: "/full-stack-developer-course",
        title: "Full Stack",
        description: "Complete web development course",
        label: "Explore course",
        colSpan: "col-span-1",
        icon: (
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
    {
        to: "/digital-marketing-course-training-institute-hyderabad",
        title: "Digital Marketing",
        description: "Professional digital marketing training",
        label: "Explore course",
        colSpan: "md:col-span-3",
        icon: (
            <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
        ),
    },
];

const PageNotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
            <main className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full">
                    {/* Illustration and heading */}
                    <div className="text-center mb-8 md:mb-12 relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-5 pointer-events-none">
                            <svg className="w-64 h-64 sm:w-96 sm:h-96" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30,1h40l29,29v40l-29,29h-40l-29-29v-40z" stroke="currentColor" fill="none" strokeWidth="3" />
                                <path d="M31,3h38l28,28v38l-28,28h-38l-28-28v-38z" stroke="currentColor" fill="none" strokeWidth="3" />
                                <path d="M32,5h36l27,27v36l-27,27h-36l-27-27v-36z" stroke="currentColor" fill="none" strokeWidth="3" />
                            </svg>
                        </div>

                        <div className="relative">
                            <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                <span className="text-7xl sm:text-8xl md:text-9xl block font-black tracking-tighter">404</span>
                            </h1>
                            <div className="absolute inset-0 flex items-center justify-center opacity-5">
                                <svg className="w-48 h-48 sm:w-64 sm:h-64" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <span className="text-xl sm:text-2xl font-semibold block mt-4 text-gray-800">Page Not Found</span>

                        <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto my-4 sm:my-6 rounded-full"></div>

                        <p className="text-gray-600 max-w-lg mx-auto text-base sm:text-lg px-4 sm:px-0">
                            We couldn't find the page you were looking for. It might have been moved or doesn't exist.
                            Let's get you back on track.
                        </p>
                    </div>

                    {/* Popular destinations */}
                    <div className="flex flex-wrap gap-4 sm:gap-6 justify-center px-2 sm:px-0">
                        {destinations.map(({ to, title, description, label, icon }, idx) => (
                            <Link
                                key={idx}
                                to={to}
                                className="w-full sm:min-w-[280px] sm:max-w-xs md:max-w-sm bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 flex flex-col no-underline"
                            >
                                <div className="mb-3 sm:mb-4">{icon}</div>
                                <div className="text-lg sm:text-xl font-medium text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                    {title}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 no-underline border-none">
                                    {description}
                                </div>
                                <div className="mt-auto pt-1 sm:pt-2 text-blue-600 font-medium text-xs sm:text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200 no-underline border-none">
                                    {label}
                                    <svg
                                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:ml-2 transition-all duration-200"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Back to home button */}
                    <div className="mt-6 sm:mt-8 text-center px-2 sm:px-0">
                        <Link
                            to="/"
                            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all duration-200"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PageNotFound;