import React, { useEffect, useRef, useState } from 'react';
import JD_course from '../../../assets/small bussines award.png';
import Buttonstyle from '../Enrollbutton/Enrollbutton.module.css';
import unlockLogo from '../../../assets/AssetsOfDetailsPage/masterclass/unlock.png';
import booksymbol from '../../../assets/AssetsOfDetailsPage/masterclass/open-book.png';
import successLogo from '../../../assets/AssetsOfDetailsPage/masterclass/success.png';
import partnershipLogo from '../../../assets/AssetsOfDetailsPage/masterclass/hand-shake.png';
import MobileIconLogo from '../../../assets/AssetsOfDetailsPage/masterclass/mobile-development.png';
import style from './Header.module.css';
import Enrollbutton from './../Enrollbutton/Enrollbutton';
import BackgroundImg from '../../../assets/AssetsOfDetailsPage/background.png';
import FollowerImg from '../../../assets/AssetsOfDetailsPage/FollowewrGroup.webp';
import starSymbol from '../../../assets/AssetsOfDetailsPage/star.svg';
import { data } from '../../Cards/CardData';
import { useNavigate, useParams } from 'react-router-dom';
import company1Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Accenture.png';
import company2Logo from '../../../assets/AssetsOfDetailsPage/masterclass/AWS.png';
import company3Logo from '../../../assets/AssetsOfDetailsPage/masterclass/CISCO.jpg';
import company4Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Cognizant.png';
import company5Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Fusion Technologies.jpeg';
import company6Logo from '../../../assets/AssetsOfDetailsPage/masterclass/GOC.jpg';
import company7Logo from '../../../assets/AssetsOfDetailsPage/masterclass/pinaca_Technology.jpeg';
import company8Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Honeywell.png';
import company9Logo from '../../../assets/AssetsOfDetailsPage/masterclass/MOURI Tech.png';
import company10Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Micron Technologies.png';
import company11Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Sonata_Software_Logo.png';
import company12Logo from '../../../assets/AssetsOfDetailsPage/masterclass/SucceedTechnologies.png';
import company13Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Sutherland.png';
import company14Logo from '../../../assets/AssetsOfDetailsPage/masterclass/TCS.jpg';
import company15Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Tech Mahindra.jpeg';
import company16Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Tiger Analytics.png';
import company17Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Tricubics.png';
import company18Logo from '../../../assets/AssetsOfDetailsPage/masterclass/Yotta_Data_Services_Logo.jpg';
import company19Logo from '../../../assets/AssetsOfDetailsPage/masterclass/amber_flux_private_limited_logo.jpeg';
import company20Logo from '../../../assets/AssetsOfDetailsPage/masterclass/dell_technologies_logo.png';
import Testmonials from './../Testmonials/Testmonials';
import HeaderSignInForm from './HeaderSignInForm';
import google from '../../../assets/successStories/google.png';
import jd_logo from '../../../assets/successStories/Just-Dial_logo.png';
import glassdoor_logo from '../../../assets/successStories/glassdoor_logo.png';
import { Share2, Facebook, Twitter, Linkedin, Instagram, Copy,Star } from 'lucide-react';

const logos = [
    { src: company1Logo, alt: "Company 1" },
    { src: company2Logo, alt: "Company 2" },
    { src: company3Logo, alt: "Company 3" },
    { src: company4Logo, alt: "Company 4" },
    { src: company5Logo, alt: "Company 5" },
    { src: company6Logo, alt: "Company 6" },
    { src: company7Logo, alt: "Company 7" },
    { src: company8Logo, alt: "Company 8" },
    { src: company9Logo, alt: "Company 9" },
    { src: company10Logo, alt: "Company 10" },
    { src: company11Logo, alt: "Company 11" },
    { src: company12Logo, alt: "Company 12" },
    { src: company13Logo, alt: "Company 13" },
    { src: company14Logo, alt: "Company 14" },
    { src: company15Logo, alt: "Company 15" },
    { src: company16Logo, alt: "Company 16" },
    { src: company17Logo, alt: "Company 17" },
    { src: company18Logo, alt: "Company 18" },
    { src: company19Logo, alt: "Company 19" },
    { src: company20Logo, alt: "Company 20" }
];

