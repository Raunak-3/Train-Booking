const fs = require('fs');

const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Jaipur", "Surat", "Pune",
    "Kanpur", "Lucknow", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Vadodara", "Ghaziabad", "Ludhiana",
    "Coimbatore", "Agra", "Meerut", "Jabalpur", "Srinagar", "Jodhpur", "Ranchi", "Chandigarh", "Bhubaneswar", "Vijayawada",
    "Mysore", "Nashik", "Bhilai", "Allahabad", "Rajkot", "Bhubaneswar", "Gurgaon", "Faridabad", "Dehradun", "Shimla",
    "Kullu", "Manali", "Haridwar", "Udaipur", "Pondicherry", "Nagapattinam", "Tiruchirapalli", "Tirunelveli", "Kanyakumari",
    "Mangalore", "Kasaragod", "Kannur", "Kottayam", "Kollam", "Palakkad", "Thrissur", "Ernakulam", "Kochi", "Trivandrum",
    "Nanded", "Aurangabad", "Gwalior", "Sagar", "Jabalpur", "Durg", "Bilaspur", "Raipur", "Korba", "Ambikapur",
    "Chhindwara", "Satna", "Rewa", "Katni", "Mandla", "Jabalpur", "Durgapur", "Raniganj", "Asansol", "Bardhaman"
];

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const trains = Array.from({ length: 100 }, (_, index) => {
    const source = cities[generateRandomNumber(0, cities.length - 1)];
    let destination;
    do {
        destination = cities[generateRandomNumber(0, cities.length - 1)];
    } while (destination === source); // Ensure source and destination are not the same

    const hours = generateRandomNumber(0, 23).toString().padStart(2, '0');
    const minutes = generateRandomNumber(0, 59).toString().padStart(2, '0');

    return {
        train_name: `Train ${index + 1}`,
        train_number: generateRandomNumber(10000, 99999),
        source,
        destination,
        seat_capacity: generateRandomNumber(50, 200),
        seats_booked: generateRandomNumber(0, 50),
        arrival_time_at_source: `2024-07-28T${hours}:${minutes}:00`,
        arrival_time_at_destination: `2024-07-28T${generateRandomNumber(0, 23).toString().padStart(2, '0')}:${generateRandomNumber(0, 59).toString().padStart(2, '0')}:00`
    };
});

fs.writeFileSync('trainData.json', JSON.stringify(trains, null, 2));
console.log('Train data generated and saved to trainData.json');
