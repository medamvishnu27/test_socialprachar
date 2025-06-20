import React, { useState } from 'react';
import EnrollDetailsStyle from './enrollDetails.module.css';
import axios from 'axios';
import enrollStyle from '../../assets/enrollDetails.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Adjust path as necessary

const EnrollDetails = () => {
  const [subCategory, setSubCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subOptions, setSubOptions] = useState([]);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Number, setNumber] = useState('');

  const mainOptions = {
    'Web Development': [
      'Full Stack Java',
      'Full Stack Python',
      'MERN Stack',
      'UI UX',
      'Advanced Full Stack',
    ],
    Analytics: ['Data Analytics', 'Data Science', 'Artificial Intelligence', 'Generative AI'],
    Marketing: ['Digital Marketing', 'SEO', 'Digital Marketing with AI Tools'],
    Accounting: ['Advanced Tally', 'Taxation', 'GST Filing'],
    Finance: ['Finance Literacy', 'Banking, Capital Market and Investments'],
  };

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    setSubOptions(mainOptions[selected] || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      Name: Name,
      Email: Email,
      Phone: Number,
      Course: selectedCategory,
      SubCourse: subCategory,
    };

    axios
      .post('https://sheetdb.io/api/v1/vc8477g8j4y6e', submissionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.data.created === 1) {
          toast.success('Form Submitted Successfully');
        } else {
          toast.error('Form submission failed!');
        }
        console.log(response);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error(error.message);
      });

    setName('');
    setEmail('');
    setNumber('');
    setSelectedCategory('');
    setSubOptions([]);
    setSubCategory('');
  };

  const handleMobileNumberChange = (value) => {
    setNumber(value); // Update the state with the current input value

    // Automatically save if the number has 10 or more digits
    if (value.length >= 10) {
      saveNumber(value);
    }
  };

  const saveNumber = (number) => {
    console.log("Saving number:", number);

    // Simulate an API call or localStorage save
    axios
      .post('https://sheetdb.io/api/v1/vc8477g8j4y6e', { Phone: number }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.data.created === 1) {
          // toast.success('Number saved successfully!');
        } else {
          // toast.error('Failed to save the number.');
        }
      })
      .catch((error) => {
        console.error('Error saving number:', error);
        toast.error('Error saving number: ' + error.message);
      });
  };

  return (
    <div className={`container mb-5`}>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
        <div className={`col ${EnrollDetailsStyle.infoAboutUser}`}>
          <img src={enrollStyle} alt="Enroll Details" />
        </div>

        <div>
          <h2 className='text-center fw-bold' style={{ color:'#221859'}}>Let's...! Get Start</h2>
          <div className={`${EnrollDetailsStyle.detailsContainer}`}>
            <form className={`col ms-2 ${EnrollDetailsStyle.form}`} onSubmit={handleSubmit}>
              <div className={EnrollDetailsStyle.inputDivs}>
                <label htmlFor="inputForNumber" className="form-label">
                  Mobile No +91:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  value={Number}
                  onChange={(e) => handleMobileNumberChange(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter Number"
                  required
                />
              </div>


              <div className={EnrollDetailsStyle.inputDivs}>
                <label htmlFor="inputForText" className="form-label">
                  Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="john"
                  required
                />
              </div>

              <div className={EnrollDetailsStyle.inputDivs}>
                <label htmlFor="inputForEmail" className="form-label">
                  Email :
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@gmail.com"
                  required
                />
              </div>

              <div className={EnrollDetailsStyle.inputDivs}>
                <label htmlFor="inputForCategory" className="form-label">
                  Select your course :
                </label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Finance">Finance</option>
                  <option value="HR Analytics">HR Analytics</option>
                </select>
              </div>

              {subOptions.length > 0 && (
                <div className={EnrollDetailsStyle.inputDivs}>
                  <label htmlFor="inputForSubCategory" className="form-label">
                    Select your domain :
                  </label>
                  <select
                    className="form-select"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Sub-Option</option>
                    {subOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button className={`${EnrollDetailsStyle.submitBtn}`} type="submit">
                Submit
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollDetails;
