import { getAmadeusToken } from '../../../utils/amadeus-token';
import amadeus from '../../../utils/amadeus';

export async function GET(request) {
    const accessToken = await getAmadeusToken();

    // Define pagination parameters
    const limit = 100;  // Number of items per page
    const offset = 0;   // Starting point for the page (for pagination)

    // try {
    // Make the request to the Amadeus API to fetch airports
    const response = await amadeus.referenceData.locations.get({
        subType: 'AIRPORT',  // Only fetch airports
        'page[limit]': limit,  // Limit number of results per page
        'page[offset]': offset,  // Offset to specify the page number
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,  // Use the access token for authentication
        },
    });

    // Return the airports data
    return new Response(JSON.stringify(response.result.data), { status: 200 });
    // } catch (error) {
    //     console.error('Error fetching airports:', error);
    //     return new Response(
    //         JSON.stringify({
    //             error: error.message || 'An error occurred while fetching airports.',
    //         }),
    //         { status: 500 }
    //     );
    // }
}