const ratings = [
    {
        logo: google,
        title: 'Google',
        rating: 'Rated 4.7/5',
    },
    {
        logo: glassdoor_logo,
        title: 'Glassdoor',
        rating: 'Rated 4.8/5',
    },
    {
        logo: jd_logo,
        title: 'Justdial',
        rating: 'Rated 4.7/5',
    },
];

const stats = [
    {
        value: '16000+', label: 'Success Stories since 2014', color: '#007bff'
    },
    { value: '1400+', label: 'Drives conducted', color: '#28a745' },
    { value: '16 LPA', label: 'Highest Salary Package', color: '#ffc107' },
    { value: '3 - 8 LPA', label: 'LPA Average Package', color: '#762acd' },
    { value: '10+', label: 'Edtech Awards Received', color: '#52de12' },
];

const symbols = [
    { img: unlockLogo, text: "Unlock 12+ LPA with In-Demand Skills", className: style.symbol1 },
    { img: booksymbol, text: "Flexible Learning: Classroom & Online Options", className: style.symbol },
    { img: successLogo, text: "17,000+ Successful Career Transitions Since 2014", className: style.symbol },
    { img: partnershipLogo, text: "550+ Batches Completed, 350+ Hiring Partners", className: style.symbol },
    { img: MobileIconLogo, text: "Lifetime LMS Access & Dedicated Mobile App", className: style.symbol },
];

const courseMetadata = {
    "/data-science": {
        title: "Best Data Science Course Training institute in Hyderabad | SocialPrachar",
        description: "Learn Data Science, AI, and ML in Hyderabad with hands-on training and placement support.",
    },
    "/full-stack-developer-course": {
        title: "MERN Full Stack Developer Course training institute in Hyderabad | SocialPrachar",
        description: "Become a MERN Stack Developer with our expert-led Full Stack Development course in Hyderabad.",
    },
    "/artificial-intelligence-course-training-institute-in-hyderabad": {
        title: "Artificial Intelligence Course Training Institute in Hyderabad | SocialPrachar",
        description: "Kickstart your AI career with our industry-aligned Artificial Intelligence course in Hyderabad.",
    },
    "/digital-marketing-course-training-institute-hyderabad": {
        title: "Digital Marketing Course Training Institute in Hyderabad | SocialPrachar",
        description: "Master SEO, SEM, SMM and more with our Digital Marketing training in Hyderabad.",
    },
    "/python-full-stack-development-course": {
        title: "Python Full Stack Development Course in Hyderabad | SocialPrachar",
        description: "Learn backend and frontend development with Python Full Stack course at SocialPrachar.",
    },
    "/awsdevopscourse": {
        title: "AWS DevOps Course Training Institute in Hyderabad | SocialPrachar",
        description: "Get certified with our AWS DevOps course designed for real-world cloud deployment practices.",
    },
    "/java-full-stack-development-course": {
        title: "Java Full Stack Development Course in Hyderabad | SocialPrachar",
        description: "Build a career in software development with our Java Full Stack Developer course.",
    }
};

