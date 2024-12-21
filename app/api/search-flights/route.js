import axios from 'axios';
import { getAmadeusToken } from '../../../utils/amadeus-token';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate");
    const travelers = searchParams.get("travelers") || "1";
    const flightClass = searchParams.get("class");

   
    // const iataCodeRegex = /^[A-Z]{3}$/; 
    // if (!iataCodeRegex.test(origin) || !iataCodeRegex.test(destination)) {
    //     return new Response(
    //         JSON.stringify({
    //             error: 'Invalid IATA code. Both origin and destination must be 3-letter IATA codes.',
    //         }),
    //         { status: 400 }
    //     );
    // }

    try {
        const accessToken = await getAmadeusToken(); 

        const apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers`;

        const params = {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departureDate,
            adults: travelers,
            // travelClass:flightClass
        };

        // Add returnDate if roundtrip
        if (returnDate) {
            params.returnDate = returnDate;
        }
        console.log('Request Params:', params);

        // Make the API call
        const response = await axios.get(apiUrl, {
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Return flight data
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error fetching flights:', error);

        const statusCode = error.response?.status || 500;
        const message = error.response?.data || { error: error.message };

        return new Response(JSON.stringify(message), { status: statusCode });
    }
}
