import amadeus from '../../../utils/amadeus';

export const getAmadeusToken = async () => {
    try {
        const response = await amadeus.auth.accessToken;
        const { access_token, expires_in } = response;

        console.log('Access token retrieved:', access_token);

        return access_token;  // You can return this token to use in further API requests
    } catch (error) {
        // Log the complete error for better understanding
        console.error('Error retrieving Amadeus token:', error.response || error.message || error);
        throw new Error('Authentication failed');
    }
};
