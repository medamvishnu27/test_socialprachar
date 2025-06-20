import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { doc, getDoc,setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SocialProfileSettings = () => {
    const [input, setInput] = useState({
        facebook:'',
        twitter:'',
        linkedin:'',
        website:'',
        github:''
    });

    const user = auth.currentUser;
  

  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setInput(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
      toast.error("Error fetching user data:", error);
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  },[]);

  const changeHandler = (e) => {
    // setInput({ ...input, [e.target.name]: e.target.value });
    if (e.key === 'Backspace') return;
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRef = doc(db, 'Users', user.uid);

      const userData = {
        ...input,
        facebook:input.facebook,
        twitter:input.twitter,
        linkedin:input.linkedin,
        website:input.website,
        github:input.github
      };


      await setDoc(userRef, userData, { merge: true });
      toast.success('Profile updated successfully');
      console.log('Profile updated successfully');
    } catch (error) {
     toast.error('Error updating user data:', error);
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className='container-fluid'>
      <form className='update-profile-form p-2' onSubmit={handleSubmit} autoComplete='off'>
      <div className='row'>
             <div className='col-12 col-lg-3 col-sm-12 text-secondary'>
        <h6><i className="bi bi-facebook"></i>Facebook</h6>
             </div>
             <div className='col-12 col-lg-9 col-sm-12'>
        <input className='form-control mb-2' type='url' placeholder='https://facebook.com/username' onChange={changeHandler} name='facebook' value={input.facebook} />
</div>
            </div>
            <div className='row'>
             <div className='col-12 col-lg-3 col-sm-12 text-secondary'>
        <h6><i className="bi bi-twitter"></i>Twitter</h6>
             </div>
             <div className='col-12 col-lg-9 col-sm-12'>
        <input className='form-control p-2 mb-2' type='url' placeholder='https://twitter.com/username' onChange={changeHandler} name='twitter' value={input.twitter} />
        </div>
        </div>
        <div className='row'>
             <div className='col-12 col-lg-3 col-sm-12 text-secondary'>
        <h6><i className="bi bi-linkedin"></i> Linkedin</h6>
             </div>
             <div className='col-12 col-lg-9 col-sm-12'>
        
        <input className='form-control p-2 mb-2' type='url' placeholder='https://linkedin.com/username' onChange={changeHandler} name='linkedin' value={input.linkedin} />
        </div>
        </div>
        <div className='row'>
             <div className='col-12 col-lg-3 col-sm-12 text-secondary'>
        <h6><i className="bi bi-globe-americas"></i> Website</h6>
             </div>
             <div className='col-12 col-lg-9 col-sm-12'>
        <input className='form-control p-2 mb-2' type='urle' placeholder='https://example.com/' onChange={changeHandler} name='website' value={input.website} />
        </div>
        </div>
        <div className='row'>
             <div className='col-12 col-lg-3 col-sm-12 text-secondary'>
        <h6><i className="bi bi-github"></i> GitHub</h6>
             </div>
             <div className='col-12 col-lg-9 col-sm-12'>
        <input className='form-control p-2 mb-2' type='url' placeholder='https://github.com/username' onChange={changeHandler} name='github' value={input.github} />
</div>
</div>
        <button className='btn p-2 mb-2' type='urlit' style={{ backgroundColor: '#6031f6', color: 'white' }}>Submit</button>
        </form>
        <ToastContainer/>
        </div>
    );
};

export default SocialProfileSettings;

