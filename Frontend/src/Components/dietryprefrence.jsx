import React, { useState } from 'react';
import './dietryprefrences.css';
import { useUser } from './Usercontext'; 

const DietaryPreferences = () => {
    const [dietaryPreferences, setDietaryPreferences] = useState('');
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [hasDietaryRestrictions, setHasDietaryRestrictions] = useState(false);
    const { user, updateAuthenticationStatus } = useUser();

    // Handle form submission for dietary preferences
    const handleFormSubmit = async () => {
        const dietaryData = {
            dietary_preferences: dietaryPreferences,
            is_vegetarian: isVegetarian,
            is_vegan: isVegan,
            has_dietary_restrictions: hasDietaryRestrictions,
        };

        try {
            const response = await fetch('http://localhost:8000/profile/preferences/', {
                method: 'POST',
                credentials: 'include', 
                body: JSON.stringify(dietaryData),
            });

            if (response.ok) {
                updateAuthenticationStatus(true);
                alert('Dietary data updated successfully!');
            } else {
                const errorData = await response.json();
                
                alert(`Error: ${errorData.message || 'Update failed'}`);
            }
        } catch (error) {
            updateAuthenticationStatus(false);
            alert('Failed to update dietary data. Please try again later.');
            console.error('Error updating dietary data:', error);
        }
    };

    return (
        <div className="dietary-preferences-form">
            <h2>Dietary Preferences</h2>
            <div className="form-field">
                <label htmlFor="dietaryPreferences">Dietary Preferences</label>
                <textarea
                    id="dietaryPreferences"
                    value={dietaryPreferences}
                    onChange={(e) => setDietaryPreferences(e.target.value)}
                    placeholder="Enter dietary preferences separated by commas"
                />
            </div>
            <div className="form-field">
                <label>
                    <input
                        type="checkbox"
                        checked={isVegetarian}
                        onChange={() => setIsVegetarian(!isVegetarian)}
                    />
                    Vegetarian
                </label>
            </div>
            <div className="form-field">
                <label>
                    <input
                        type="checkbox"
                        checked={isVegan}
                        onChange={() => setIsVegan(!isVegan)}
                    />
                    Vegan
                </label>
            </div>
            <div className="form-field">
                <label>
                    <input
                        type="checkbox"
                        checked={hasDietaryRestrictions}
                        onChange={() => setHasDietaryRestrictions(!hasDietaryRestrictions)}
                    />
                    Has Dietary Restrictions
                </label>
            </div>
            <div className="submit-button">
                <button onClick={handleFormSubmit}>Save Dietary Information</button>
            </div>
        </div>
    );
};

export default DietaryPreferences;
