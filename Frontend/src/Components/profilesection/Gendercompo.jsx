import React from 'react';
import '../css/gendercompo.css'; // Import your CSS for styling


const GenderDropdown = ({ selectedGender, onGenderChange }) => {
  const { user, updateBasicDetails ,updateAuthenticationStatus} = useUser();
  const genders = [
    { id: 'Male', img: './scanimg/recommendations/gender-men.png', alt: 'Male' },
    { id: 'Female', img: './scanimg/recommendations/gender-female.jpg', alt: 'Female' },
  ];

  const handleSlideClick = (index) => {
    onGenderChange(genders[index].id); // Update the gender state in the parent component
  };

  const getGenderText = (gender) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  return (
    <div>
      <div className="gender-slider">
        {genders.map((gender, index) => (
          <div
            key={gender.id}
            className={`slide ${gender.id === selectedGender ? 'active' : ''}`}
            onClick={() => handleSlideClick(index)}
          >
            <img src={gender.img} alt={gender.alt} />
          </div>
        ))}
      </div>

      <div className="gender-info">
        <p>Selected Gender: <span>{getGenderText(selectedGender)}</span></p>
      </div>
    </div>
  );
};

export default GenderDropdown;
