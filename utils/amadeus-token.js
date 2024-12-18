// import amadeus from "./amadeus";


// export const getAmadeusToken = async () => {
//     try {
//         const response = await amadeus.auth.accessToken;
//         const { access_token, expires_in } = response;

//         console.log('Access token retrieved:', access_token);

//         return access_token;  // You can return this token to use in further API requests
//     } catch (error) {
//         console.error('Error retrieving Amadeus token:', error.message);
//         throw new Error('Authentication failed');
//     }
// };


import axios from "axios";

export const getAmadeusToken = async () => {
    try {
        const clientId = "BFWkYRKoHLdc3dAeOdGvIaEOAzfPXOiW";
        const clientSecret = "6oP4nA3GGBUxN1ib";

        // Define the request payload
        const payload = new URLSearchParams();
        payload.append("grant_type", "client_credentials");
        payload.append("client_id", clientId);
        payload.append("client_secret", clientSecret);

        // Make the POST request to the Amadeus authentication endpoint
        const response = await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", payload, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const { access_token, expires_in } = response.data;

        console.log("Access token retrieved:", access_token);

        return access_token;
    } catch (error) {
        console.error("Error retrieving Amadeus token:", error.response?.data || error.message);
        throw new Error("Authentication failed");
    }
};
