import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { auth } from './firebase';
import NavBar from './components/navBarComponent/navBar';
import ScrollToTop from './components/extraComponents/ScrollToTop.js';
import Loading from './components/extraComponents/loading.js';
import { WishListProvider } from './Dashboard/MenuBarComponents/WishListContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Aos from 'aos';
import 'aos/dist/aos.css';
import routes from './routes.js';
import PageNotFound from './components/pageNotFound/PageNotFound.js';
import QuickHelpButton from './components/quickHelp_Button/QuickHelpButton.js';
import appreciateImage from './assets/subscriptionpage/higherpackage.png';
import Confetti from 'react-confetti';
import { DateProvider } from './components/Forms/DateContext.js';
import { ArrowRight, Award, Gift, Search, X } from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Enhanced Course Meta Data Configuration
const courseMetaData = {
  'full-stack-developer-course': {
    title: 'Leading Full Stack Developer Course training institute with Placement | SocialPrachar',
    description: 'Master Full Stack Development with SocialPrachar\'s expert-led course. Learn MERN, Java, or Python stacks with real-time projects and 100% placement support.',
    keywords: 'full stack developer course, MERN, Java, Python, placement, web development, SocialPrachar',
    ogTitle: 'Full Stack Developer Course – MERN, Java & Python Tracks | SocialPrachar',
    ogDescription: 'Kickstart your career in web development with SocialPrachar\'s Full Stack Developer course. Learn frontend & backend, build real-world apps, and get placed!',
    ogUrl: 'https://socialprachar.com/full-stack-developer-course',
    ogImage: 'https://socialprachar.com/careerworkshop/Master FS.png',
    twitterTitle: 'Full Stack Developer Course | Learn MERN, Java, Python',
    twitterDescription: 'Enroll in SocialPrachar\'s Full Stack course and learn everything from HTML to backend APIs. Build projects and launch your tech career.',
    author: 'Social Prachar Team'
  },
  'data-science': {
    title: 'Best Data Science Course Training institute in Hyderabad |Socialprachar',
    description: 'Join SocialPrachar\'s top-rated Data Science course with AI & ML in India. Get hands-on training, real-time projects, placement support, and certifications. Enroll now!',
    keywords: 'data science course, AI, ML, Python, placement, SocialPrachar',
    ogTitle: 'Data Science Course with AI & ML | SocialPrachar',
    ogDescription: 'Kickstart your career in Data Science with hands-on training in AI, ML, Python, and real-time projects. Get certified and placed with SocialPrachar.',
    ogUrl: 'https://socialprachar.com/data-science',
    ogImage: 'https://socialprachar.com/careerworkshop/Master DS.png',
    twitterTitle: 'Data Science Course | Learn AI, ML, Python with Placement',
    twitterDescription: 'Learn Data Science with SocialPrachar – a job-ready program with AI & ML, real-time projects, certification, and career support. Enroll today!',
    author: 'Social Prachar Team'
  },
  'mern-stack-course': {
    title: 'MERN Full Stack Developer Course training institute in Hyderabad',
    description: 'Master Full Stack Development with SocialPrachar\'s expert-led course in Hyderabad. Learn MERN Java or Python stacks with real-time projects and placement guarentee.',
    keywords: 'MERN stack, full stack, Java, Python, placement, SocialPrachar',
    ogTitle: 'Full Stack Developer Course in Hyderabad – MERN, Java & Python Node js | SocialPrachar',
    ogDescription: 'Kickstart your career in web development with SocialPrachar\'s Full Stack Developer course Hyderabad. Learn frontend & backend, build real-world apps, and get placed!',
    ogUrl: 'https://socialprachar.com/full-stack-developer-course',
    ogImage: 'https://socialprachar.com/careerworkshop/MERN.png',
    twitterTitle: 'Full Stack Developer Course Hyderabad | Learn MERN, Java, Python',
    twitterDescription: 'Enroll in SocialPrachar\'s Full Stack course and learn everything from HTML to backend APIs. Build projects and launch your tech career.',
    author: 'Social Prachar Team'
  },
  'artificial-intelligence-course-training-institute-in-hyderabad': {
    title: 'Artificial Intelligence Course Training Institute in Hyderabad | SocialPrachar',
    description: 'Master Artificial Intelligence with SocialPrachar\'s expert-led training in Hyderabad. Learn Machine Learning, Deep Learning, Python, NLP, and AI projects with placement guarantee.',
    keywords: 'artificial intelligence, AI, ML, Deep Learning, NLP, Python, placement, SocialPrachar',
    ogTitle: 'Artificial Intelligence Course in Hyderabad – ML, DL, Python | SocialPrachar',
    ogDescription: 'Accelerate your AI career with SocialPrachar\'s Artificial Intelligence course in Hyderabad. Work on real-time projects and become job-ready in AI & ML.',
    ogUrl: 'https://socialprachar.com/artificial-intelligence-course-training-institute-in-hyderabad',
    ogImage: 'https://socialprachar.com/careerworkshop/Master AI.png',
    twitterTitle: 'AI Course Training in Hyderabad | Learn ML, DL, Python, NLP',
    twitterDescription: 'Join SocialPrachar\'s AI course in Hyderabad and master Artificial Intelligence tools and techniques through expert-led training and real-time projects.',
    author: 'Social Prachar Team'
  },
  'digital-marketing-course-training-institute-hyderabad': {
    title: 'Digital Marketing Course Training Institute in Hyderabad | SocialPrachar',
    description: 'Learn SEO, Google Ads, Social Media, and more with SocialPrachar\'s Digital Marketing Course in Hyderabad. Real-time projects, expert mentors, and placement guarantee.',
    keywords: 'digital marketing, SEO, Google Ads, Social Media, placement, SocialPrachar',
    ogTitle: 'Digital Marketing Course in Hyderabad – SEO, Google Ads, Meta Ads | SocialPrachar',
    ogDescription: 'Become a certified digital marketer with SocialPrachar\'s Digital Marketing course in Hyderabad. Master SEO, PPC, social media, and analytics with placements.',
    ogUrl: 'https://socialprachar.com/digital-marketing-course-training-institute-hyderabad',
    ogImage: 'https://socialprachar.com/careerworkshop/Master adv dm.png',
    twitterTitle: 'Digital Marketing Training in Hyderabad | SEO, PPC, SMM with Placements',
    twitterDescription: 'Join SocialPrachar\'s Digital Marketing course and build your career with hands-on tools like Google Ads, Meta Ads, and real-time marketing projects.',
    author: 'Social Prachar Team'
  },
  'python-full-stack-development-course': {
    title: 'Python Full Stack Development Course in Hyderabad | SocialPrachar',
    description: 'Become a certified Full Stack Developer with Python at SocialPrachar. Learn frontend, backend, databases, Django, and real-time projects with placement support.',
    keywords: 'python full stack, Django, frontend, backend, placement, SocialPrachar',
    ogTitle: 'Python Full Stack Developer Course in Hyderabad – Django, React, SQL | SocialPrachar',
    ogDescription: 'Master Python Full Stack Development with SocialPrachar. Learn HTML, CSS, JavaScript, Django, databases, and deploy real-world applications with job assistance.',
    ogUrl: 'https://socialprachar.com/python-full-stack-development-course',
    ogImage: 'https://socialprachar.com/careerworkshop/Master FSP.png',
    twitterTitle: 'Python Full Stack Developer Training in Hyderabad | Learn Django, React',
    twitterDescription: 'Join SocialPrachar\'s Python Full Stack course in Hyderabad and become job-ready. Learn full stack development with real-time projects and placement support.',
    author: 'Social Prachar Team'
  },
  'java-full-stack-development-course': {
    title: 'Java Full Stack Development Course in Hyderabad | SocialPrachar',
    description: 'Become a Java Full Stack Developer with expert training from SocialPrachar. Learn Core Java, Spring Boot, React, SQL, and build real-time projects with placement support.',
    keywords: 'java full stack, Spring Boot, React, SQL, placement, SocialPrachar',
    ogTitle: 'Java Full Stack Developer Course in Hyderabad – Spring Boot, React, SQL | SocialPrachar',
    ogDescription: 'Master Java Full Stack development with SocialPrachar\'s job-oriented course in Hyderabad. Learn Java, frontend/backend, and work on real-world applications.',
    ogUrl: 'https://socialprachar.com/java-full-stack-development-course',
    ogImage: 'https://socialprachar.com/careerworkshop/Master FSJ.png',
    twitterTitle: 'Java Full Stack Developer Training in Hyderabad | Core Java, Spring Boot',
    twitterDescription: 'Join SocialPrachar\'s Java Full Stack course and gain hands-on experience with Java, frontend frameworks, APIs, and databases. Get placement support.',
    author: 'Social Prachar Team'
  },
  'aws-devops-course': {
    title: 'AWS DevOps Course Training Institute in Hyderabad | SocialPrachar',
    description: 'Master AWS DevOps with SocialPrachar\'s expert-led course in Hyderabad. Learn CI/CD, Docker, Kubernetes, AWS tools with real-time projects and placement guarantee.',
    keywords: 'aws devops, CI/CD, Docker, Kubernetes, AWS, placement, SocialPrachar',
    ogTitle: 'AWS DevOps Course in Hyderabad – CI/CD, Docker, AWS Tools | SocialPrachar',
    ogDescription: 'Kickstart your cloud and DevOps career with SocialPrachar\'s AWS DevOps course in Hyderabad. Learn automation, deployment pipelines, and get placed!',
    ogUrl: 'https://socialprachar.com/aws-devops-course',
    ogImage: 'https://socialprachar.com/careerworkshop/Master adv devops.png',
    twitterTitle: 'AWS DevOps Training in Hyderabad | Master CI/CD, Docker, Kubernetes',
    twitterDescription: 'Enroll in SocialPrachar\'s AWS DevOps course and learn real-time deployment, monitoring, and automation techniques. Launch your cloud career today.',
    author: 'Social Prachar Team'
  }
};

