import React, { useState } from 'react';
import '../css/medicalcondition.css';

// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {useUser } from '../Usercontext';





const MedicalCondition= () => {
    const { user, updateBasicDetails } = useUser();

    const [medicalConditions, setMedicalConditions] = useState(user?.medical_conditions || '');
    const [allergies, setAllergies] = useState(user?.allergies || '');
    // Handle form submission for medical conditions
    const handleFormSubmit = async () => {
        const medicalData = {
            medical_conditions: medicalConditions,
            allergies: allergies,
        };

        
      

        try {
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/medical/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',   // Ensures the backend knows you're sending JSON data
                },
                credentials: 'include',   // Sends cookies (if any) with the request to maintain the session
                body: JSON.stringify(medicalData),   // Converts your data object to JSON format
            });

            if (response.ok) {
                alert('Medical data updated successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Update failed'}`);
            }
        } catch (error) {
            alert('Failed to update medical data. Please try again later.');
            console.error('Error updating medical data:', error);
        }
    };

    const navigate=useNavigate();
    const onBackContainerClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="medical-condition-form">
            <div className='back-edit' onClick={onBackContainerClick}>
                <img className='backChild' alt="" src="./scanimg/Arrow-black.svg" />
                <div className="profileSetting">Edit Medical Details
                </div>
            </div>
            
            <div className="form-field">
                <label htmlFor="medicalConditions">Medical Conditions</label>
                <textarea
                    id="medicalConditions"
                    value={medicalConditions}
                    onChange={(e) => setMedicalConditions(e.target.value)}
                    placeholder="Enter medical conditions separated by commas"
                />
            </div>
            <div className="form-field">
                <label htmlFor="allergies">Allergies</label>
                <textarea
                    id="allergies"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="Enter allergies separated by commas"
                />
            </div>
            <div className="submit-button">
                <button onClick={handleFormSubmit}>Save Medical Information</button>
            </div>
        </div>
    );
};

export default MedicalCondition;
