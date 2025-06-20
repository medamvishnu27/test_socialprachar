import React from 'react';
import Header from './Header/Header';
import ProgramHighlates from './ProgramHighlates/ProgramHighlates';
import HandsOnCaseStudies from './HandsOnCaseStudies/HandsOnCaseStudies';
import CertificationAndBadges from './CertificationAndBadges/CertificationAndBadges';
import DigitalNest from './DigitalNest/DigitalNest';
import DigitalMarketing from './DigitalMarketingTools/DigitalMarketing';
import NextGenAiTools from './NextGenAITools/NextGenAiTools';
import PlacementsSupport from './PlacementSupport/PlacementSupport';
import WhatSupport from './WhatSupport/WhatSupport';
import Footer from '../footer/footer';
import { Helmet } from 'react-helmet-async';

const page = () => {
    return (
        <div>
            <Helmet>
                <title>Digital Marketing Course Training Institute in Hyderabad | SocialPrachar</title>
                <meta name="description" content="Learn SEO, Google Ads, Social Media, and more with SocialPrachar’s Digital Marketing Course in Hyderabad. Real-time projects, expert mentors, and placement guarantee." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://socialprachar.com/digital-marketing-course-training-institute-hyderabad" />
                <meta property="og:title" content="Digital Marketing Course in Hyderabad – SEO, Google Ads, Meta Ads | SocialPrachar" />
                <meta property="og:description" content="Become a certified digital marketer with SocialPrachar’s Digital Marketing course in Hyderabad. Master SEO, PPC, social media, and analytics with placements." />
                <meta property="og:image" content="https://socialprachar.com/path-to-digital-og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://socialprachar.com/digital-marketing-course-training-institute-hyderabad" />
                <meta name="twitter:title" content="Digital Marketing Training in Hyderabad | SEO, PPC, SMM with Placements" />
                <meta name="twitter:description" content="Join SocialPrachar’s Digital Marketing course and build your career with hands-on tools like Google Ads, Meta Ads, and real-time marketing projects." />
                <meta name="twitter:image" content="https://socialprachar.com/path-to-digital-twitter-image.jpg" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Course",
                        "name": "Digital Marketing Course Training Institute in Hyderabad | SocialPrachar",
                        "description": "Learn SEO, Google Ads, Social Media, and more with SocialPrachar’s Digital Marketing Course in Hyderabad. Real-time projects, expert mentors, and placement guarantee.",
                        "provider": {
                            "@type": "Organization",
                            "name": "SocialPrachar",
                            "sameAs": "https://socialprachar.com"
                        }
                    })}
                </script>
            </Helmet>
            <Header />
            <ProgramHighlates />
            <HandsOnCaseStudies />
            <CertificationAndBadges />
            <DigitalNest />
            <DigitalMarketing />
            <NextGenAiTools />
            <PlacementsSupport />
            <WhatSupport />
            <Footer/>
        </div>
    );
};

export default page;
