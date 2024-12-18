import { getAmadeusToken } from '../../../utils/amadeus-token';
import amadeus from '../../../utils/amadeus';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate'); // For roundtrip

    // Validate inputs
    // const iataCodeRegex = /^[A-Z]{3}$/; // Regex for 3-letter IATA codes
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
        const params = {
            originLocationCode: 'SYD',
            destinationLocationCode: 'BKK',
            departureDate: '2024-12-20',
            adults: '2'
        };

        // Add returnDate if roundtrip
        // if (returnDate) {
        //     params.returnDate = returnDate;
        // }

        const response = await amadeus.shopping.flightOffersSearch.get(params, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Return flight data
        return new Response(JSON.stringify(response.result.data), { status: 200 });
    } catch (error) {
        console.error('Error fetching flights:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}


