import React, { Suspense } from 'react';
import Loading from '../../components/extraComponents/loading';
import { useParams } from 'react-router-dom';
import PageNotFound from '../pageNotFound/PageNotFound';
import { Helmet } from 'react-helmet-async';

const Headerpart = React.lazy(() => import('../Pageslices/Header/Headerpart'));
const Masterclass = React.lazy(() => import('../Pageslices/Masterclass/Masterclass'));
const Testmonials = React.lazy(() => import('../Pageslices/Testmonials/Testmonials'));
const Whatwillyoulearn = React.lazy(() => import('../Pageslices/Whatwillyoulearn/Whatwillyoulearn'));
const Mentorpage = React.lazy(() => import('../Pageslices/Mentorpage/Mentorpage'));
const Certificate = React.lazy(() => import('../Pageslices/Certificatepart/Certificate'));
const Banner = React.lazy(() => import('../Pageslices/Banner/Banner'));
const CourseAccordion = React.lazy(() => import('../Pageslices/AccordianQuestions/Accordian'));

const validSlugs = ['data-science', 
    'python-full-stack-development-course',
    'java-full-stack-development-course',
    'full-stack-developer-course',
    'awsdevopscourse',
    'artificial-intelligence-course-training-institute-in-hyderabad',
    'generative-ai-course-training-institute-hyderabad',
    'digital-marketing-course-training-institute-hyderabad',
    'data-analytics-course-training-hyderabad',
    'snowflake-training-in-hyderabad',
    'salesforce-course'

]
const routeMeta = {
  "data-science": {
    title: "Best Data Science Course Training institute in Hyderabad | SocialPrachar",
    description: "Join SocialPrachar’s top-rated Data Science course with AI & ML in India. Get hands-on training, real-time projects, placement support, and certifications. Enroll now!",
    ogUrl: "https://socialprachar.com/data-science",
    ogTitle: "Data Science Course with AI & ML | SocialPrachar",
    ogDescription: "Kickstart your career in Data Science with hands-on training in AI, ML, Python, and real-time projects. Get certified and placed with SocialPrachar.",
    ogImage: "https://socialprachar.com/path-to-datascience-og-image.jpg",
    twitterTitle: "Data Science Course | Learn AI, ML, Python with Placement",
    twitterDescription: "Learn Data Science with SocialPrachar – a job-ready program with AI & ML, real-time projects, certification, and career support. Enroll today!",
    twitterImage: "https://socialprachar.com/path-to-datascience-twitter-image.jpg"
  },
  "python-full-stack-development-course": {
    title: "Python Full Stack Development Course in Hyderabad | SocialPrachar",
    description: "Become a certified Full Stack Developer with Python at SocialPrachar. Learn frontend, backend, databases, Django, and real-time projects with placement support.",
    ogUrl: "https://socialprachar.com/python-full-stack-development-course",
    ogTitle: "Python Full Stack Developer Course in Hyderabad – Django, React, SQL | SocialPrachar",
    ogDescription: "Master Python Full Stack Development with SocialPrachar. Learn HTML, CSS, JavaScript, Django, databases, and deploy real-world applications with job assistance.",
    ogImage: "https://socialprachar.com/path-to-python-og-image.jpg",
    twitterTitle: "Python Full Stack Developer Training in Hyderabad | Learn Django, React",
    twitterDescription: "Join SocialPrachar’s Python Full Stack course in Hyderabad and become job-ready. Learn full stack development with real-time projects and placement support.",
    twitterImage: "https://socialprachar.com/path-to-python-twitter-image.jpg"
  },
  "java-full-stack-development-course": {
    title: "Java Full Stack Development Course in Hyderabad | SocialPrachar",
    description: "Become a Java Full Stack Developer with expert training from SocialPrachar. Learn Core Java, Spring Boot, React, SQL, and build real-time projects with placement support.",
    ogUrl: "https://socialprachar.com/java-full-stack-development-course",
    ogTitle: "Java Full Stack Developer Course in Hyderabad – Spring Boot, React, SQL | SocialPrachar",
    ogDescription: "Master Java Full Stack development with SocialPrachar’s job-oriented course in Hyderabad. Learn Java, frontend/backend, and work on real-world applications.",
    ogImage: "https://socialprachar.com/path-to-java-og-image.jpg",
    twitterTitle: "Java Full Stack Developer Training in Hyderabad | Core Java, Spring Boot",
    twitterDescription: "Join SocialPrachar’s Java Full Stack course and gain hands-on experience with Java, frontend frameworks, APIs, and databases. Get placement support.",
    twitterImage: "https://socialprachar.com/path-to-java-twitter-image.jpg"
  },
  "full-stack-developer-course": {
    title: "Leading Full Stack Developer Course training institute with Placement | SocialPrachar",
    description: "Master Full Stack Development with SocialPrachar’s expert-led course. Learn MERN, Java, or Python stacks with real-time projects and 100% placement support.",
    ogUrl: "https://socialprachar.com/full-stack-developer-course",
    ogTitle: "Full Stack Developer Course – MERN, Java & Python Tracks | SocialPrachar",
    ogDescription: "Kickstart your career in web development with SocialPrachar’s Full Stack Developer course. Learn frontend & backend, build real-world apps, and get placed!",
    ogImage: "https://socialprachar.com/path-to-og-image.jpg",
    twitterTitle: "Full Stack Developer Course | Learn MERN, Java, Python",
    twitterDescription: "Enroll in SocialPrachar’s Full Stack course and learn everything from HTML to backend APIs. Build projects and launch your tech career.",
    twitterImage: "https://socialprachar.com/path-to-twitter-image.jpg"
  },
  "awsdevopscourse": {
    title: "AWS DevOps Course Training Institute in Hyderabad | SocialPrachar",
    description: "Master AWS DevOps with SocialPrachar’s expert-led course in Hyderabad. Learn CI/CD, Docker, Kubernetes, AWS tools with real-time projects and placement guarantee.",
    ogUrl: "https://socialprachar.com/aws-devops-course",
    ogTitle: "AWS DevOps Course in Hyderabad – CI/CD, Docker, AWS Tools | SocialPrachar",
    ogDescription: "Kickstart your cloud and DevOps career with SocialPrachar’s AWS DevOps course in Hyderabad. Learn automation, deployment pipelines, and get placed!",
    ogImage: "https://socialprachar.com/path-to-aws-og-image.jpg",
    twitterTitle: "AWS DevOps Training in Hyderabad | Master CI/CD, Docker, Kubernetes",
    twitterDescription: "Enroll in SocialPrachar’s AWS DevOps course and learn real-time deployment, monitoring, and automation techniques. Launch your cloud career today.",
    twitterImage: "https://socialprachar.com/path-to-aws-twitter-image.jpg"
  },
  "artificial-intelligence-course-training-institute-in-hyderabad": {
    title: "Artificial Intelligence Course Training Institute in Hyderabad | SocialPrachar",
    description: "Master Artificial Intelligence with SocialPrachar’s expert-led training in Hyderabad. Learn Machine Learning, Deep Learning, Python, NLP, and AI projects with placement guarantee.",
    ogUrl: "https://socialprachar.com/artificial-intelligence-course-training-institute-in-hyderabad",
    ogTitle: "Artificial Intelligence Course in Hyderabad – ML, DL, Python | SocialPrachar",
    ogDescription: "Accelerate your AI career with SocialPrachar’s Artificial Intelligence course in Hyderabad. Work on real-time projects and become job-ready in AI & ML.",
    ogImage: "https://socialprachar.com/path-to-ai-og-image.jpg",
    twitterTitle: "AI Course Training in Hyderabad | Learn ML, DL, Python, NLP",
    twitterDescription: "Join SocialPrachar’s AI course in Hyderabad and master Artificial Intelligence tools and techniques through expert-led training and real-time projects.",
    twitterImage: "https://socialprachar.com/path-to-ai-twitter-image.jpg"
  },
  "generative-ai-course-training-institute-hyderabad": {
    title: "Generative AI Course Training Institute in Hyderabad | SocialPrachar",
    description: "Learn about the latest AI technologies with our Generative AI course in Hyderabad.",
    ogUrl: "https://socialprachar.com/generative-ai-course-training-institute-hyderabad",
    ogTitle: "Generative AI Course Training Institute in Hyderabad | SocialPrachar",
    ogDescription: "Learn about the latest AI technologies with our Generative AI course in Hyderabad.",
    ogImage: "https://socialprachar.com/path-to-generative-ai-og-image.jpg",
    twitterTitle: "Generative AI Course Training Institute in Hyderabad | SocialPrachar",
    twitterDescription: "Learn about the latest AI technologies with our Generative AI course in Hyderabad.",
    twitterImage: "https://socialprachar.com/path-to-generative-ai-twitter-image.jpg"
  },
  "digital-marketing-course-training-institute-hyderabad": {
    title: "Digital Marketing Course Training Institute in Hyderabad | SocialPrachar",
    description: "Learn SEO, Google Ads, Social Media, and more with SocialPrachar’s Digital Marketing Course in Hyderabad. Real-time projects, expert mentors, and placement guarantee.",
    ogUrl: "https://socialprachar.com/digital-marketing-course-training-institute-hyderabad",
    ogTitle: "Digital Marketing Course in Hyderabad – SEO, Google Ads, Meta Ads | SocialPrachar",
    ogDescription: "Become a certified digital marketer with SocialPrachar’s Digital Marketing course in Hyderabad. Master SEO, PPC, social media, and analytics with placements.",
    ogImage: "https://socialprachar.com/path-to-digital-og-image.jpg",
    twitterTitle: "Digital Marketing Training in Hyderabad | SEO, PPC, SMM with Placements",
    twitterDescription: "Join SocialPrachar’s Digital Marketing course and build your career with hands-on tools like Google Ads, Meta Ads, and real-time marketing projects.",
    twitterImage: "https://socialprachar.com/path-to-digital-twitter-image.jpg"
  },
  "data-analytics-course-training-hyderabad": {
    title: "Data Analytics Course Training in Hyderabad | SocialPrachar",
    description: "Become a data analytics expert with our comprehensive training in Hyderabad.",
    ogUrl: "https://socialprachar.com/data-analytics-course-training-hyderabad",
    ogTitle: "Data Analytics Course Training in Hyderabad | SocialPrachar",
    ogDescription: "Become a data analytics expert with our comprehensive training in Hyderabad.",
    ogImage: "https://socialprachar.com/path-to-data-analytics-og-image.jpg",
    twitterTitle: "Data Analytics Course Training in Hyderabad | SocialPrachar",
    twitterDescription: "Become a data analytics expert with our comprehensive training in Hyderabad.",
    twitterImage: "https://socialprachar.com/path-to-data-analytics-twitter-image.jpg"
  },
  "snowflake-training-in-hyderabad": {
    title: "Snowflake Training in Hyderabad | SocialPrachar",
    description: "Learn Snowflake data warehousing with hands-on training in Hyderabad.",
    ogUrl: "https://socialprachar.com/snowflake-training-in-hyderabad",
    ogTitle: "Snowflake Training in Hyderabad | SocialPrachar",
    ogDescription: "Learn Snowflake data warehousing with hands-on training in Hyderabad.",
    ogImage: "https://socialprachar.com/path-to-snowflake-og-image.jpg",
    twitterTitle: "Snowflake Training in Hyderabad | SocialPrachar",
    twitterDescription: "Learn Snowflake data warehousing with hands-on training in Hyderabad.",
    twitterImage: "https://socialprachar.com/path-to-snowflake-twitter-image.jpg"
  },
  "salesforce-course": {
    title: "Salesforce Course Training Institute in Hyderabad | SocialPrachar",
    description: "Get certified with our Salesforce course designed for real-world CRM practices.",
    ogUrl: "https://socialprachar.com/salesforce-course",
    ogTitle: "Salesforce Course Training Institute in Hyderabad | SocialPrachar",
    ogDescription: "Get certified with our Salesforce course designed for real-world CRM practices.",
    ogImage: "https://socialprachar.com/path-to-salesforce-og-image.jpg",
    twitterTitle: "Salesforce Course Training Institute in Hyderabad | SocialPrachar",
    twitterDescription: "Get certified with our Salesforce course designed for real-world CRM practices.",
    twitterImage: "https://socialprachar.com/path-to-salesforce-twitter-image.jpg"
  }
};

const CourseDetails = () => {
    const { slug } = useParams();
    if (!validSlugs.includes(slug)) {
        return <PageNotFound />;
    }

    const meta = routeMeta[slug] || {
      title: "SocialPrachar",
      description: "Learn more about our courses at SocialPrachar."
    };

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": meta.title,
      "description": meta.description,
      "provider": {
        "@type": "Organization",
        "name": "SocialPrachar",
        "sameAs": "https://socialprachar.com"
      }
    };

    return (
        <>
          <Helmet>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={meta.ogUrl} />
            <meta property="og:title" content={meta.ogTitle} />
            <meta property="og:description" content={meta.ogDescription} />
            <meta property="og:image" content={meta.ogImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={meta.ogUrl} />
            <meta name="twitter:title" content={meta.twitterTitle} />
            <meta name="twitter:description" content={meta.twitterDescription} />
            <meta name="twitter:image" content={meta.twitterImage} />
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
          </Helmet>
          <Suspense fallback={<Loading />}>
              <Headerpart />
              <Masterclass />
              <Whatwillyoulearn />
              <Mentorpage />
              <Certificate />
              <CourseAccordion /> 
              <Banner />
          </Suspense>
        </>
    );
};

export default CourseDetails;
