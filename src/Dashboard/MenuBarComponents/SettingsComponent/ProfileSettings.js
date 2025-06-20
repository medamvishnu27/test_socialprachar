import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { deleteField, doc, FieldValue, getDoc, setDoc, updateDoc ,getFirestore} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import { deleteObject } from 'firebase/storage';
import defaultProfileImg from '../../../assets/black_profile.webp';
import background from '../../../assets/background-img.jpg'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,convertFromRaw,convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import style from './settings.module.css'
import Loading from '../../../components/extraComponents/loading';

const ProfileSettings = () => {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    mobileNumber: '',
    skill: '',
    bio: '',
    profileImg: null,
    coverImg: null,
    profileImageUrl:null,
    coverImageUrl:null
  });

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCoverMenu, setShowCoverMenu] = useState(false);

  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);

  const [userDetails,setUserDetails]=useState();
   const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
    const onEditorStateChange = (newState) => {
      setEditorState(newState);
    };
  const handleImageUpload = async (image, folder) => {
    const storageRef = ref(getStorage(), `${folder}/${image.name}`);
    await uploadBytes(storageRef, image);
    return getDownloadURL(storageRef);
  };

  const user = auth.currentUser;
  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'Users', user.uid));
      if (userDoc.exists()) {
        setUserDetails(userDoc.data())
        setInput(userDoc.data());
        setProfileImageUrl(userDoc.data().profileImageUrl);
        setCoverImageUrl(userDoc.data().coverImageUrl);
        const userData = userDoc.data();
        const bioRawContentState = JSON.parse(userData.bio);
        const bioEditorState = EditorState.createWithContent(convertFromRaw(bioRawContentState));
        setEditorState(bioEditorState);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
fetchUserData();
  },[user]);

  const changeHandler = (e) => {
    if (e.key === 'Backspace') return;
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleUploadPhoto = async (e, type) => {
    e.preventDefault();
    if (type === 'profile') {
      const profileImageUrl = await handleImageUpload(input.profileImg, 'profile-images');
      setProfileImageUrl(profileImageUrl);
      const userRef = doc(db, 'Users', user.uid);
      await updateDoc(userRef, { profileImageUrl });
    } else if (type === 'cover') {
      const coverImageUrl = await handleImageUpload(input.coverImg, 'cover-images');
      setCoverImageUrl(coverImageUrl);
      const userRef = doc(db, 'Users', user.uid);
      await updateDoc(userRef, { coverImageUrl });
    }
    setShowProfileMenu(false);
    setShowCoverMenu(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let newProfileImageUrl = input.profileImg
    //   ? await handleImageUpload(input.profileImg, 'profile-images')
    //   :userDetails.profileImageUrl;

    // let newCoverImageUrl = input.coverImg
    //   ? await handleImageUpload(input.coverImg, 'cover-images')
    //   : userDetails.coverImageUrl;

    try {
      const userRef = doc(db, 'Users', user.uid);
      const bioRawContentState = convertToRaw(editorState.getCurrentContent());

      const userData = {
        ...input,
        firstName: input.firstName,
        lastName: input.lastName,
        userName: input.userName,
        mobileNumber: input.mobileNumber,
        skill: input.skill,
        bio: JSON.stringify(bioRawContentState),
      };
      delete userData.profileImg;
      delete userData.coverImg;

      await setDoc(userRef, userData, { merge: true });
      toast.success('profile updated successfully')
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleProfileImageClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleCoverImageClick = () => {
    setShowCoverMenu(!showCoverMenu);
  };

  const handleFileChange = (e, type) => {
    if (type === 'profile') {
      setInput({ ...input, profileImg: e.target.files[0] });
    } else if (type === 'cover') {
      setInput({ ...input, coverImg: e.target.files[0] });
    }
  };


  const handleDeletePhoto = async (type) => {
  try {
    let storageRef;

    if (type === 'profile') {
      if (!userDetails.profileImageUrl) {
        console.error('Error: Profile image URL is not set.');
        return;
      }
      const profileImagePath = userDetails.profileImageUrl.split('?')[0].split('%2F').join('/');
      const profileImageName = profileImagePath.split('/').pop();
      const profileImageFolder = profileImagePath.split('/').slice(0, -1).join('/');
      storageRef = ref(getStorage(), profileImageFolder + '/' + profileImageName);
    } else if (type === 'cover') {
      if (!userDetails.coverImageUrl) {
        console.error('Error: Cover image URL is not set.');
        return;
      }
      const coverImagePath = userDetails.coverImageUrl.split('?')[0].split('%2F').join('/');
      const coverImageName = coverImagePath.split('/').pop();
      const coverImageFolder = coverImagePath.split('/').slice(0, -1).join('/');
      storageRef = ref(getStorage(), coverImageFolder + '/' + coverImageName);
    }

    await deleteObject(storageRef);
    if (type === 'profile') {
      await setProfileImageUrl(null);
    } else if (type === 'cover') {
      await setCoverImageUrl(null);
    }

    const userRef = doc(db, 'Users', user.uid);
    const userData = await getDoc(userRef);
    const updatedData = { ...userData.data() };

    if (type === 'profile') {
      updatedData.profileImageUrl = null;
    }
     else if (type === 'cover') {
      updatedData.coverImageUrl = null;
    }

    await setDoc(userRef, updatedData, { merge: true });

    console.log(`${type} image deleted successfully`);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
  setShowProfileMenu(false);
  setShowCoverMenu(false);
};


  return (
    <div className="container-fluid">
      <div className={style.header} style={{ backgroundImage: `url(${coverImageUrl?coverImageUrl:background})` }}>
        <div className={style.Profileimage}>
          {profileImageUrl ? (
            <>
            <img src={profileImageUrl} alt="Profile" />
            </>
          ) : (
            <img src={defaultProfileImg} alt="Profile" />
          )}
        <i className={`bi bi-camera ${style.ProfileBi}`} onClick={handleProfileImageClick}></i>
        </div>
    <div >
         <i className={`bi bi-camera ${style.coverBi} `} onClick={handleCoverImageClick}></i>
    </div>
     
     

</div>
      <form className="update-profile-form p-2" onSubmit={handleSubmit} autoComplete="off">
        {showProfileMenu && (
          <div className={`d-flex ${style.Bimenu} my-5`}>
       
            <input
            className='form-control m-2'
              type="file"
              onChange={(e) => handleFileChange(e, 'profile')}
            />
      <button className="btn btn-primary m-2" onClick={(e) => handleUploadPhoto(e, 'profile')}>
              Upload Photo
            </button>
      <button className="btn btn-danger m-2" onClick={(e) =>{
        e.preventDefault()
        handleDeletePhoto('profile')}}>
              Delete
            </button>

          </div>
        )}
        {showCoverMenu && (
          <div className={`d-flex menu ${style.Bimenu} my-5`}>
        
            <input
              type="file"
              onChange={(e) => handleFileChange(e, 'cover')}
              className='form-control m-2'
            />
          <button className="btn btn-primary m-2" onClick={(e) => handleUploadPhoto(e, 'cover')}>
              Upload Photo
            </button>
          
          <button className="btn btn-danger m-2" onClick={(e) =>{ 
            e.preventDefault()
            handleDeletePhoto('cover')}}>
              Delete
            </button>
          </div>
        )}
  <pre className={`col-sm-12 ${style.sizes}`}>Profile Photo Size: 200x200 pixels     Cover Photo Size: 700x430 pixels</pre>
      <div className='my-5 mt-5'>
        <div className='row'>
          <div className='col-12 col-sm-12 col-lg-6'>
        <label htmlFor='firstName'>First Name</label>
        <input
          className="form-control p-2 mb-2"
          id='firstName'
          type="text"
          placeholder="First Name"
          onChange={changeHandler}
          name="firstName"
          value={input.firstName}
        />
        </div>
        <div className='col-12 col-sm-12 col-lg-6'>
        <label htmlFor='lastName'>Last Name</label>
        <input
          className="form-control p-2 mb-2"
          id='lastName'
          type="text"
          placeholder="Last Name"
          onChange={changeHandler}
          name="lastName"
          value={input.lastName}
        />
        </div>
        </div>
<div className='row'>
<div className='col-12 col-sm-12 col-lg-6'>

        <label htmlFor='userName'>user Name</label>

        <input
          className="form-control p-2 mb-2"
          type="text"
          id='userName'
          placeholder="Username"
          onChange={changeHandler}
          name="userName"
          value={input.userName}
        />
        </div>
        <div className='col-12 col-sm-12 col-lg-6'>
        <label htmlFor='mobileNumber'>Mobile Number</label>
          <input
          className="form-control p-2 mb-2"
          id='mobileNumber'
          type="phone"
          placeholder="Mobile Number"
          onChange={changeHandler}
          name="mobileNumber"
          value={input.mobileNumber}
        />
        </div>
        </div>
        <label htmlFor='skills'>Skills/Occupation</label>
        <input
          className="form-control p-2 mb-2"
          id='skills'
          type="text"
          placeholder="UX Designer"
          onChange={changeHandler}
          name="skill"
          value={input.skill}
        />
        <label htmlFor='bio'>Bio</label>

  <div className='form-control p-2 mb-2'>
  
  <Editor
    editorState={editorState}
    toolbarClassName="toolbarClassName"
    wrapperClassName="wrapperClassName"
    editorClassName="editorClassName"
    onEditorStateChange={onEditorStateChange}
    toolbar={{
      options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
      inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
      list: { options: ['unordered', 'ordered'] },
      textAlign: { options: ['left', 'center', 'right', 'justify'] },
      history: { options: ['undo', 'redo'] },
      remove: { options: ['remove'] }
    }}
  />

</div>
<div className='col-12 col-lg-6 col-sm-6'>
        <label htmlFor='display'>Display name publicly as</label>
        
    {userDetails? (    <select className="form-select mb-2 p-3" aria-label="Default select example" onChange={changeHandler}  
    name="userName"
    value={input.userName}
        >
  <option value={userDetails.firstName+" "+userDetails.lastName}>{userDetails.firstName} {userDetails.lastName}</option>
  <option value={userDetails.userName}>{userDetails.userName}</option>
  <option value={userDetails.lastName}>{userDetails.lastName}</option>
  <option value={userDetails.firstName}>{userDetails.firstName}</option>

</select>)   :(
  // <p>Loading.....</p>
  <Loading/>
)
    }
    <p>The display name is shown in all public fields, such as the author name, instructor name, student name, and name that will be printed on the certificate.</p>
    </div>
     <button className="btn p-2 mb-2" type="submit" style={{backgroundColor:'#7c56f6',color:'white'}}>
          Update Profile
        </button>
        </div>
      </form>
      <ToastContainer />
    </div>

  );
};
export default ProfileSettings;