import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Accordion = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is included in the SocialPrachar subscription?",
            answer: "Our subscription gives you access to multiple career-focused courses, live and recorded sessions, hands-on projects, internships, AI-powered career tools, and expert mentorship."
        },
        {
            question: "How does the EMI plan work?",
            answer: "You can start learning with an EMI as low as ₹50 per day. We offer flexible payment options to make learning affordable."
        },
        {
            question: "Can I access multiple courses under one subscription?",
            answer: "Yes! Our plans include a variety of courses such as Full Stack Development, Data Science, AI, Cloud Computing, Digital Marketing, and DevOps."
        },
        {
            question: "Are the courses live or recorded?",
            answer: "We offer both live training (online/classroom) and recorded sessions, depending on your plan. You can choose what suits your schedule."
        },
        {
            question: "Do I get a certificate after completing a course?",
            answer: "Yes! Upon successful completion of a course, you will receive an industry-recognized certification from SocialPrachar."
        },
        {
            question: "Will I get internship opportunities?",
            answer: "Yes, our Career Growth Pack & Ultimate Job-Ready Pack include internships where you gain hands-on experience working on real projects."
        },
        {
            question: "What kind of career support is provided?",
            answer: "We offer resume building, AI-powered mock interviews, job assistance, and mentorship to help you land a high-paying job."
        },
        {
            question: "Can working professionals take these courses?",
            answer: "Absolutely! Our courses are designed for freshers, working professionals, and career switchers, with flexible learning options."
        },
        {
            question: "What if I want a custom learning plan?",
            answer: "We offer a Custom Learning Pack where you can select courses as per your career goals and learning preferences."
        },
        {
            question: "How do I enroll in a subscription plan?",
            answer: "Click the 'Enroll Now' button, select your preferred plan, complete the payment, and start your learning journey instantly! 🚀"
        }
    ];


    return (
        <>
        
          <div className="bg-light py-5">
                <div className="container my-4 col-md-8">
                    <h3 className="text-center py-4"> Frequently Asked Questions (FAQs) – SocialPrachar Subscription Plans</h3>
                    {faqs.map((item, index) => (
                        <div key={index} className="border-bottom">
                            <button
                                className="w-100 text-left d-flex justify-content-between align-items-center py-3 border-0 bg-transparent"
                                onClick={() => toggleAccordion(index)}
                                style={{ fontSize: "18px", fontWeight: "500" }}
                            >
                                {item.question}
                                {openIndex === index ? <FaMinus /> : <FaPlus />}
                            </button>
                            {openIndex === index && (
                                <div className="py-2 px-3 py-3 text-muted">{item.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
          </div>
        </>
    );
};

export default Accordion;