// Page Meta Data for Non-Course Pages (Step 5)
const pageMetaData = {
  'courses': {
    title: '12+Job ready socialprachar courses-Learn Till You Get Placed | social Prachar',
    description: 'Explore all our job-ready courses and learn till you get placed. Data Science, Full Stack, AWS DevOps, AI, Digital Marketing and more.',
    keywords: 'courses, job ready, SocialPrachar, Data Science, Full Stack, AWS DevOps, AI, Digital Marketing',
    ogTitle: '12+Job ready socialprachar courses-Learn Till You Get Placed | social Prachar',
    ogDescription: 'Explore all our job-ready courses and learn till you get placed. Data Science, Full Stack, AWS DevOps, AI, Digital Marketing and more.',
    ogUrl: 'https://socialprachar.com/courses',
    ogImage: 'https://socialprachar.com/homepic.png',
    twitterTitle: '12+Job ready socialprachar courses-Learn Till You Get Placed | social Prachar',
    twitterDescription: 'Explore all our job-ready courses and learn till you get placed. Data Science, Full Stack, AWS DevOps, AI, Digital Marketing and more.',
    author: 'Social Prachar Team'
  },
  'success-stories': {
    title: '16000+ Success Stories Since 2014 | SocialPrachar',
    description: 'Read real success stories from our students since 2014. See how SocialPrachar has transformed thousands of careers.',
    keywords: 'success stories, SocialPrachar, student testimonials, placements',
    ogTitle: '16000+ Success Stories Since 2014 | SocialPrachar',
    ogDescription: 'Read real success stories from our students since 2014. See how SocialPrachar has transformed thousands of careers.',
    ogUrl: 'https://socialprachar.com/success-stories',
    ogImage: 'https://socialprachar.com/homepic.png',
    twitterTitle: '16000+ Success Stories Since 2014 | SocialPrachar',
    twitterDescription: 'Read real success stories from our students since 2014. See how SocialPrachar has transformed thousands of careers.',
    author: 'Social Prachar Team'
  },
  'career-counselling': {
    title: "Achieve Salaries of Up to '12 LPA' with Proven Strategies | social Prcahar",
    description: 'Join our career workshop and learn proven strategies to achieve high salaries. Get guidance from industry experts.',
    keywords: 'career workshop, salary, SocialPrachar, industry experts',
    ogTitle: "Achieve Salaries of Up to '12 LPA' with Proven Strategies | social Prcahar",
    ogDescription: 'Join our career workshop and learn proven strategies to achieve high salaries. Get guidance from industry experts.',
    ogUrl: 'https://socialprachar.com/career-counselling',
    ogImage: 'https://socialprachar.com/homepic.png',
    twitterTitle: "Achieve Salaries of Up to '12 LPA' with Proven Strategies | social Prcahar",
    twitterDescription: 'Join our career workshop and learn proven strategies to achieve high salaries. Get guidance from industry experts.',
    author: 'Social Prachar Team'
  },
  'upcoming-batches': {
    title: 'Upcoming Batches\nLearn Tech Concepts From Industry Leaders | social parchar',
    description: 'Check out our upcoming batches and learn tech concepts from industry leaders. Flexible schedules and expert trainers.',
    keywords: 'upcoming batches, SocialPrachar, tech concepts, industry leaders',
    ogTitle: 'Upcoming Batches\nLearn Tech Concepts From Industry Leaders | social parchar',
    ogDescription: 'Check out our upcoming batches and learn tech concepts from industry leaders. Flexible schedules and expert trainers.',
    ogUrl: 'https://socialprachar.com/upcoming-batches',
    ogImage: 'https://socialprachar.com/homepic.png',
    twitterTitle: 'Upcoming Batches\nLearn Tech Concepts From Industry Leaders | social parchar',
    twitterDescription: 'Check out our upcoming batches and learn tech concepts from industry leaders. Flexible schedules and expert trainers.',
    author: 'Social Prachar Team'
  },
  'aboutUs': {
    title: 'SocialPrachar - 16,000+ Success stories sicne 2014 -About us',
    description: 'Learn about SocialPrachar, our mission, and our 16,000+ success stories since 2014.',
    keywords: 'about us, SocialPrachar, success stories, mission',
    ogTitle: 'SocialPrachar - 16,000+ Success stories sicne 2014 -About us',
    ogDescription: 'Learn about SocialPrachar, our mission, and our 16,000+ success stories since 2014.',
    ogUrl: 'https://socialprachar.com/aboutUs',
    ogImage: 'https://socialprachar.com/homepic.png',
    twitterTitle: 'SocialPrachar - 16,000+ Success stories sicne 2014 -About us',
    twitterDescription: 'Learn about SocialPrachar, our mission, and our 16,000+ success stories since 2014.',
    author: 'Social Prachar Team'
  },
  'courseBlog': {
    title: 'access the different of courses using our course Blog | social parchar',
    description: 'Access and explore different courses using our course blog. Get insights, tips, and more.',
    keywords: 'course blog, SocialPrachar, course insights, tips',
    ogTitle: 'access the different of courses using our course Blog | social parchar',
    ogDescription: 'Access and explore different courses using our course blog. Get insights, tips, and more.',
    ogUrl: 'https://socialprachar.com/courseBlog',
    ogImage: 'https://socialprachar.com/homepic.png',
    twitterTitle: 'access the different of courses using our course Blog | social parchar',
    twitterDescription: 'Access and explore different courses using our course blog. Get insights, tips, and more.',
    author: 'Social Prachar Team'
  },
  'codeclash': {
    title: 'CodeClash 2.0 : A multi-day coding competition for student | social Prachar',
    description: 'Participate in CodeClash 2.0, a multi-day coding competition for students. Win prizes and showcase your skills.',
    keywords: 'codeclash, coding competition, SocialPrachar, students, prizes',
    ogTitle: 'CodeClash 2.0 : A multi-day coding competition for student | social Prachar',
    ogDescription: 'Participate in CodeClash 2.0, a multi-day coding competition for students. Win prizes and showcase your skills.',
    ogUrl: 'https://socialprachar.com/codeclash',
    ogImage: 'https://socialprachar.com/homepic.png',
    twitterTitle: 'CodeClash 2.0 : A multi-day coding competition for student | social Prachar',
    twitterDescription: 'Participate in CodeClash 2.0, a multi-day coding competition for students. Win prizes and showcase your skills.',
    author: 'Social Prachar Team'
  },
  'scholarship-test': {
    title: 'Every week one Top Winner, will get a complete FREE course',
    description: 'Take the scholarship test and stand a chance to win a complete free course every week at SocialPrachar.',
    keywords: 'scholarship test, free course, SocialPrachar, winner',
    ogTitle: 'Every week one Top Winner, will get a complete FREE course',
    ogDescription: 'Take the scholarship test and stand a chance to win a complete free course every week at SocialPrachar.',
    ogUrl: 'https://socialprachar.com/scholarship-test',
    ogImage: 'https://socialprachar.com/homepic.png',
    twitterTitle: 'Every week one Top Winner, will get a complete FREE course',
    twitterDescription: 'Take the scholarship test and stand a chance to win a complete free course every week at SocialPrachar.',
    author: 'Social Prachar Team'
  }
};

