import { useCallback, useState, useEffect, useContext } from 'react';
import styles from '../css/Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Usercontext';
import Cookies from 'js-cookie'; 

const Settings = () => {
    const navigate = useNavigate();
    const { user, updateBasicDetails, authenticated } = useUser();

    const onBackContainerClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const onGroupIconClick = useCallback(() => {
        const anchor = document.querySelector("[data-scroll-to='rectangle']");
        if (anchor) {
            anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
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

    const handleLogout = async () => {
        console.log('Try LOGOUT');

         Cookies.remove('access_token'); // Clear access token
                Cookies.remove('refresh_token'); // Clear refresh token
                Cookies.remove('csrf_token'); // Clear CSRF token
                window.location.href = '/login'; // Redirect to login
        const csrfToken = getCSRFToken();
    
        if (!csrfToken || csrfToken.length !== 32) {
            console.error('CSRF Token is missing or has incorrect length');
            return;
        }
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include', // Include cookies for authentication
            });
    
            if (!response.ok) {
                throw new Error(`Logout failed with status ${response.status}`);
            }
    
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
        console.log('CSRFToken:', csrfToken);
        return csrfToken;
    };
    

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
                </div>
                <div className="joe-jesus-wrapper">
                    <div className="edit-profile">{`Welcome, ${user ? user.first_name : 'User'}`}</div>
                </div>
            </div>

            <div className={styles.details}>
                <div className={styles.frameGroup} onClick={onProfileSettingClick}>
                    <span className={styles.basicDetails}>{`Basic details`}</span>
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

                <div className={styles.frameGroup}>
                    <div className={styles.basicDetails}>Security and Privacy</div>
                    <div className={styles.vectorWrapper}>
                        <img className={styles.frameInner} alt="" src="./scanimg/dropdown-arrow.svg" />
                    </div>
                </div>

                <div className={styles.frameGroup}>
                    <div className={styles.basicDetails}>Policy and Legiments</div>
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
                <div className={styles.logout} onClick={handleLogout}>
                    <div className={styles.logoutWrapper}>
                        <div className={styles.profileSetting}>Logout</div>
                    </div>
                    <img className={styles.materialSymbolslogoutIcon} alt="" src="./scanimg/logout.svg" />
                </div>
            )}
        </div>
    );
};

export default Settings;
