import React, { useEffect, useState } from 'react';
import { auth, db } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { convertFromRaw, EditorState, Editor } from 'draft-js';
import Loading from '../../components/extraComponents/loading.js';

const MyProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [registrationDate, setRegistrationDate] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const user = auth.currentUser;
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserDetails(userData); // Update userDetails state
          // const bioRawContentState = JSON.parse(userData.bio);
          if (userData.bio) {
            const bioRawContentState = JSON.parse(userData.bio);
            const bioEditorState = EditorState.createWithContent(convertFromRaw(bioRawContentState));
            setEditorState(bioEditorState);
          } else {
            setEditorState(EditorState.createEmpty()); // Set an empty editor state if bio is empty or null
          }
          // const bioEditorState = EditorState.createWithContent(convertFromRaw(bioRawContentState));
          // setEditorState(bioEditorState);
        } else {
          console.log("User document not found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const creationTime = user.metadata.creationTime;
        setRegistrationDate(new Date(creationTime));
      }
    });
  }, []);


  return (
    <div className='container-fluid' style={{ whiteSpace: 'wrap' }}>
      {userDetails ? (
        <div className='row'>
          <div className='col-lg-8 col-md-10 col-sm-12'>
            <h3 className="mb-3">My Profile</h3>
            <div className='row'>
              <div className=' col-lg-3 col-md-4 col-sm-12'>
                <h6>Registration Date</h6>
              </div>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <p>{registrationDate.toString()}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <h6>First Name</h6>
              </div>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <p>{userDetails.firstName}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <h6>Last Name</h6>
              </div>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <p>{userDetails.lastName}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <h6>User Name</h6>
              </div>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <p>{userDetails.userName}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <h6>Email</h6>
              </div>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <p>{userDetails.email}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <h6>Phone Number</h6>
              </div>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <p>{userDetails.mobileNumber}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <h6>Skills/Occupation</h6>
              </div>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <p>{userDetails.skill}</p>
              </div>
              </div>
             <div className='row'>
              <div className='col-lg-3 col-md-4 col-sm-12 mt-3'>
               <h6>Bio</h6>
              </div>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  readOnly={true} // Set readOnly to true to prevent editing
                />
              </div>
            </div>
         </div>
              </div>
         ):(
                //  <p>Loading....</p>
                <Loading/>
             )}
         </div>

    );
};

export default MyProfile;