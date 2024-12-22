// In your airports-helper.js or a similar file
import { airports } from '../app/data/airports';

export function getAirportByIATA(iataCode) {
    const airport = airports.find(airport => airport.iata_code === iataCode);
    // Return airport name or city if found, otherwise return a fallback message
    return airport ? `${airport.name}, ${airport.city}` : 'Unknown Airport';
}


export function calculateTotalDuration(segments) {
    let totalMinutes = 0;

    segments.forEach((segment) => {
        const durationMatch = segment.duration.match(/PT(\d+)H(\d+)M/);
        if (durationMatch) {
            const hours = parseInt(durationMatch[1]);
            const minutes = parseInt(durationMatch[2]);
            totalMinutes += hours * 60 + minutes;
        }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
}


export const getFlightNames = (offer) => {
    return offer.itineraries.map((itinerary) => {
        // Map over the segments in each itinerary to get the carrierCode and flight number
        return itinerary.segments.map((segment) => {
            return `${segment.carrierCode} ${segment.number}`;
        });
    }).flat(); // Flatten the array to get a single list of flight names
};
