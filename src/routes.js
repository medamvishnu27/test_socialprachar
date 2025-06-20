// routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from './components/pageNotFound/PageNotFound.js';
const ThankyouPage = React.lazy(() => import('./components/Pageslices/Enrollbutton/ThankyouPage.js'));
const AllHomeComp = React.lazy(() => import('./components/allHomeComp.js'));
const Course = React.lazy(() => import('./components/Courses_category/Course.js'));
const NewDetailsPage = React.lazy(() => import('./components/CourseDetailsNewPage/CourseDetails.js'));
const Aboutus = React.lazy(() => import('./components/aboutus/aboutus.js'));
const SuccessStories = React.lazy(() => import('./components/successStories/SuccessStories.js'));
const CourseAccordion = React.lazy(() => import('./components/Pageslices/AccordianQuestions/Accordian.js'));
const CareerWorkShop = React.lazy(() => import("./components/Career_workshop/profileHeader/ProfileHeader.js"));
const UpcomingBatches = React.lazy(() => import("./components/upcomingBatches/UpcomingBatches.js"));
const CareerSelection = React.lazy(() => import("./components/QuizCareerSelection/CareerSelection.js"));
const CareerRoadMap = React.lazy(() => import("./components/CareerRoadMap/CareerRoadMap.js"));
const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy/PrivacyPolicy.js"));
const ScholarShipTest = React.lazy(() => import("./components/scholarshipTest/ScholarShipTest.js"));
const SocialHire = React.lazy(() => import("./components/SocialHire/SocialHire.js"));
const Projects = React.lazy(() => import("./components/Projects/Blog.js"));
const OpenBlogPage = React.lazy(() => import('./components/Projects/openBlogPage.js'));
const ProjectDashBoard = React.lazy(() => import("./components/Projects/BlogDashboard.js"));
const Subscription = React.lazy(() => (import('./components/subscriptionPage/SubscriptionHeader.js')))
const EventsPage = React.lazy(() => (import('./components/events/EventMainPage.js')));
const EventOpenPage = React.lazy(() => import("./components/events/EventsOpenpage.js"));
const DateForms = React.lazy(() => import("./components/Forms/DateInput.js"));
const DigitalMarketingPageAdd = React.lazy(() => import("./components/digital-marketing-course-training-institute-hyderabad/page.js"));
const Hosting = React.lazy(() => import('./components/hosting/Hosting.js'));
const CourseBlog = React.lazy(() => import('./components/CourseBlog/Blog.js'));
const CourseBlogDashBoard = React.lazy(() => import('./components/CourseBlog/CourseBlogDashboard.js'));
const OpenCourseBlog = React.lazy(() => import("./components/CourseBlog/CourseBlog.js"));
const OurAchievementsDashboard = React.lazy(() => import('./components/successStories/OurAchievementsDashboard'));
const CodeClash = React.lazy(() => import('./components/CodeClash/CodeClash.js'))



const routes = [
    <Route path="/" element={<AllHomeComp />} />,
    <Route path='/datesform' element={<DateForms />} />,
    <Route path='/courseBlog/:id' element={<OpenCourseBlog />} />,
    <Route path='/OurAchievementsDashboard' element={<OurAchievementsDashboard />} />,
    <Route path='/courseBlogDashboard' element={<CourseBlogDashBoard />} />,
    <Route path='/courseBlog' element={<CourseBlog />} />,
    <Route path='/events/:id' element={<EventOpenPage />} />,
    <Route path='events' element={<EventsPage />} />,
    <Route path="/subscription/:userType" element={<Subscription />} />,
    <Route path="/subscription" element={<Subscription />} />,
    <Route path='project-dashboard' element={<ProjectDashBoard />} />,
    <Route path='projects/:id' element={<OpenBlogPage />} />,
    <Route path='projects' element={<Projects />} />,
    <Route path='socialhire' element={<SocialHire />} />,
    <Route path="privacy-policy" element={<PrivacyPolicy />} />,
    <Route path="scholarship-test" element={<ScholarShipTest />} />,
    <Route path="career-roadmaps" element={<CareerRoadMap />} />,
    <Route path="courses" element={<Course />} />,
    <Route path="aboutUs" element={<Aboutus />} />,
    <Route path=":slug" element={<NewDetailsPage />} />,
    <Route path="/digital-marketing-course-hyderabad" element={<DigitalMarketingPageAdd />} />,
    <Route path="success-stories" element={<SuccessStories />} />,
    <Route path="career-counselling" element={<CareerWorkShop />} />,
    <Route path="upcoming-batches" element={<UpcomingBatches />} />,
    <Route path="career-quiz" element={<CareerSelection />} />,
    <Route path="course/:courseID" element={<CourseAccordion />} />,
    <Route path="thank-you" element={<ThankyouPage />} />,
    <Route path="hosting" element={<Hosting />} />,
    <Route path='codeclash' element={<CodeClash/>}/>,
    <Route path='*' element={<PageNotFound />} />
];


export default routes;
