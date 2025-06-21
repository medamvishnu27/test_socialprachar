import React, { Suspense } from 'react';
import Loading from '../../components/extraComponents/loading';
import { useParams } from 'react-router-dom';
import PageNotFound from '../pageNotFound/PageNotFound';

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

const CourseDetails = () => {
    const { slug } = useParams();
    if (!validSlugs.includes(slug)) {
        return <PageNotFound />;
    }

    return (
        <>
          <Suspense fallback={<Loading />}>
              <Headerpart />
              <Masterclass />
              <Whatwillyoulearn />
              <Mentorpage />
              <Certificate />
              <CourseAccordion /> 
              <Banner />
              // <Testmonials />
          </Suspense>
        </>
    );
};

export default CourseDetails;
