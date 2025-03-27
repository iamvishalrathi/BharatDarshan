import { HeritageLocation } from "@/types/heritage";

export const heritageLocations: HeritageLocation[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal.",
    location: {
      lat: 27.1751,
      lng: 78.0421
    },
    imageUrl: "/images/heritage/taj-mahal.jpg",
    category: "Monument",
    state: "Uttar Pradesh",
    yearBuilt: "1632-1653",
    unesco: true,
    visitingHours: "Sunrise to Sunset (Closed on Fridays)",
    entryFee: "₹45 for Indian citizens, ₹1100 for foreigners",
    website: "https://www.tajmahal.gov.in/"
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar",
    description: "The Qutub Minar is a minaret and victory tower that forms part of the Qutub complex, which lies at the site of Delhi's oldest fortified city, Lal Kot, founded by the Tomar Rajputs.",
    location: {
      lat: 28.5245,
      lng: 77.1855
    },
    imageUrl: "/images/heritage/qutub-minar.jpg",
    category: "Monument",
    state: "Delhi",
    yearBuilt: "1192-1220",
    unesco: true,
    visitingHours: "7:00 AM to 5:00 PM",
    entryFee: "₹35 for Indian citizens, ₹550 for foreigners"
  },
  {
    id: "golden-temple",
    name: "Golden Temple",
    description: "The Golden Temple, also known as Harmandir Sahib, is a gurdwara located in the city of Amritsar, Punjab, India. It is the preeminent spiritual site of Sikhism.",
    location: {
      lat: 31.6200,
      lng: 74.8765
    },
    imageUrl: "/images/heritage/golden-temple.jpg",
    category: "Religious",
    state: "Punjab",
    yearBuilt: "1604",
    visitingHours: "Open 24 hours",
    entryFee: "Free"
  },
  {
    id: "hampi",
    name: "Hampi",
    description: "Hampi is an ancient village in the south Indian state of Karnataka. It's dotted with numerous ruined temple complexes from the Vijayanagara Empire.",
    location: {
      lat: 15.3350,
      lng: 76.4600
    },
    imageUrl: "/images/heritage/hampi.jpg",
    category: "Archaeological Site",
    state: "Karnataka",
    yearBuilt: "14th century",
    unesco: true,
    visitingHours: "Sunrise to Sunset",
    entryFee: "₹30 for Indian citizens, ₹500 for foreigners"
  },
  {
    id: "khajuraho",
    name: "Khajuraho Group of Monuments",
    description: "The Khajuraho Group of Monuments are a group of Hindu and Jain temples in Madhya Pradesh, India, famous for their nagara-style architectural symbolism and erotic sculptures.",
    location: {
      lat: 24.8318,
      lng: 79.9199
    },
    imageUrl: "/images/heritage/khajuraho.jpg",
    category: "Temple",
    state: "Madhya Pradesh",
    yearBuilt: "950-1050 CE",
    unesco: true,
    visitingHours: "8:00 AM to 6:00 PM",
    entryFee: "₹40 for Indian citizens, ₹600 for foreigners"
  },
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    description: "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in Aurangabad district of Maharashtra state.",
    location: {
      lat: 20.5519,
      lng: 75.7033
    },
    imageUrl: "/images/heritage/ajanta-caves.jpg",
    category: "Cave",
    state: "Maharashtra",
    yearBuilt: "2nd century BCE to 480 CE",
    unesco: true,
    visitingHours: "9:00 AM to 5:30 PM (Closed on Mondays)",
    entryFee: "₹40 for Indian citizens, ₹600 for foreigners"
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    description: "The Mysore Palace is a historical palace and the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore, located in Mysore, Karnataka, India.",
    location: {
      lat: 12.3052,
      lng: 76.6552
    },
    imageUrl: "/images/heritage/mysore-palace.jpg",
    category: "Palace",
    state: "Karnataka",
    yearBuilt: "1897-1912",
    visitingHours: "10:00 AM to 5:30 PM",
    entryFee: "₹70 for Indian citizens, ₹200 for foreigners"
  },
  {
    id: "hawa-mahal",
    name: "Hawa Mahal",
    description: "Hawa Mahal is a palace in Jaipur, India, built from red and pink sandstone. It was constructed in 1799 by Maharaja Sawai Pratap Singh, and designed by Lal Chand Ustad.",
    location: {
      lat: 26.9239,
      lng: 75.8267
    },
    imageUrl: "/images/heritage/hawa-mahal.jpg",
    category: "Palace",
    state: "Rajasthan",
    yearBuilt: "1799",
    visitingHours: "9:00 AM to 4:30 PM",
    entryFee: "₹50 for Indian citizens, ₹200 for foreigners"
  }
];