// Enhanced Default/Fallback Meta Data
const defaultMetaData = {
  title: 'Top Choice Leading Training Institute in Hyderabad | Social Prachar',
  description: 'Leading training institute in Hyderabad offering professional courses in Data Science, Full Stack Development, AWS DevOps, AI, Digital Marketing with placement guarantee. Transform your career with expert-led training, real-time projects, and 100% job assistance.',
  keywords: 'training institute hyderabad, data science course, full stack development, aws devops, digital marketing, ai course, placement guarantee, job oriented courses',
  ogTitle: 'Professional Training Courses in Hyderabad | Social Prachar',
  ogDescription: 'Transform your career with SocialPrachar\'s expert-led training programs in Hyderabad. Choose from Data Science, Full Stack, DevOps, AI, and Digital Marketing courses with guaranteed placements.',
  ogUrl: 'https://socialprachar.com',
  ogImage: 'https://socialprachar.com/homepic.png',
  twitterTitle: 'Professional Training Institute in Hyderabad | Social Prachar',
  twitterDescription: 'Join SocialPrachar for industry-leading training in technology and digital marketing. Expert mentors, real-time projects, and placement support in Hyderabad.',
  author: 'Social Prachar Team'
};

// Function to get meta data based on current route
const getMetaData = (pathname) => {
  // Remove leading slash and any trailing slash
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  
  // Check if we have specific meta data for this route
  if (courseMetaData[cleanPath]) {
    return courseMetaData[cleanPath];
  }
  
  // Check for page meta data
  if (pageMetaData[cleanPath]) {
    return pageMetaData[cleanPath];
  }
  
  // Check for dynamic routes like /course/:courseID
  if (cleanPath.startsWith('course/')) {
    const courseId = cleanPath.split('/')[1];
    if (courseMetaData[courseId]) {
      return courseMetaData[courseId];
    }
  }
  
  // Return default meta data
  return defaultMetaData;
};

