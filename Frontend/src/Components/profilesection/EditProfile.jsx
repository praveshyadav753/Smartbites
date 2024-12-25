import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EditProfile.css';
import GenderDropdown from './Gendercompo'; // Import the gender dropdown component
import AgeRangeSlider from './AgeRangeSlider';
import { useUser } from '../Usercontext';
const EditProfile = () => {
    const navigate = useNavigate();
//_____________________________________________________________________________________________    
    
    // Manage dropdown state for all sections
    const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
    const [isHeightDropdownOpen, setIsHeightDropdownOpen] = useState(false);
    const [isWeightDropdownOpen, setIsWeightDropdownOpen] = useState(false);


      // Toggle dropdowns
    const toggleNameDropdown = () => setIsNameDropdownOpen(prevState => !prevState);
    const toggleGenderDropdown = () => setIsGenderDropdownOpen(prevState => !prevState);
    const toggleAgeDropdown = () => setIsAgeDropdownOpen(prevState => !prevState);
    const toggleHeightDropdown = () => setIsHeightDropdownOpen(prevState => !prevState);
    const toggleWeightDropdown = () => setIsWeightDropdownOpen(prevState => !prevState);
// ____________________________________________________________-________________________________
    const { user, updateBasicDetails ,updateAuthenticationStatus} = useUser();
    const [first_name, setfName] = useState(user?.first_name || '');
    const[last_name, setlName] = useState(user?.last_name || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [age, setAge] = useState(user?.age || '');
    const [height, setHeight] = useState(user?.height || '');
    const [weight, setWeight] = useState(user?.weight || '');




//____________________________ Back button navigation_____________________________________

    const onBackContainerClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

//__________________________________________________________________________________________

   
  

    // Handle weight change
    const handleWeightChange = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setWeight(value);
        }
    };
   
    
    // Handle name change
    const handlefirst_NameChange = (event) => {
        setfName(event.target.value);
    };
    const handlelast_NameChange = (event) =>{
        setlName(event.target.value);
    }
