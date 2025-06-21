import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './codeclash.module.css';

const CodeClash = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Removed useEffect for document.title

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    passoutYear: '',
    languages: [],
    graduationType: '',
    collegeName: '',
    category: ''
  });

  const prizes = [
    {
      position: "1st",
      amount: "₹10,000",
      description: "Cash Prize + Lifetime Social Prachar Subscription + Certificate",
      icon: "🏆",
      bgColor: styles.prizeGold,
      borderColor: styles.borderGold
    },
    {
      position: "2nd",
      amount: "₹8,000",
      description: "Cash Prize + 1-Year Social Prachar Subscription + Certificate",
      icon: "🥈",
      bgColor: styles.prizeSilver,
      borderColor: styles.borderSilver
    },
    {
      position: "3rd",
      amount: "₹5,000 ",
      description: "Cash Prize + 6-Month Social Prachar Subscription + Certificate",
      icon: "🥉",
      bgColor: styles.prizeBronze,
      borderColor: styles.borderBronze
    }
  ];

  const participationSteps = [
    {
      step: "Step 1:",
      title: "Register For Code Clash 2.0",
      description: "Fill the registration form below",
      icon: "👤",
      bgColor: styles.stepPurple
    },
    {
      step: "Step 2:",
      title: "Fill All Required Details",
      description: "Complete all the details required for registration",
      icon: "✅",
      bgColor: styles.stepBlue
    },
    {
      step: "Step 3:",
      title: "Get WhatsApp Community Link",
      description: "We will send our WhatsApp community link",
      icon: "💬",
      bgColor: styles.stepGreen
    },
    {
      step: "Step 4:",
      title: "Join Our Community",
      description: "Join our community (we will share all updates)",
      icon: "👥",
      bgColor: styles.stepOrange
    },
    {
      step: "Step 5:",
      title: "Participate in Code Clash 2.0",
      description: "As per instructions participate in the code clash",
      icon: "▶️",
      bgColor: styles.stepRed
    },
    {
      step: "Step 6:",
      title: "Win Exciting Prizes",
      description: "Win exciting prizes and our subscription benefits",
      icon: "✨",
      bgColor: styles.stepPink
    }
  ];

  const languages = ["HTML", "CSS", "JavaScript", "Bootstrap"];

  const faqs = [
    {
      question: "Who can participate in Code Clash 2.0?",
      answer: "Any student who has graduated in 2024 or 2025 and has basic to strong knowledge in JavaScript & ReactJS is eligible to participate."
    },
    {
      question: "Is there any registration fee?",
      answer: "No registration fee. Participation is completely free."
    },
    {
      question: "What is the format of the hackathon?",
      answer: "It's a 7-day format: Days 1 to 6 consist of daily online coding challenges (1-hour tasks), and Day 7 is an offline 3-hour finale challenge at SocialPrachar HQ, KPHB, Hyderabad."
    },
    {
      question: "Do I need to attend all 7 days?",
      answer: "Yes. Attendance and task submission each day is mandatory to qualify for the Day 7 finale."
    },
    {
      question: "Where will the offline finale be held?",
      answer: "At SocialPrachar, KPHB, Hyderabad (exact address will be shared via WhatsApp & email after selection)."
    },
    {
      question: "What are the prizes?",
      answer: "Winners will receive: 1st - ₹10,000 + Lifetime SP Subscription; 2nd - ₹8,000 + 1-Year SP Subscription; 3rd - ₹5,000 + 6-Month SP Subscription."
    },
    {
      question: "Will certificates be provided?",
      answer: "Yes, all participants who complete all 7 days will get a Participation Certificate. Winners will get a Winner Certificate."
    },
    {
      question: "How to register?",
      answer: "Fill out the registration form. We will contact shortlisted participants via WhatsApp & email."
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  // New handler for select all toggle
  const handleSelectAllLanguages = (checked) => {
    if (checked) {
      setFormData(prev => ({ ...prev, languages: [...languages] }));
    } else {
      setFormData(prev => ({ ...prev, languages: [] }));
    }
  };

  const showToast = (message, type = 'success') => {
    const existingToasts = document.querySelectorAll(`.${styles.toast}`);
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `${styles.toast} ${styles[`toast-${type}`]}`;
    toast.innerHTML = `
      <div class="${styles.toastContent}">
        <span>${message}</span>
        <button class="${styles.toastClose}" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  };

  // Updated saveToGoogleSheet function with better error handling and CORS support
  const saveToGoogleSheet = async (data) => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycby3NSJnaErc36oFwIn7QZ6K54Dlx5O0fOuCd9ObK1V2EFGcKuWlN37i3om7-FNgLd6N/exec';

    console.log('Sending data to Google Sheet:', data);

    try {
      // Client-side validation
      if (!data.name || !data.email || !data.whatsapp) {
        throw new Error('Missing required fields: name, email, or whatsapp');
      }

      // Prepare FormData (avoids CORS preflight)
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'cors',
        body: formData // No headers!
      });

      const responseText = await response.text();
      console.log('Raw response from Google Apps Script:', responseText);

      try {
        const result = JSON.parse(responseText);
        if (result.status === 'error') {
          throw new Error(result.message || 'Unknown server error');
        }
        return result;
      } catch (err) {
        if (response.ok) {
          return {
            status: 'success',
            message: 'Registration submitted successfully',
            rawResponse: responseText
          };
        } else {
          throw new Error('Invalid server response');
        }
      }

    } catch (error) {
      console.error('Error submitting to Google Sheet:', error);
      if (error.name === 'TypeError') {
        throw new Error('Network error: Please check your connection or script URL.');
      } else {
        throw error;
      }
    }
  };


  // Updated handleSubmit function with better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Comprehensive form validation
      const validationErrors = [];

      if (!formData.name.trim()) {
        validationErrors.push('Please enter your full name');
      }
      if (!formData.email.trim()) {
        validationErrors.push('Please enter your email address');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        validationErrors.push('Please enter a valid email address');
      }
      if (!formData.whatsapp.trim()) {
        validationErrors.push('Please enter your WhatsApp number');
      } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.whatsapp)) {
        validationErrors.push('Please enter a valid WhatsApp number');
      }
      if (!formData.passoutYear) {
        validationErrors.push('Please select your passout year');
      }
      if (!formData.graduationType) {
        validationErrors.push('Please select your graduation type');
      }
      if (!formData.collegeName.trim()) {
        validationErrors.push('Please enter your college name');
      }
      // if (!formData.category) {
      //   validationErrors.push('Please select your category');
      // }
      if (formData.languages.length === 0) {
        validationErrors.push('Please select at least one programming language');
      }
      // if (formData.courses.length === 0) {
      //   validationErrors.push('Please select at least one course');
      // }

      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }

      // Submit to Google Sheet
      const result = await saveToGoogleSheet(formData);
      console.log('Registration result:', result);

      // Show success message
      showToast("🎉 Registration Successful! Redirecting to WhatsApp community...", 'success');

      // Close form and reset data
      setIsFormOpen(false);
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        passoutYear: '',
        languages: [],
        graduationType: '',
        collegeName: '',
        courses: [],
        category: ''
      });

      // Redirect immediately to WhatsApp community link
      window.open('https://chat.whatsapp.com/EVIiK9MJez91nEiP03Ft7L', '_blank');

    } catch (error) {
      console.error('Form submission error:', error);
      showToast(`❌ ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.pageContainer} style={{ background: "linear-gradient(to top, rgb(107, 86, 229) 5%, rgb(244, 240, 240) 100%)", }}>
        <div className="container mx-auto px-4 py-8">
          <div className={`text-center mb-12 ${styles.fadeIn}`}>
            <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
              <span className={`${styles.headerIcon} ${styles.bounce}`}>💻</span>
              <h1 className={styles.mainTitle}>
                Code Clash 2.0
              </h1>
              <span className={`${styles.headerIcon} ${styles.bounce} ${styles.bounceDelay}`}></span>
            </div>
            <p className={styles.subtitle}>by Social Prachar</p>
            <p className={styles.tagline}>🏆 Challenge • 🎯 Showcase • 🏅 Rewards</p>
            <div className="d-flex flex-wrap justify-content-center gap-4 mb-8">
              <span className={`${styles.badge} ${styles.badgePurple}`}>
                📅 Registration Open
              </span>
              <span className={`${styles.badge} ${styles.badgeGreen}`}>
                👥 1000+ Participants Expected
              </span>
              <span className={`${styles.badge} ${styles.badgeOrange}`}>
                🎁 ₹23,000+ Prize Pool
              </span>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoHeader}>
              <h2 className={styles.infoTitle}>Code Clash 2.0 by Social Prachar</h2>
              <div className={styles.infoSubtitle}>
                7 Days • 7 Challenges • 3 Winners
              </div>
              <p className={styles.infoDescription}>
                Winners will win total cash prizes and subscription to Social Prachar worth <span className={styles.cahprizee}>₹1,30,000 INR</span>
              </p>
            </div>
            <div className={styles.infoContent}>
              <div className="row">
                <div className="col-md-4">
                  <div className={styles.infoItem}>
                    <div className={styles.infoItemHeader}>
                      <span className={styles.infoIcon}>🎓</span>
                      <h3>Eligibility</h3>
                    </div>
                    <p>
                      Students with <span className=''>B-tech,MBA,MCA,Degree</span> background with Pass-out years <span className=''>2024, 2025,2026 </span> are eligible to take the Code Clash test.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={styles.infoItem}>
                    <div className={styles.infoItemHeader}>
                      <span className={styles.infoIcon}>💡</span>
                      <h3>Skills Required</h3>
                    </div>
                    <p>
                      Only on Frontend-Development  skills <span>Html,Css,javascript,Bootstrap</span> (medium to hard level)
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={styles.infoItem}>
                    <div className={styles.infoItemHeader}>
                      <span className={styles.infoIcon}>🎯</span>
                      <h3>Process</h3>
                    </div>
                    <p>
                      7-day challenge: 6 days online challenges and final 7th day grand finale offline At Our Kphb office.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.infoFooter}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center gap-3">
                      <span className={styles.infoIcon}>⏰</span>
                      <div>
                        <h4>Online Challenge</h4>
                        <p>June 20, 2025 - June 26, 2025</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="d-flex align-items-center gap-3">
                      <span className={styles.infoIcon}>📍</span>
                      <div>
                        <h4>Grand Finale (Offline)</h4>
                        <p>June 28, 2025 - At our KPHB Office</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* extra registration button */}


          <div className="text-center mb-8">
            <motion.button
              onClick={() => setIsFormOpen(true)}
              className={styles.secondaryButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <span>👤</span> */}
              Register for codeclash
              {/* <span>✨</span> */}
            </motion.button>
          </div>



          <div className={styles.participationSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>How to Participate</h2>
              <p className={styles.sectionDescription}>
                Follow these simple steps to join Code Clash 2.0
              </p>
            </div>
            <div className={styles.stepsContainer}>
              {participationSteps.map((item, index) => (
                <motion.div
                  key={index}
                  className={`${styles.stepCard} ${item.bgColor} ${styles.hoverScale}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="d-flex align-items-start gap-4">
                    <div className={styles.stepIcon}>
                      <span>{item.icon}</span>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <h3 className={styles.stepNumber}>{item.step}</h3>
                        <h4 className={styles.stepTitle}>{item.title}</h4>
                      </div>
                      <p className={styles.stepDescription}>{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* events detils card */}
          <div className="row mb-12 gy-3  ">
            <div className="col-md-4  "  >
              <motion.div
                className={`${styles.eventCard} ${styles.hoverScale}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.eventCardHeader}  >
                  <span className={styles.eventIcon}>⭐</span>
                  <h3>Event Overview</h3>
                </div>
                <div className={styles.eventCardContent}>
                  <p>
                    Join the ultimate coding challenge designed for passionate developers.
                    Test your skills, learn new technologies, and win amazing prizes!
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="col-md-4 " >
              <motion.div
                className={`${styles.eventCard} ${styles.hoverScale}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className={styles.eventCardHeader}>
                  <span className={styles.eventIcon}>⚡</span>
                  <h3>Competition Format</h3>
                </div>
                <div className={styles.eventCardContent}>
                  <p>
                    Multi-round coding challenges including algorithm problems,
                    web development tasks, and innovative project showcases.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="col-md-4 " >
              <motion.div
                className={`${styles.eventCard} ${styles.hoverScale}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className={styles.eventCardHeader}>
                  <span className={styles.eventIcon}>🏅</span>
                  <h3>Skills Required</h3>
                </div>
                <div className={styles.eventCardContent}>
                  <p>
                    JavaScript and ReactJS. Perfect for students and beginners to showcase their talent!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* prize pool section */}

          <div className={styles.prizeSection}>
            <div className={styles.prizeSectionHeader}>
              <span className={styles.prizeIcon}>🏆</span>
              <h2 className={styles.prizeSectionTitle}>🏆 Prize Pool 🏆</h2>
              <p className={styles.prizeSectionDescription}>
                Win exciting cash prizes and subscriptions worth ₹1,30,000 INR            </p>
            </div>
            <div className={styles.prizeSectionContent}>
              <div className="row mb-8 gy-3 ">
                {prizes.map((prize, index) => (
                  <div key={index} className="col-md-4">
                    <motion.div
                      className={`${styles.prizeCard} ${prize.bgColor} ${prize.borderColor}`}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className={styles.prizeCardContent}>
                        <div className={styles.prizeCardIcon}>
                          <span>{prize.icon}</span>
                        </div>
                        <div className={styles.prizePosition}>
                          {prize.position}
                        </div>
                        <div className={styles.prizeAmount}>
                          {prize.amount}
                          <span className={styles.cashPrizeText}>Cash prize</span>
                        </div>
                        <p className={styles.prizeDescription}>
                          {prize.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className={styles.prizeSummary}>
                <p className={styles.prizeSummaryText}>
                  🎯 Total Prize Pool: ₹23,000+ Cash + Social Prachar Subscriptions Worth ₹1.3 Lakhs
                </p>
                <div className={styles.prizeSummarySubtext}>
                  <span>🎁</span>
                  <span>Plus exclusive benefits and recognition!</span>
                </div>
              </div>
            </div>
          </div>

          {/* register button */}

          <div className="text-center mb-12">
            <motion.button
              onClick={() => setIsFormOpen(true)}
              className={`${styles.primaryButton} ${styles.pulseAnimation}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🏆</span>
              Register for Code Clash
              <span>⚡</span>
            </motion.button>
          </div>

          <div className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
              <p className={styles.faqDescription}>
                Find answers to common questions about Code Clash 2.0
              </p>
            </div>
            <div className={styles.faqContent}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className={styles.faqItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className={styles.faqQuestion}
                  >
                    <span>{faq.question}</span>
                    <span className={`${styles.faqIcon} ${openFaq === index ? styles.faqIconOpen : ''}`}>
                      ▼
                    </span>
                  </button>
                  {openFaq === index && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <motion.button
              onClick={() => setIsFormOpen(true)}
              className={styles.secondaryButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <span>👤</span> */}
              Register Now
              <span>✨</span>
            </motion.button>
          </div>

          {isFormOpen && (
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.modalHeader}>
                  <div className="d-flex align-items-center gap-4">
                    <div className={styles.modalIcon}>
                      <span>💻</span>
                    </div>
                    <div>
                      <h2 className={styles.modalTitle}>Code Clash 2.0 Registration</h2>
                      <p className={styles.modalDescription}>
                        Fill in your details to join the ultimate coding challenge
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className={styles.modalClose}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.registrationForm}>
                  <div className={styles.formSection}>
                    <h3 className={styles.formSectionTitle}>
                      <span className={styles.formSectionIcon}>👥</span>
                      Personal Information
                    </h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Full Name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={styles.formInput}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Email Address *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={styles.formInput}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>WhatsApp Number *</label>
                          <input
                            type="text"
                            value={formData.whatsapp}
                            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                            className={styles.formInput}
                            placeholder="+91 9876543210"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Year of Passout *</label>
                          <div className={styles.radioGroup}>
                            {['2024', '2025', '2026'].map(year => (
                              <div key={year} className={styles.radioItem}>
                                <input
                                  type="radio"
                                  id={year}
                                  name="passoutYear"
                                  value={year}
                                  checked={formData.passoutYear === year}
                                  onChange={(e) => handleInputChange('passoutYear', e.target.value)}
                                />
                                <label htmlFor={year}>{year}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formSection}>
                    <h3 className={styles.formSectionTitle}>
                      <span className={styles.formSectionIcon}>🏅</span>
                      Academic Details
                    </h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Graduation Type *</label>
                          <select
                            value={formData.graduationType}
                            onChange={(e) => handleInputChange('graduationType', e.target.value)}
                            className={styles.formSelect}
                            required
                          >
                            <option value="">Choose graduation type</option>
                            <option value="btech">B.Tech</option>
                            <option value="degree">Degree</option>
                            <option value="diploma">Diploma</option>

                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>College Name *</label>
                          <input
                            type="text"
                            value={formData.collegeName}
                            onChange={(e) => handleInputChange('collegeName', e.target.value)}
                            className={styles.formInput}
                            placeholder="Enter your college name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Category *</label>
                      <div className={styles.radioGroup}>
                        <div className={styles.radioItem}>
                          <input
                            type="radio"
                            id="cat-btech"
                            name="category"
                            value="btech"
                            checked={formData.category === 'btech'}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                          />
                          <label htmlFor="cat-btech">B.Tech</label>
                        </div>
                        <div className={styles.radioItem}>
                          <input
                            type="radio"
                            id="cat-degree"
                            name="category"
                            value="degree"
                            checked={formData.category === 'degree'}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                          />
                          <label htmlFor="cat-degree">Degree</label>
                        </div>
                        <div className={styles.radioItem}>
                          <input
                            type="radio"
                            id="cat-diploma"
                            name="category"
                            value="diploma"
                            checked={formData.category === 'diploma'}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                          />
                          <label htmlFor="cat-diploma">diploma</label>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className={styles.formSection}>
                    <h3 className={styles.formSectionTitle}>
                      <span className={styles.formSectionIcon}>💻</span>
                      Technical Skills
                    </h3>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Languages and Frameworks you know *</label>
                      <div className={styles.selectAllCheckboxContainer}>
                        <input
                          type="checkbox"
                          id="select-all-languages"
                          checked={formData.languages.length === languages.length}
                          onChange={(e) => handleSelectAllLanguages(e.target.checked)}
                        />
                        <label htmlFor="select-all-languages">Select All</label>
                      </div>
                      <div className={styles.checkboxGrid}>

                        {languages.map(lang => (
                          <div key={lang} className={styles.checkboxItem}>
                            <input
                              type="checkbox"
                              id={lang}
                              checked={formData.languages.includes(lang)}
                              onChange={(e) => handleArrayChange('languages', lang, e.target.checked)}
                            />
                            <label htmlFor={lang}>{lang}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center pt-6">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${styles.submitButton} ${isSubmitting ? styles.submitButtonDisabled : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <div className="d-flex align-items-center gap-3">
                          <div className={styles.spinner}></div>
                          Registering...
                        </div>
                      ) : (
                        <div className="d-flex align-items-center gap-3">
                          <span>✅</span>
                          Complete Registration
                          {/* <span>✨</span> */}
                        </div>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default CodeClash;