// Function to generate JSON-LD structured data for courses
const generateCourseStructuredData = (metaData, pathname) => {
  // Only generate course structured data for course pages
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const isCoursePage = courseMetaData[cleanPath] || 
                      (cleanPath.startsWith('course/') && courseMetaData[cleanPath.split('/')[1]]);
  
  if (!isCoursePage) return null;
  
  const courseName = metaData.title.replace(' | SocialPrachar', '').replace('Top Choice ', '');
  const courseUrl = metaData.ogUrl;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseName,
    "description": metaData.description,
    "provider": {
      "@type": "Organization",
      "name": "SocialPrachar",
      "sameAs": "https://socialprachar.com"
    },
    "url": courseUrl,
    "image": metaData.ogImage,
    "inLanguage": "en-US",
    "educationalLevel": "Professional",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "category": "Free"
    },
    "teaches": [
      "Data Science",
      "Full Stack Development", 
      "AWS DevOps",
      "Artificial Intelligence",
      "Digital Marketing",
      "Python Development",
      "Java Development"
    ].filter(tech => metaData.title.toLowerCase().includes(tech.toLowerCase())),
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "inLanguage": "en-US",
      "courseWorkload": "P16W" // Placeholder for 16 weeks, can be adjusted
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://socialprachar.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Courses",
        "item": "https://socialprachar.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": courseName,
        "item": courseUrl
      }
    ]
  };

  // Return an array of structured data objects
  return [courseSchema, breadcrumbSchema];
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const Popup = ({ setShowPopup }) => {
  const windowSize = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  const handleEnrolNowClick = () => {
    setIsOpen(false);
    navigate("/scholarship-test");
  };

  const closePopup = () => setIsOpen(false);
  const currentYear = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
  }).format(new Date());

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={300} />
      <div className="popup-content">
        <button
          type="button"
          className="btn-close text-black"
          aria-label="Close"
          onClick={() => setShowPopup(false)}
        ></button>
        <img src={appreciateImage} alt="Appreciation" className="popup-image" data-aos="flip-left" />
      </div>
    </div>
  );
};

