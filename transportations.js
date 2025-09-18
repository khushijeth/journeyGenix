// Transport booking functionality
function bookTransport(type) {
    const transportTypes = {
        cab: {
            name: 'Private Cab',
            rate: '₹12-15 per km',
            features: ['AC vehicle', 'Professional driver', 'Insured']
        },
        shared: {
            name: 'Shared Vehicle',
            rate: '₹5-8 per km',
            features: ['Economical', 'Scheduled service', 'Multiple stops']
        },
        bike: {
            name: 'Two-Wheeler Rental',
            rate: '₹300-800 per day',
            features: ['Fuel efficient', 'Self-drive', 'Hourly/Daily rental']
        },
        bus: {
            name: 'Tourist Bus',
            rate: '₹500-1200 per person',
            features: ['Guide included', 'AC bus', 'Group tour']
        }
    };

    const transport = transportTypes[type];
    if (transport) {
        alert(`🚗 ${transport.name} Booking\n\nRate: ${transport.rate}\n\nFeatures:\n${transport.features.join('\n')}\n\nTo complete your booking, please call:\n📞 +91 9876543210\n\nOr fill out the journey planner form below for a custom quote.`);
    }
}

// Journey calculation functionality
function calculateJourney() {
    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;
    const travelDate = document.getElementById('journey-date').value;
    const returnDate = document.getElementById('return-date').value;

    if (!pickup || !destination || !travelDate) {
        alert('⚠ Please fill in pickup location, destination, and travel date.');
        return;
    }

    let journeySummary = `📍 Pickup: ${pickup}\n🏁 Destination: ${destination}\n📅 Travel Date: ${travelDate}`;
    if (returnDate) {
        journeySummary += `\n🔁 Return Date: ${returnDate}`;
    }

    alert(`✅ Journey Details Confirmed!\n\n${journeySummary}\n\nNow select a transport option below to proceed.`);
}