// ____________________________________________________________________________________________
    
    
    // Handle profile submission
    const handleProfileSubmit = async () => {
        
        
        const profileData = {
            first_name,
            last_name,
            gender,
            age,
            height: parseFloat(height),  // Ensure height is a number
            weight: parseFloat(weight),  // Ensure weight is a number
        };

        try {
            // Send profile data to the backend (adjust the URL as needed)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/update/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Set Content-Type header to application/json
                },
                credentials: 'include',
                body: JSON.stringify(profileData),
            });

            
            if (response.ok) {
                const updatedData = await response.json();
                updateBasicDetails(updatedData);
                updateAuthenticationStatus(true);
                console.log(response)
                alert('Profile updated successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Profile update failed'}`);
            }
        } catch (error) {
            // Handle network errors or other issues
            updateAuthenticationStatus(false);
            alert('Failed to update profile. Please try again later.');
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="edit-profile-container">
            <div className='back-edit' onClick={onBackContainerClick}>
                <img className='backChild' alt="" src="./scanimg/Arrow-black.svg" />
                <div className="profileSetting">Edit Profile</div>
            </div>

            <div className="profile-setting">
                <div className="profile-pic">
                    <div className="framechild"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="black" d="m11.4 18.161l7.396-7.396a10.3 10.3 0 0 1-3.326-2.234a10.3 10.3 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.6 6.6 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56q.647-.308 1.211-.749c.318-.248.607-.537 1.184-1.114m9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.75 8.75 0 0 0 2.092 3.32a8.75 8.75 0 0 0 3.431 2.13z"/>
                    </svg>
                </div>
                <div className="joe-jesus-wrapper">
                    <div className="edit-profile">{first_name}</div>
                </div>
            </div>
            <div className="details-wrapper">
                <div className="details">
{/* -----------------------------------------name dropdown--------------------------------------------- */}

                    <div className="frame-parent1 name-select" onClick={toggleNameDropdown}>
                        <div className="dropdown-menu1">
                            <div className="name">Name</div>
                            <div className='drop-cont'>  
                                { !isNameDropdownOpen &&<span>{user?.first_name}</span> }
                                    <img className={`arrow-icon ${isNameDropdownOpen ? 'rotate-arrow' : ''}`}
                                        src="./scanimg/dropdown-arrow.svg"
                                        alt="arrow" />
                            </div>            
                        </div>
                        {isNameDropdownOpen && (
                            <div className="dropdown-content">
                                <input
                                    type="text"
                                    placeholder='First name'
                                    className='inputprofile'
                                    value={first_name}
                                    onChange={handlefirst_NameChange}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <input
                                    type="text"
                                    placeholder='Last name'
                                    className='inputprofile'
                                    value={last_name}
                                    onChange={handlelast_NameChange}
                                    onClick={(e) => e.stopPropagation()}
                                />

                            </div>
                        )}
                    </div>
                    
 {/* ---------------------------------------------------Gender Dropdown ------------------------------------------------*/}

                    {/* Gender Dropdown */}
                    <div className="frame-parent1 gender-select">
                    <div className="dropdown-menu1" onClick={toggleGenderDropdown}>
                        <div className="name">Gender</div>
                        <div className='drop-cont'>   
                        { !isGenderDropdownOpen && <span>{gender}</span>}
                        <img className={`arrow-icon ${isGenderDropdownOpen ? 'rotate-arrow' : ''}`}
                            src="./scanimg/dropdown-arrow.svg"
                            alt="arrow" />
                        </div>
                    </div>
                    {isGenderDropdownOpen && (
                        <div className="gender-dropdown-wrapper settings">
                        {/* Pass the selectedGender and onGenderChange props */}
                        <GenderDropdown selectedGender={gender} onGenderChange={setGender} />
                        </div>
                    )}
                    </div>


                     {/* ---------------------------------------------------age Dropdown ------------------------------------------------*/}

                    <div className="frame-parent1 age-select">
                        <div className="dropdown-menu1" onClick={toggleAgeDropdown}>
                            <div className="name">Age</div>
                            <div className='drop-cont'> 
                            { !isAgeDropdownOpen && <span>{age}</span>}
                            <img className={`arrow-icon ${isAgeDropdownOpen ? 'rotate-arrow' : ''}`}
                                 src="./scanimg/dropdown-arrow.svg"
                                 alt="arrow" />
                             </div>    
                        </div>
                        {isAgeDropdownOpen && (
                            <div className="dropdown-content">
                                <AgeRangeSlider min={0} max={100} value={age} onChange={setAge} />
                            </div>
                        )}
                    </div>

                    {/* Height Dropdown */}
                    <div className="frame-parent1 height-select">
                        <div className="dropdown-menu1" onClick={toggleHeightDropdown}>
                            <div className="name">Height</div>
                            <div className='drop-cont'> 
                            { !isHeightDropdownOpen && <span>{height}</span>}
                            <img className={`arrow-icon ${isHeightDropdownOpen ? 'rotate-arrow' : ''}`}
                                 src="./scanimg/dropdown-arrow.svg"
                                 alt="arrow" />
                            </div>     
                        </div>
                        {isHeightDropdownOpen && (
                            <div className="dropdown-content">
                                 <input
                                    type="number"
                                    step="0.1"  // Allows decimal values
                                    value={height}
                                    onChange={(e) => setHeight(parseFloat(e.target.value) || '')}
                                    onClick={(e) => e.stopPropagation()}
                                 />
                            </div>
                        )}
                    </div>

                    {/* Weight Dropdown */}
                    <div className="frame-parent1 weight-select">
                        <div className="dropdown-menu1" onClick={toggleWeightDropdown}>
                            <div className="name">Weight</div>
                            <div className='drop-cont'> 
                            { !isWeightDropdownOpen && <span>{weight}</span>}
                            <img className={`arrow-icon ${isWeightDropdownOpen ? 'rotate-arrow' : ''}`}
                                 src="./scanimg/dropdown-arrow.svg"
                                 alt="arrow" />
                            </div>     
                        </div>
                        {isWeightDropdownOpen && (
                            <div className="dropdown-content">
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    step="0.1"
                                    value={weight}
                                    onChange={handleWeightChange}
                                />
                                <div className="weight-display">
                                    <span>{`${weight} kg`}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="submit-button">
                <button onClick={handleProfileSubmit}>Update Profile</button>
            </div>
        </div>
    );
};

export default EditProfile;