// Enhanced Meta Tags Component
const DynamicMetaTags = ({ location }) => {
  const metaData = getMetaData(location.pathname);
  const structuredData = generateCourseStructuredData(metaData, location.pathname);
  
  // Update browser-level meta tags for social sharing
  useEffect(() => {
    // Update document title
    document.title = metaData.title;
    
    // Update existing meta tags or create new ones
    const updateMetaTag = (attribute, attributeValue, content) => {
      if (!content) return;
      
      let metaTag = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attribute, attributeValue);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };

    const updateLinkTag = (rel, href) => {
      if (!href) return;
      
      let linkTag = document.querySelector(`link[rel="${rel}"]`);
      
      if (linkTag) {
        linkTag.setAttribute('href', href);
      } else {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', rel);
        linkTag.setAttribute('href', href);
        document.head.appendChild(linkTag);
      }
    };

    // Update all meta tags
    updateMetaTag('name', 'description', metaData.description);
    updateMetaTag('name', 'keywords', metaData.keywords);
    updateMetaTag('name', 'author', metaData.author);
    
    // Update canonical URL
    updateLinkTag('canonical', metaData.ogUrl);
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', metaData.ogTitle);
    updateMetaTag('property', 'og:description', metaData.ogDescription);
    updateMetaTag('property', 'og:url', metaData.ogUrl);
    updateMetaTag('property', 'og:image', metaData.ogImage);
    updateMetaTag('property', 'og:image:secure_url', metaData.ogImage);
    updateMetaTag('property', 'og:image:alt', `${metaData.title} - Social Prachar`);
    updateMetaTag('property', 'og:site_name', 'Social Prachar');
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:locale', 'en_US');
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
    updateMetaTag('property', 'og:image:type', 'image/png');
    
    // Update Twitter tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', '@socialprachar');
    updateMetaTag('name', 'twitter:creator', '@socialprachar');
    updateMetaTag('name', 'twitter:title', metaData.twitterTitle);
    updateMetaTag('name', 'twitter:description', metaData.twitterDescription);
    updateMetaTag('name', 'twitter:url', metaData.ogUrl);
    updateMetaTag('name', 'twitter:image', metaData.ogImage);
    updateMetaTag('name', 'twitter:image:alt', `${metaData.title} - Social Prachar`);
    
    // Update additional social media specific tags
    updateMetaTag('property', 'article:author', metaData.author);
    updateMetaTag('property', 'article:publisher', 'https://socialprachar.com');
    updateMetaTag('property', 'og:see_also', 'https://socialprachar.com');

    // Trigger social media crawlers update
    if (window.updateSocialMetaTags) {
      window.updateSocialMetaTags();
    }

    // Force Facebook to re-scrape (programmatically)
    const event = new CustomEvent('metaTagsUpdated', {
      detail: { metaData, pathname: location.pathname }
    });
    window.dispatchEvent(event);

  }, [location.pathname, metaData]);

  return (
    <Helmet>
      <title>{metaData.title}</title>
      <meta name="description" content={metaData.description} />
      <meta name="keywords" content={metaData.keywords} />
      <meta name="author" content={metaData.author} />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metaData.ogUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Social Prachar" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={metaData.ogUrl} />
      <meta property="og:title" content={metaData.ogTitle} />
      <meta property="og:description" content={metaData.ogDescription} />
      <meta property="og:image" content={metaData.ogImage} />
      <meta property="og:image:secure_url" content={metaData.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${metaData.title} - Social Prachar`} />
      <meta property="og:image:type" content="image/png" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@socialprachar" />
      <meta name="twitter:creator" content="@socialprachar" />
      <meta name="twitter:url" content={metaData.ogUrl} />
      <meta name="twitter:title" content={metaData.twitterTitle} />
      <meta name="twitter:description" content={metaData.twitterDescription} />
      <meta name="twitter:image" content={metaData.ogImage} />
      <meta name="twitter:image:alt" content={`${metaData.title} - Social Prachar`} />
      
      {/* WhatsApp specific */}
      <meta property="og:image:secure_url" content={metaData.ogImage} />
      
      {/* Additional social media meta tags */}
      <meta property="article:author" content={metaData.author} />
      <meta property="article:publisher" content="https://socialprachar.com" />
      
      {/* LinkedIn specific */}
      <meta property="og:see_also" content="https://socialprachar.com" />
      
      {/* JSON-LD Structured Data for Course Pages */}
      {structuredData && structuredData.map((data, index) => (
        <script type="application/ld+json" key={`jsonld-${index}`}>
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

const AppContent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const excludedPaths = ["/career-quiz"];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  React.useEffect(() => {
    // Show popup logic
    const excludedPaths = ["/thank-you", "/privacy-policy", "/contact","/codeclash"];
    if (!excludedPaths.includes(location.pathname)) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 15000);
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [location.pathname]);

  return (
    <>
      <DynamicMetaTags location={location} />
      <WishListProvider>
        <DateProvider>
          <ScrollToTop />
          <NavBar />
          <Suspense fallback={<Loading />}>
            <Routes>
              {routes.map((route, index) => React.cloneElement(route, { key: index }))}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>

          {!excludedPaths.includes(location.pathname) && <QuickHelpButton />}
          {showPopup && <Popup setShowPopup={setShowPopup} />}
        </DateProvider>
      </WishListProvider>

      <style>
        {`
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .popup-content {
            position: relative;
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            text-align: center;
          }
          .popup-image {
            width: 100%;
            height: auto;
            border-radius: 10px;
          }
          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            color: black;
            border: none;
            padding: 5px 10px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            z-index:1000;
          }
        `}
      </style>
    </>
  );
};

const App = ({ location, context }) => {
  const Router = typeof window === 'undefined' ? StaticRouter : BrowserRouter;
  const routerProps = typeof window === 'undefined' ? { location, context } : {};

  return (
    <HelmetProvider>
      <Router {...routerProps}>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
};

export default App;
