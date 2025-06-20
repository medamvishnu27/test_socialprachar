import React, { useEffect, useState } from 'react';
import BulbText from '../extraComponents/bulbText';
import MarqueeComp from '../extraComponents/marqueeComp.js';
import newsArticleOne from '../../assets/timesOfIndia.png';
import newsArticleTwo from '../../assets/bussinessStd.png';
import newsArticleThree from '../../assets/analytics.png';
import newsArticleFour from '../../assets/theknowledgereview_logo.jpg';
import newsArticleFive from '../../assets/ANI-logo.png';
import newsArticleSix from '../../assets/yahooNews.png';
import newsArticleSeven from '../../assets/BusinessW.png';
import newsArticleEight from '../../assets/Zee5_Official_logo.png';
import newsArticleNine from '../../assets/neurons-Logo.png';
import newsStyle from './news.module.css';
import Marquee from 'react-fast-marquee';
import style from '../successStories/SuccessStories.module.css';
import Achievementcard from '../successStories/Achievementcard.js';
import { collection, db } from '../../firebase.js';
import { getDocs } from 'firebase/firestore';


const NewsOnUs = () => {
  const newsArticles = [
    newsArticleOne,
    newsArticleTwo,
    newsArticleThree,
    newsArticleFour,
    newsArticleFive,
    newsArticleSix,
    newsArticleSeven,
    newsArticleEight,
    newsArticleNine
  ];
  const [achievements, setAchievements] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');

  const handleRedirect = () => {
    window.location.href = 'success-stories';
  };
  // fetching Achievements
  const filteredAchievements = achievements.filter(achievement => {
    const roleMatch = selectedRole === 'all' || achievement.role === selectedRole;
    const sectionMatch = selectedSection === 'all' || achievement.applicableSection === selectedSection;
    return roleMatch && sectionMatch;
  });

  useEffect(() => {
    const fetchAchievements = async () => {
      const snapshot = await getDocs(collection(db, "successStories-studentAchievements"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAchievements(data);
    };
    fetchAchievements();
  }, []);

  const groupAchievementsByCategory = (achievements) => {
    return achievements.reduce((acc, achievement) => {
      const category = achievement.category || 'Other'; // Default to 'Other' if no category
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(achievement);
      return acc;
    }, {});
  }

  const groupedAchievements = groupAchievementsByCategory(filteredAchievements);

  return (
    <>
      <div className='containerFluidForPadding my-5'>
        <div className={newsStyle.BulbTextStyle}>
          <BulbText
            BulbText="Top News Channels"
            bulbTitle="We Got Featured In"
            GreyText="You'll find something to spark your curiosity and enhance"
          />
        </div>

        <div className={newsStyle.ImagesSize}>
          <MarqueeComp MarqueeArray={newsArticles} />
        </div>

        <div className={newsStyle.marqueeAchievements}>
          <div className={newsStyle.BulbTextStyle}>
            <BulbText
              BulbText="Our Placed Students"
              bulbTitle="16k+ Success Stories Since 2014"
              GreyText="Are You Ready to Be the Next?"
            />
          </div>
          <div className="py-4">
            <div className={`d-flex flex-column ${style.hide_scrollbar}`} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
              <Marquee direction="left" speed={120}>
              {Object.keys(groupedAchievements).map((category) => {
                const achievements = groupedAchievements[category];
                const mid = Math.ceil(achievements.length / 2);
                const firstRow = achievements.slice(0, mid);
                const secondRow = achievements.slice(mid);

                return (
                  <div key={category} className="mb-5">
                    <div
                      className={`d-flex flex-nowrap mb-3 ${style.hide_scrollbar}`}
                      style={{
                        overflowX: 'auto',
                        overflowY: 'hidden',   // Hide vertical scrollbar
                        gap: '20px',
                        paddingBottom: '10px',
                      }}
                    >
                      {firstRow.map((achievement, index) => (
                        <div key={index} style={{ minWidth: '320px' }}>
                          <Achievementcard achievement={achievement} />
                        </div>
                      ))}
                    </div>

                    <div
                      className={`d-flex flex-nowrap ${style.hide_scrollbar}`}
                      style={{
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        gap: '20px',
                        paddingBottom: '10px',
                      }}
                    >
                      {secondRow.map((achievement, index) => (
                        <div key={index} style={{ minWidth: '320px' }}>
                          <Achievementcard achievement={achievement} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </Marquee>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center pt-5">
            <button
              className="btn fw-bold"
              style={{ background: '#553cdf', color: 'white' }}
              onClick={handleRedirect}>
              Know More
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default NewsOnUs;
