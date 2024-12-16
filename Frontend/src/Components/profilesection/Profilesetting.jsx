import { useCallback, useState, useEffect, useContext } from 'react';
import styles from '../css/Profile.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { AuthContext } from './AuthContext';
import { useUser } from '../Usercontext';

const Settings = () => {
    const navigate = useNavigate();
   
    const { user, updateBasicDetails,authenticated} = useUser();
    
    const onBackContainerClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const onGroupIconClick = useCallback(() => {
        const anchor = document.querySelector("[data-scroll-to='rectangle']");
        if (anchor) {
            anchor.scrollIntoView({ "block": "start", "behavior": "smooth" });
        }
    }, []);

    const onProfileSettingClick = useCallback(() => {
        if (authenticated) {
            navigate('/Editprofile');
        } else {
            navigate('/login');
        }
    }, [navigate, authenticated]);

    const onHealthClick = useCallback(() => {
        if (authenticated) {
            navigate('/medical-condition');
        } else {
            navigate('/login');
        }
    }, [navigate, authenticated]);

    const onDietaryClick = useCallback(() => {
        if (authenticated) {
            navigate('/dietry-pref');
        } else {
            navigate('/login');
        }
    }, [navigate, authenticated]);

    const logintoapp = useCallback(() => {
        navigate('/login');
    }, [navigate]);
// _________________________logout________________________________________--__________________-
const handleLogout = async () => {
    const csrfToken = getCSRFToken(); // Function to get the CSRF token from cookies
  
    try {
      const response = await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,  
        },
        credentials: 'include', 
      });
  
      const data = await response.json();
      console.log(data.message);  
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
    const getCSRFToken = () => {
        const csrfToken = document.cookie
          .split(';')
          .find(cookie => cookie.trim().startsWith('csrftoken='))
          ?.split('=')[1];
        console.log('CSRFToken:', csrfToken)  
        return csrfToken;
      };

    // ________________________________________________________________________________________________________________-

    return (
        <div className={styles.profile}>


            <div className={styles.back} onClick={onBackContainerClick}>
                <img className={styles.backChild} alt="" src="./scanimg/Arrow-black.svg" />
                <div className={styles.profileSettingWrapper}>
                    <div className={styles.profileSetting}>{`Profile & Setting`}</div>
                </div>
            </div>
            <div className="profile-setting">
                <div className="profile-pic">
                    <div className="framechild"></div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="black" d="m11.4 18.161l7.396-7.396a10.3 10.3 0 0 1-3.326-2.234a10.3 10.3 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.6 6.6 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56q.647-.308 1.211-.749c.318-.248.607-.537 1.184-1.114m9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.75 8.75 0 0 0 2.092 3.32a8.75 8.75 0 0 0 3.431 2.13z"/>
                    </svg> */}
                </div>
                <div className="joe-jesus-wrapper">
                    <div className="edit-profile">{`Welcome, ${ user?user.first_name : 'User'}`}</div>
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.frameGroup} onClick={onProfileSettingClick}>
                    <span className={styles.basicDetails}>{`Basic details `}</span>
                    <div className={styles.vectorWrapper}>
                        <img className={styles.frameInner} alt="" src="./scanimg/dropdown-arrow.svg" />
                    </div>
                </div>

                <div className={styles.frameGroup} onClick={onHealthClick}>
                    <div className={styles.basicDetails}>Medical details</div>
                    <div className={styles.vectorWrapper}>
                        <img className={styles.frameInner} alt="" src="./scanimg/dropdown-arrow.svg" />
                    </div>
                </div>

                <div className={styles.frameGroup} onClick={onDietaryClick}>
                    <div className={styles.basicDetails}>Dietary Preference</div>
                    <div className={styles.vectorWrapper}>
                        <img className={styles.frameInner} alt="" src="./scanimg/dropdown-arrow.svg" />
                    </div>
                </div>
                <div className={styles.frameGroup} >
                    <div className={styles.basicDetails}>security and privacy</div>
                    <div className={styles.vectorWrapper}>
                        <img className={styles.frameInner} alt="" src="./scanimg/dropdown-arrow.svg" />
                    </div>
                </div>
                <div className={styles.frameGroup} >
                    <div className={styles.basicDetails}>policy and legiments</div>
                    <div className={styles.vectorWrapper}>
                        <img className={styles.frameInner} alt="" src="./scanimg/dropdown-arrow.svg" />
                    </div>
                </div>
                
                
                
            </div>
            {!authenticated ? (
                <div className={styles.login_btn} onClick={logintoapp}>
                     Login
                     </div>
            ) : (
                <>
                    <div className={styles.logout} onClick={handleLogout}>
                    <div className={styles.logoutWrapper}>
                        <div className={styles.profileSetting}>Logout</div>
                    </div>
                    <img className={styles.materialSymbolslogoutIcon} alt="" src="./scanimg/logout.svg" />
                </div>
                </>
            )}
        </div>
    );
};

export default Settings;
