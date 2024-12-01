// Function to fetch with cookies
export async function fetchWithAuth(url, options = {}) {
    try {
        // Send the request with cookies
        let response = await fetch(url, {
            ...options,
            credentials: 'include',  // This ensures cookies are included in the request
        });

        // If the response is a 401 Unauthorized, attempt to refresh the session
        if (response.status === 401) {
            // const sessionRefreshed = await refreshSession();
            if (sessionRefreshed) {
                // Retry the original request after refreshing the session
                response = await fetch(url, {
                    ...options,
                    credentials: 'include',
                });
            }
        }

        // If the response is still unauthorized after refreshing, throw an error
        if (response.status === 401) {
            throw new Error('Authorization failed. Please log in again.');
        }

        // If the response is OK, return the JSON data
        if (response.ok) {
            return await response.json();
        } else {
            // Handle other HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || 'Fetch request failed');
        }
    } catch (error) {
        console.error('Error in fetchWithAuth:', error);
        throw error;
    }
}

// Helper function to refresh the session (if supported by your backend)
async function refreshSession() {
    try {
        // Send request to refresh the session
        const response = await fetch('http://localhost:8000/api/session/refresh/', {
            method: 'POST',
            credentials: 'include',  // Include cookies for session refresh
        });

        // If session refresh is successful
        if (response.ok) {
            return true;
        } else {
            throw new Error('Failed to refresh session');
        }
    } catch (error) {
        console.error('Error refreshing session:', error);
        return false; // Return false if refresh fails
    }
}



// apiHelper.js
// export async function fetchWithAuth(url, options = {}) {
//     let token = localStorage.getItem('access_token');

//     // Set default headers
//     const headers = {
        
//         'Authorization': `Bearer ${token}`,
//         ...options.headers,  // Merge any additional headers provided
//     };

//     try {
//         // Attempt the fetch request
//         let response = await fetch(url, { ...options, headers });
//         console.log("hello")

//         // Check if the token has expired (usually a 401 Unauthorized)
//         if (response.status === 401) {
//             // Try to refresh the token
//             const newToken = await refreshToken();
//             if (newToken) {
//                 // Update the authorization header with the new token
//                 headers['Authorization'] = `Bearer ${newToken}`;

//                 // Retry the original request with the new token
//                 response = await fetch(url, { ...options, headers });
//             }
//         }

//         // If the response is still unauthorized, throw an error
//         if (response.status === 401) {
//             throw new Error('Authorization failed');
//         }

//         // If the response is OK, return the JSON data
//         if (response.ok) {
//             console.log(response.data);
//             return await response.json();
//         } else {
//             // Handle other HTTP errors
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'Fetch request failed');
//         }
//     } catch (error) {
//         console.error('Error in fetchWithAuth:', error);
//         throw error;
//     }
// }

// // Helper function to refresh the token
// async function refreshToken() {
//     try {
//         const refreshToken = localStorage.getItem('refresh_token');
//         if (!refreshToken) {
//             throw new Error('No refresh token available');
//         }

//         // Send request to refresh the access token
//         const response = await fetch('http://localhost:8000/api/token/refresh/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ refresh_token: refreshToken }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             const newAccessToken = data.access;
//             console.log("new tocken")
            
//             // Store the new access token
//             localStorage.setItem('access_token', newAccessToken);
//             console.log(newAccessToken)
            
//             return newAccessToken;
//         } else {
//             throw new Error('Failed to refresh token');
//         }
//     } catch (error) {
//         console.error('Error refreshing token:', error);
//         return null;
//     }
// }