const ShareButton = ({ courseData, currentUrl, courseImage }) => {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        setPreviewUrl(currentUrl);
    }, [currentUrl]);

    useEffect(() => {
        if (courseData) {
            const removeExistingMeta = (selector) => {
                const existing = document.querySelectorAll(selector);
                existing.forEach(tag => tag.remove());
            };

            removeExistingMeta('meta[property^="og:"]');
            removeExistingMeta('meta[name^="twitter:"]');
            removeExistingMeta('meta[name="description"]');

            document.title = courseData.title;

            const createMetaTag = (attribute, name, content) => {
                const meta = document.createElement('meta');
                meta.setAttribute(attribute, name);
                meta.setAttribute('content', content);
                document.head.appendChild(meta);
                return meta;
            };

            createMetaTag('name', 'description', courseData.description);
            createMetaTag('name', 'keywords', `${courseData.title}, online course, training, SocialPrachar, Hyderabad`);

            createMetaTag('property', 'og:title', courseData.title);
            createMetaTag('property', 'og:description', courseData.description);
            createMetaTag('property', 'og:image', courseImage);
            createMetaTag('property', 'og:image:secure_url', courseImage);
            createMetaTag('property', 'og:url', currentUrl);
            createMetaTag('property', 'og:type', 'website');
            createMetaTag('property', 'og:site_name', 'SocialPrachar');
            createMetaTag('property', 'og:image:width', '1200');
            createMetaTag('property', 'og:image:height', '630');
            createMetaTag('property', 'og:image:alt', courseData.title);
            createMetaTag('property', 'og:locale', 'en_US');

            createMetaTag('name', 'twitter:card', 'summary_large_image');
            createMetaTag('name', 'twitter:site', '@SocialPrachar');
            createMetaTag('name', 'twitter:creator', '@SocialPrachar');
            createMetaTag('name', 'twitter:title', courseData.title);
            createMetaTag('name', 'twitter:description', courseData.description);
            createMetaTag('name', 'twitter:image', courseImage);
            createMetaTag('name', 'twitter:image:alt', courseData.title);

            createMetaTag('property', 'article:author', 'SocialPrachar');
            createMetaTag('property', 'article:publisher', 'https://www.facebook.com/SocialPrachar');

            let canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.remove();
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            canonical.setAttribute('href', currentUrl);
            document.head.appendChild(canonical);
        }
    }, [courseData, currentUrl, courseImage]);

    const shareData = {
        title: courseData?.title || 'SocialPrachar Course',
        description: courseData?.description || 'Learn with industry experts at SocialPrachar',
        url: currentUrl,
        image: courseImage
    };

    const handleShare = (platform) => {
        const encodedUrl = encodeURIComponent(shareData.url);
        const encodedTitle = encodeURIComponent(shareData.title);
        const encodedDescription = encodeURIComponent(shareData.description);

        let shareUrl = '';
        let windowFeatures = 'width=626,height=436,scrollbars=yes,resizable=yes,toolbar=no,menubar=no';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}`;
                break;

            case 'twitter':
                const twitterText = shareData.title.length > 200 ?
                    shareData.title.substring(0, 200) + '...' : shareData.title;
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(twitterText)}&via=SocialPrachar&hashtags=OnlineLearning,CourseTraining`;
                break;

            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;

            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedUrl}`;
                break;

            case 'instagram':
                const instagramText = `🎓 ${shareData.title}\n\n📚 ${shareData.description}\n\n🔗 Link in bio or stories!\n\n#OnlineLearning #SocialPrachar #CourseTraining`;
                handleCopyLink(instagramText, 'Instagram Story content copied! Paste in your Instagram app.');
                return;

            default:
                return;
        }

        window.open(shareUrl, '_blank', windowFeatures);
        setShowShareMenu(false);
    };

    const handleCopyLink = async (customText = null, successMessage = null) => {
        const textToCopy = customText || shareData.url;
        const message = successMessage || (customText ? 'Content copied to clipboard!' : 'Link copied to clipboard!');

        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
            alert(message);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy. Please manually copy the link: ' + shareData.url);
        }

        setShowShareMenu(false);
    };

    const handleInstagramShare = () => {
        const instagramContent = `🎓 ${shareData.title}

📚 ${shareData.description}

🌟 Join thousands of learners at SocialPrachar!
🔗 ${shareData.url}

#OnlineLearning #SocialPrachar #CourseTraining #SkillDevelopment #CareerGrowth`;

        handleCopyLink(instagramContent, 'Instagram Story content copied! Paste in your Instagram app.');
    };

    const handleWhatsAppCopy = () => {
        const whatsappMessage = `🎓 *${shareData.title}*

📚 ${shareData.description}

🚀 Transform your career with expert-led training!

👉 ${shareData.url}

#SocialPrachar #OnlineLearning`;

        handleCopyLink(whatsappMessage, 'WhatsApp message copied! Paste it in your chat.');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showShareMenu && !event.target.closest('.share-button-container')) {
                setShowShareMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showShareMenu]);

    return (
        <div
            className="share-button-container"
            style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                zIndex: 1000
            }}
        >
            <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                aria-label="Share course"
                title="Share this course"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                }}
            >
                <Share2 size={20} />
            </button>

            {showShareMenu && (
                <>
                    <div
                        className="position-fixed"
                        style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            zIndex: 999
                        }}
                        onClick={() => setShowShareMenu(false)}
                    />
                    <div
                        className="card shadow-lg"
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '0',
                            width: '250px',
                            zIndex: 1001,
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: 'white',
                            fontFamily: 'Arial, sans-serif'
                        }}
                    >
                        <div
                            className="card-header d-flex justify-content-between align-items-center"
                            style={{
                                borderRadius: '8px 8px 0 0',
                                padding: '10px',
                                borderBottom: '1px solid #e0e0e0'
                            }}
                        >
                            <h6 className="mb-0 fw-bold">
                                Share Course
                            </h6>
                            <button
                                onClick={() => setShowShareMenu(false)}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    padding: '0',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div className="card-body p-0">
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                <li
                                    onClick={() => handleShare('facebook')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #e0e0e0'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    <Facebook size={24} color="#1877F2" style={{ marginRight: '10px' }} />
                                    <span>Facebook</span>
                                </li>
                                <li
                                    onClick={() => handleShare('twitter')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #e0e0e0'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    <Twitter size={24} color="#1DA1F2" style={{ marginRight: '10px' }} />
                                    <span>Twitter</span>
                                </li>
                                <li
                                    onClick={() => handleShare('linkedin')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #e0e0e0'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    <Linkedin size={24} color="#0A66C2" style={{ marginRight: '10px' }} />
                                    <span>LinkedIn</span>
                                </li>
                                <li
                                    onClick={() => handleShare('whatsapp')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #e0e0e0'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginRight: '10px' }} fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.558 4.216 1.62 6.04L0 24l6.04-1.62C7.864 23.442 9.946 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.955 0-3.87-.586-5.508-1.69l-.388-.23-3.576.958.958-3.576-.23-.388C2.146 15.87 1.5 13.955 1.5 12c0-5.79 4.71-10.5 10.5-10.5S22.5 6.21 22.5 12 17.79 22.5 12 22zm5.015-5.986c-.285-.142-1.686-.835-1.948-.93-.262-.095-.452-.142-.642.142-.19.285-.738.93-.904 1.12-.166.19-.332.214-.617.071-.285-.142-1.202-.443-2.29-1.413-.846-.754-1.417-1.686-1.583-1.971-.166-.285-.017-.44.125-.582.128-.127.285-.332.428-.498.142-.166.19-.285.285-.476.095-.19.047-.356-.024-.498-.071-.142-.642-1.548-.88-2.12-.237-.57-.475-.475-.642-.475-.166 0-.332 0-.498 0s-.428.047-.642.214c-.214.166-1.378.476-1.378 1.162 0 .686.998 1.353 1.14 1.448.142.095 1.995 3.043 4.836 4.27.475.214.846.332 1.14.428.475.166 1.14.142 1.583.071.428-.071 1.353-.57 1.548-1.12.19-.57.19-.998.142-1.092-.047-.095-.104-.166-.19-.309z" />
                                    </svg>
                                    <span>WhatsApp</span>
                                </li>
                                <li
                                    onClick={() => handleInstagramShare()}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #e0e0e0'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    <Instagram size={24} style={{ marginRight: '10px', color: '#E4405F' }} />
                                    <span>Instagram Story</span>
                                </li>
                                <li
                                    onClick={() => handleCopyLink()}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    <Copy size={24} color="#666" style={{ marginRight: '10px' }} />
                                    <span>Copy Link</span>
                                </li>
                            </ul>
                            <div
                                className="p-3 border-top"
                                style={{
                                    backgroundColor: '',
                                    borderRadius: '0 0 8px 8px'
                                }}
                            >
                                <div className="mb-2">
                                    <p className='text-center'>Copy Rich Content:</p>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <button
                                        onClick={handleInstagramShare}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'white',
                                            color: '#E4405F',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            border: '2px solid transparent',
                                            padding: '8px',
                                            width: '100%'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#E4405F';
                                            e.target.style.color = 'white';
                                            e.target.style.border = '2px solid #E4405F';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.color = '#E4405F';
                                            e.target.style.border = '2px solid transparent';
                                        }}
                                    >
                                        <Instagram size={24} style={{ marginRight: '5px' }} />
                                    </button>
                                    <button
                                        onClick={handleWhatsAppCopy}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'white',
                                            color: '#25D366',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            border: '2px solid transparent',
                                            padding: '8px',
                                            width: '100%'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#25D366';
                                            e.target.style.color = 'white';
                                            e.target.style.border = '2px solid #25D366';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.color = '#25D366';
                                            e.target.style.border = '2px solid transparent';
                                        }}
                                    >
                                        <svg width="25" height="25" viewBox="0 0 24 24" style={{ marginRight: '5px' }} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.558 4.216 1.62 6.04L0 24l6.04-1.62C7.864 23.442 9.946 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.955 0-3.87-.586-5.508-1.69l-.388-.23-3.576.958.958-3.576-.23-.388C2.146 15.87 1.5 13.955 1.5 12c0-5.79 4.71-10.5 10.5-10.5S22.5 6.21 22.5 12 17.79 22.5 12 22zm5.015-5.986c-.285-.142-1.686-.835-1.948-.93-.262-.095-.452-.142-.642.142-.19.285-.738.93-.904 1.12-.166.19-.332.214-.617.071-.285-.142-1.202-.443-2.29-1.413-.846-.754-1.417-1.686-1.583-1.971-.166-.285-.017-.44.125-.582.128-.127.285-.332.428-.498.142-.166.19-.285.285-.476.095-.19.047-.356-.024-.498-.071-.142-.642-1.548-.88-2.12-.237-.57-.475-.475-.642-.475-.166 0-.332 0-.498 0s-.428.047-.642.214c-.214.166-1.378.476-1.378 1.162 0 .686.998 1.353 1.14 1.448.142.095 1.995 3.043 4.836 4.27.475.214.846.332 1.14.428.475.166 1.14.142 1.583.071.428-.071 1.353-.57 1.548-1.12.19-.57.19-.998.142-1.092-.047-.095-.104-.166-.19-.309z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const Headerpart = (courseID) => {
    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const redLineRef = useRef(null);
    const doughtsPartRef = useRef(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    const courseData = courseMetadata[currentPath] || courseMetadata[`/${slug}`];

    useEffect(() => {
        const cardDetails = data.find(item => item.slug === slug);
        setCard(cardDetails);
    }, [slug]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1025);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1025);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(style.DoughtsPartVisible);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (doughtsPartRef.current) observer.observe(doughtsPartRef.current);
        if (redLineRef.current) observer.observe(redLineRef.current);

        return () => {
            if (doughtsPartRef.current) observer.unobserve(doughtsPartRef.current);
            if (redLineRef.current) observer.unobserve(redLineRef.current);
        };
    }, []);

    const togglePopup = () => {
        if (isPopupVisible) {
            setIsPopupVisible(false);
        } else {
            setIsPopupVisible(true);
        }
    };

    return (
        <div className={style.headerContainer}>
            <img
                src={BackgroundImg}
                srcSet={`
                    ${BackgroundImg} 400w,
                    ${BackgroundImg} 800w,
                    ${BackgroundImg} 1200w
                `}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px"
                alt="Descriptive background image"
                loading="lazy"
                decoding="async"
                width="1200"
                height="800"
                className={style.backgroundImage}
            />

            <ShareButton
                courseData={courseData}
                currentUrl={currentUrl}
                courseImage={JD_course}
            />

            <div className={style.contentContainer}>
                <div className={style.symbolsContainer}>
                    <h3 className={style.headerText}>
                        {card && (
                            <>
                                {card.Header} <span className={`${style.highlightedWord}`}>{card.Duration}</span>
                            </>
                        )}
                    </h3>
                    <div className={style.symbolItemContent}>
                        {symbols.map((item, index) => (
                            <div key={index} className={style.symbolItem}>
                                <img loading="lazy" src={item.img} alt="Book symbol" className={item.className} />
                                <span className={style.symbolText}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={style.HeaderPicture}>
                    {card && (
                        <img
                            src={JD_course}
                            alt="Course"
                            className={`img-fluid ${style.headerImage} shadow`}
                            loading="lazy"
                        />
                    )}
                    <div className={style.EnrollButtonContent}>
                        {card && !isMobile && <Enrollbutton label="Enroll Now" courseID={card.id} className={style.EnrollButton} actionType="Button:Enroll Now" />}
                        <span><img loading="lazy" src={FollowerImg} alt="Follower group" className={style.FollowerImage} /></span>
                        <div className={style.reviewContainer}>
                            <div className={style.FollowerStars}>
                                {[...Array(5)].map((_, index) => (
                                    <img loading="lazy" key={index} src={starSymbol} alt="Star" className={style.star} />
                                ))}
                            </div>
                            <span className={style.FollowerCount}> 426 reviews (4.7 of 5)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.scrollSection}>
                <p>Trusted by Learners Working At Top Companies</p>
                <div className={style.logoContainer}>
                    <div className={style.logoScroll1}>
                        {logos.slice(0, 10).map((logo, index) => (
                            <img loading="lazy" key={index} src={logo.src} alt={logo.alt} className={style.logo} />
                        ))}
                    </div>
                    <div className={style.logoScroll2}>
                        {logos.slice(10).map((logo, index) => (
                            <img loading="lazy" key={index} src={logo.src} alt={logo.alt} className={style.logo} />
                        ))}
                    </div>
                </div>
            </div>

             <div className={style.testimonials}>
                <div className={`d-flex m-4 ${isMobile ? 'flex-column text-center' : 'justify-content-center align-items-center gap-2'}`}>
                    <h4 className="fw-bold">Results That 
                        <span style={{ color: '#ff5003' }}> Speak Louder </span> Than  <span style={{ color: '#ff5003' }}>Words</span>     
                    </h4>
                </div>
                <div className="container">
                    <div className="row text-center mb-4">
                        {ratings.map((item, index) => (
                            <div className="col-md-4 mb-3" key={index}>
                                <div className="border p-3 rounded d-flex align-items-center justify-content-center">
                                    <div
                                        className="logo-wrapper d-flex align-items-center justify-content-center me-2"
                                        style={{ width: 40, height: 40 }}
                                    >
                                        {item.logo ? (
                                            <img
                                                loading="lazy"
                                                src={item.logo}
                                                alt={item.title}
                                                style={{ maxHeight: '50px', objectFit: 'contain', paddingRight: '15px' }}
                                            />
                                        ) : null}
                                    </div>
                                    <div>
                                        <div className="fw-bold">{item.title}</div>
                                        <div>{item.rating}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row text-center justify-content-center gap-3">
                        {stats.map((stat, index) => (
                            <div className={`${style.statcard} shadow-sm`} key={index}>
                                <div className={style.iconcontainer}>
                                    <div className={`${style.hexagon}`}
                                        style={{ backgroundColor: stat.color, boxShadow: '0 12px 12px rgba(80, 0, 185, 0.85)' }}
                                    >{stat.value}</div>
                                </div>
                                <div className={style.content}>
                                    <div className={style.label}>{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Testmonials />
            </div>
        </div>
    );
};

export default Headerpart;
