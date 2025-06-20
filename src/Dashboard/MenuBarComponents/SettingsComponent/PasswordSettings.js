import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordSettings = () => {
    const [email, setEmail] = useState("");
    const auth = getAuth();

    const triggerResetEmail = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent Successfully');
            console.log("Password reset email sent");

        } catch (error) {
            toast.error(error.message);
        }
    };
    
    return (
        <div className='container-fluid mt-3'>
            <form>
                <div className='row'>
                <div className='col-12 col-lg 9 col-md-10 col-sm-12'>
                <input
                    className='form-control p-2 mb-2'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                </div>
                <button
                    type='submit'
                    className='btn p-2 mb-2 mt-2'
                    style={{ backgroundColor: '#6031f6', color: 'white' }}
                    onClick={triggerResetEmail}
                >
                    Reset Password
                </button>
               
            </form>
            <ToastContainer />
        </div>
    );
};

export default PasswordSettings;



// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';



// const PasswordInput = () => {
//     const [passwordVisible, setPasswordVisible] = useState(false);
  
//     const togglePasswordVisibility = () => {
//       setPasswordVisible(!passwordVisible);
//     };
  
//     return (
//       <div style={{ position: 'relative', width: 'fit-content' }}>
//         <input
//         className='form-control'
//           type={passwordVisible ? 'text' : 'password'}
//           placeholder="Enter your password"
//           style={{ paddingRight: '30px' }}
//         />
//         <span
//           onClick={togglePasswordVisibility}
//           style={{
//             position: 'absolute',
//             right: '10px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             cursor: 'pointer'
//           }}
//         >
//           {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//         </span>
//       </div>
//     );
//   };
  
//   export default PasswordInput;







