// File: /app/api/search-flights/route.js
import { getAmadeusToken } from '../token-amadeus';
import amadeus from '../../../utils/amadeus';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate'); // For roundtrip
    const accessToken = await getAmadeusToken();
    try {
        const params = {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate,
            adults: 1, // Customize as needed
        };

        // Add returnDate if trip type is roundtrip
        if (returnDate) {
            params.returnDate = returnDate;
        }
        const response = await amadeus.shopping.flightOffersSearch.get(params, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('Flight Search Result:', response.result.data);

        // Return the flight data as a JSON response
        return new Response(JSON.stringify(response.result.data), { status: 200 });
    } catch (error) {
        console.error('Error fetching flights:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
