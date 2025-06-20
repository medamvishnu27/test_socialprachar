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
  'data-science': {
    title: 'Top Choice Data Science Course Training Institute in Hyderabad | Social Prachar',
    description: 'Join SocialPrachar\'s top-rated Data Science course with AI & ML in Hyderabad. Get hands-on training, real-time projects, placement support, and industry certifications. Transform your career with our expert-led program. Enroll now for the best Data Science training in Hyderabad!',
    keywords: 'data science course hyderabad, AI ML training, python data science, machine learning course, data analytics training, placement guarantee hyderabad',
    ogTitle: 'Best Data Science Course with AI & ML Training in Hyderabad | Social Prachar',
    ogDescription: 'Kickstart your Data Science career with SocialPrachar\'s comprehensive course in Hyderabad. Learn AI, ML, Python, and work on real-time projects. Get certified and placed with 100% job assistance. Expert trainers, industry curriculum, and hands-on experience guaranteed.',
    ogUrl: 'https://socialprachar.com/data-science',
    ogImage: 'https://socialprachar.com/courses/data-science-course.png',
    twitterTitle: 'Data Science Course Hyderabad | Learn AI, ML, Python with Placement Guarantee',
    twitterDescription: 'Transform your career with SocialPrachar\'s Data Science course in Hyderabad. Comprehensive AI & ML training, real-time projects, expert mentors, and guaranteed placement support. Join the #1 Data Science institute in Hyderabad.',
    author: 'Social Prachar Data Science Team'
  },
  'full-stack-developer-course': {
    title: 'Top Choice MERN Full Stack Developer Course Training Institute in Hyderabad | Social Prachar',
    description: 'Master Full Stack Development with SocialPrachar\'s expert-led MERN stack course in Hyderabad. Learn React, Node.js, MongoDB, Express.js with real-time projects and guaranteed placement. Join the top Full Stack Development training institute in Hyderabad for comprehensive web development skills.',
    keywords: 'full stack developer course hyderabad, MERN stack training, react js course, node js training, web development course, javascript training hyderabad',
    ogTitle: 'Full Stack Developer Course in Hyderabad – MERN, Java & Python | Social Prachar',
    ogDescription: 'Become a skilled Full Stack Developer with SocialPrachar\'s comprehensive course in Hyderabad. Master frontend & backend technologies, build real-world applications, and get placed in top companies. Expert training in MERN, Java, and Python stacks.',
    ogUrl: 'https://socialprachar.com/full-stack-developer-course',
    ogImage: 'https://socialprachar.com/courses/full-stack-developer-course.png',
    twitterTitle: 'Full Stack Developer Course Hyderabad | Master MERN, Java, Python with Placement',
    twitterDescription: 'Launch your web development career with SocialPrachar\'s Full Stack course in Hyderabad. Learn complete web development, build portfolio projects, and get job-ready with our placement guarantee.',
    author: 'Social Prachar Full Stack Team'
  },
  'aws-devops-course': {
    title: 'Top Choice AWS DevOps Course Training Institute in Hyderabad | Social Prachar',
    description: 'Master AWS DevOps with SocialPrachar\'s expert-led course in Hyderabad. Learn CI/CD, Docker, Kubernetes, Jenkins, AWS cloud services with real-time projects and placement guarantee. Join the leading DevOps training institute in Hyderabad for comprehensive cloud and automation skills.',
    keywords: 'aws devops course hyderabad, docker kubernetes training, jenkins ci/cd, cloud computing course, devops certification hyderabad, aws training',
    ogTitle: 'AWS DevOps Course in Hyderabad – CI/CD, Docker, Kubernetes | Social Prachar',
    ogDescription: 'Accelerate your cloud career with SocialPrachar\'s AWS DevOps course in Hyderabad. Master automation, deployment pipelines, containerization, and cloud infrastructure. Get hands-on experience with real-time projects and secure high-paying DevOps jobs.',
    ogUrl: 'https://socialprachar.com/aws-devops-course',
    ogImage: 'https://socialprachar.com/courses/aws-devops-course.png',
    twitterTitle: 'AWS DevOps Training Hyderabad | Master CI/CD, Docker, Kubernetes with Job Guarantee',
    twitterDescription: 'Transform your career with SocialPrachar\'s AWS DevOps course in Hyderabad. Learn cloud automation, deployment strategies, and modern DevOps practices with expert guidance and placement support.',
    author: 'Social Prachar DevOps Team'
  },
  'artificial-intelligence-course-training-institute-in-hyderabad': {
    title: 'Top Choice Artificial Intelligence Course Training Institute in Hyderabad | Social Prachar',
    description: 'Master Artificial Intelligence with SocialPrachar\'s comprehensive AI course in Hyderabad. Learn Machine Learning, Deep Learning, NLP, Computer Vision, Python programming with real-time AI projects and placement guarantee. Join the top AI training institute in Hyderabad.',
    keywords: 'artificial intelligence course hyderabad, machine learning training, deep learning course, NLP training, computer vision course, AI certification hyderabad',
    ogTitle: 'Artificial Intelligence Course in Hyderabad – ML, DL, NLP Training | Social Prachar',
    ogDescription: 'Launch your AI career with SocialPrachar\'s cutting-edge Artificial Intelligence course in Hyderabad. Master ML algorithms, deep learning frameworks, and build intelligent systems. Expert trainers, hands-on projects, and guaranteed job placement.',
    ogUrl: 'https://socialprachar.com/artificial-intelligence-course-training-institute-in-hyderabad',
    ogImage: 'https://socialprachar.com/courses/artificial-intelligence-course.png',
    twitterTitle: 'AI Course Training Hyderabad | Master Machine Learning, Deep Learning, NLP',
    twitterDescription: 'Shape the future with SocialPrachar\'s AI course in Hyderabad. Comprehensive training in ML, DL, and AI technologies with real-world projects and career support.',
    author: 'Social Prachar AI Team'
  },
  'digital-marketing-course-training-institute-hyderabad': {
    title: 'Top Choice Digital Marketing Course Training Institute in Hyderabad | Social Prachar',
    description: 'Master Digital Marketing with SocialPrachar\'s comprehensive course in Hyderabad. Learn SEO, Google Ads, Facebook Ads, Social Media Marketing, Content Marketing, Email Marketing with real campaigns and placement guarantee. Join the top digital marketing institute in Hyderabad.',
    keywords: 'digital marketing course hyderabad, SEO training, google ads course, social media marketing, facebook ads training, content marketing course hyderabad',
    ogTitle: 'Digital Marketing Course in Hyderabad – SEO, Google Ads, Social Media | Social Prachar',
    ogDescription: 'Become a certified digital marketing expert with SocialPrachar\'s comprehensive course in Hyderabad. Master all aspects of online marketing, work on live campaigns, and get placed in top marketing agencies with our job guarantee.',
    ogUrl: 'https://socialprachar.com/digital-marketing-course-training-institute-hyderabad',
    ogImage: 'https://socialprachar.com/courses/digital-marketing-course.png',
    twitterTitle: 'Digital Marketing Training Hyderabad | Master SEO, PPC, SMM with Job Guarantee',
    twitterDescription: 'Build your digital marketing career with SocialPrachar\'s industry-focused course in Hyderabad. Learn from experts, work on real campaigns, and get placed in top companies.',
    author: 'Social Prachar Digital Marketing Team'
  },
  'python-full-stack-development-course': {
    title: 'Top Choice Python Full Stack Development Course in Hyderabad | Social Prachar',
    description: 'Become a Python Full Stack Developer with SocialPrachar\'s comprehensive course in Hyderabad. Learn Django, Flask, React, databases, APIs with real-time projects and placement support. Master both frontend and backend Python development at the leading training institute.',
    keywords: 'python full stack course hyderabad, django training, flask course, python web development, backend development course, python training hyderabad',
    ogTitle: 'Python Full Stack Developer Course in Hyderabad – Django, React, APIs | Social Prachar',
    ogDescription: 'Master Python Full Stack Development with SocialPrachar\'s expert-led course in Hyderabad. Learn web frameworks, databases, frontend integration, and deploy scalable applications. Comprehensive training with job assistance.',
    ogUrl: 'https://socialprachar.com/python-full-stack-development-course',
    ogImage: 'https://socialprachar.com/courses/python-full-stack-course.png',
    twitterTitle: 'Python Full Stack Developer Training Hyderabad | Learn Django, React with Placement',
    twitterDescription: 'Launch your Python development career with SocialPrachar\'s Full Stack course in Hyderabad. Complete web development training with modern frameworks and job guarantee.',
    author: 'Social Prachar Python Team'
  },
  'java-full-stack-development-course': {
    title: 'Top Choice Java Full Stack Development Course in Hyderabad | Social Prachar',
    description: 'Master Java Full Stack Development with SocialPrachar\'s comprehensive course in Hyderabad. Learn Core Java, Spring Boot, Hibernate, React, Angular, microservices with real-time projects and placement guarantee. Join the top Java training institute in Hyderabad.',
    keywords: 'java full stack course hyderabad, spring boot training, hibernate course, java web development, microservices training, java certification hyderabad',
    ogTitle: 'Java Full Stack Developer Course in Hyderabad – Spring Boot, React, Microservices | Social Prachar',
    ogDescription: 'Become a skilled Java Full Stack Developer with SocialPrachar\'s industry-aligned course in Hyderabad. Master enterprise Java development, modern frameworks, and build scalable applications with expert guidance.',
    ogUrl: 'https://socialprachar.com/java-full-stack-development-course',
    ogImage: 'https://socialprachar.com/courses/java-full-stack-course.png',
    twitterTitle: 'Java Full Stack Developer Training Hyderabad | Master Spring Boot, React with Job Support',
    twitterDescription: 'Advance your Java skills with SocialPrachar\'s Full Stack course in Hyderabad. Comprehensive enterprise development training with real projects and career support.',
    author: 'Social Prachar Java Team'
  },
  'awsdevopscourse': {
    title: 'Top Choice AWS DevOps Course Training Institute in Hyderabad | Social Prachar',
    description: 'Master AWS DevOps with SocialPrachar\'s expert-led course in Hyderabad. Learn CI/CD, Docker, Kubernetes, Jenkins, AWS cloud services with real-time projects and placement guarantee. Join the leading DevOps training institute in Hyderabad for comprehensive cloud and automation skills.',
    keywords: 'aws devops course hyderabad, docker kubernetes training, jenkins ci/cd, cloud computing course, devops certification hyderabad, aws training',
    ogTitle: 'AWS DevOps Course in Hyderabad – CI/CD, Docker, Kubernetes | Social Prachar',
    ogDescription: 'Accelerate your cloud career with SocialPrachar\'s AWS DevOps course in Hyderabad. Master automation, deployment pipelines, containerization, and cloud infrastructure. Get hands-on experience with real-time projects and secure high-paying DevOps jobs.',
    ogUrl: 'https://socialprachar.com/awsdevopscourse',
    ogImage: 'https://socialprachar.com/courses/aws-devops-course.png',
    twitterTitle: 'AWS DevOps Training Hyderabad | Master CI/CD, Docker, Kubernetes with Job Guarantee',
    twitterDescription: 'Transform your career with SocialPrachar\'s AWS DevOps course in Hyderabad. Learn cloud automation, deployment strategies, and modern DevOps practices with expert guidance and placement support.',
    author: 'Social Prachar DevOps Team'
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
