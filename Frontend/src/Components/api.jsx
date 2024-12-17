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

// Helper function to refresh the session 
async function refreshSession() {
    try {
        // Send request to refresh the session
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/session/refresh/`, {
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



