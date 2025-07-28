import React, { useState } from 'react';
import { MapPin, Star, Wifi, Car, Coffee, Waves, Euro, Users } from 'lucide-react';

interface Accommodation {
  id: string;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  images: string[];
  amenities: string[];
  capacity: number;
  description: string;
}

export function AccommodationSearch() {
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 300]);

  const accommodationTypes = [
    { id: 'all', name: 'Tous' },
    { id: 'hotel', name: 'Hôtels' },
    { id: 'bnb', name: 'Chambres d\'hôtes' },
    { id: 'apartment', name: 'Appartements' },
    { id: 'villa', name: 'Villas' }
  ];

  const accommodations: Accommodation[] = [
    {
      id: '1',
      name: 'Hôtel des Jardins',
      type: 'hotel',
      rating: 4.5,
      reviews: 234,
      price: 120,
      distance: '500m du lieu',
      images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'],
      amenities: ['wifi', 'parking', 'restaurant', 'spa'],
      capacity: 2,
      description: 'Hôtel de charme au cœur de la ville avec vue sur les jardins'
    },
    {
      id: '2',
      name: 'Villa Bella Vista',
      type: 'villa',
      rating: 4.8,
      reviews: 89,
      price: 250,
      distance: '1.2km du lieu',
      images: ['https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg'],
      amenities: ['wifi', 'parking', 'pool', 'garden'],
      capacity: 8,
      description: 'Villa spacieuse avec piscine privée et jardin méditerranéen'
    },
    {
      id: '3',
      name: 'Appartement Centre Ville',
      type: 'apartment',
      rating: 4.3,
      reviews: 156,
      price: 85,
      distance: '800m du lieu',
      images: ['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'],
      amenities: ['wifi', 'kitchen', 'balcony'],
      capacity: 4,
      description: 'Appartement moderne en centre-ville avec toutes commodités'
    },
    {
      id: '4',
      name: 'Maison d\'hôtes Les Roses',
      type: 'bnb',
      rating: 4.7,
      reviews: 67,
      price: 95,
      distance: '600m du lieu',
      images: ['https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg'],
      amenities: ['wifi', 'breakfast', 'garden', 'parking'],
      capacity: 2,
      description: 'Charmante maison d\'hôtes avec petit-déjeuner inclus'
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'restaurant':
      case 'breakfast':
      case 'kitchen':
        return <Coffee className="h-4 w-4" />;
      case 'pool':
        return <Waves className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const getAmenityLabel = (amenity: string) => {
    const labels: { [key: string]: string } = {
      wifi: 'WiFi',
      parking: 'Parking',
      restaurant: 'Restaurant',
      breakfast: 'Petit-déjeuner',
      kitchen: 'Cuisine',
      pool: 'Piscine',
      spa: 'Spa',
      garden: 'Jardin',
      balcony: 'Balcon'
    };
    return labels[amenity] || amenity;
  };

  const filteredAccommodations = accommodations.filter(acc => {
    const typeMatch = selectedType === 'all' || acc.type === selectedType;
    const priceMatch = acc.price >= priceRange[0] && acc.price <= priceRange[1];
    return typeMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hébergements à Proximité
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez le logement parfait pour vos invités près de votre lieu d'événement
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Type Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Type d'hébergement</h3>
              <div className="flex flex-wrap gap-2">
                {accommodationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedType === type.id
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Budget par nuit: {priceRange[0]}€ - {priceRange[1]}€
              </h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0€</span>
                  <span>500€</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={accommodation.images[0]}
                  alt={accommodation.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{accommodation.rating}</span>
                </div>
                <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {accommodation.type === 'hotel' && 'Hôtel'}
                  {accommodation.type === 'villa' && 'Villa'}
                  {accommodation.type === 'apartment' && 'Appartement'}
                  {accommodation.type === 'bnb' && 'B&B'}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {accommodation.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{accommodation.distance}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {accommodation.description}
                </p>

                <div className="flex items-center mb-4">
                  <Users className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    Jusqu'à {accommodation.capacity} personnes
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{getAmenityLabel(amenity)}</span>
                    </div>
                  ))}
                  {accommodation.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{accommodation.amenities.length - 3} autres
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Euro className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">
                      {accommodation.price}
                    </span>
                    <span className="text-gray-500 ml-1">/nuit</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {accommodation.reviews} avis
                  </div>
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                  Réserver Maintenant
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Récapitulatif des Hébergements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-pink-500 mb-2">
                {filteredAccommodations.length}
              </div>
              <div className="text-gray-600">Hébergements disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {Math.round(filteredAccommodations.reduce((acc, curr) => acc + curr.price, 0) / filteredAccommodations.length)}€
              </div>
              <div className="text-gray-600">Prix moyen par nuit</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">
                {filteredAccommodations.reduce((acc, curr) => acc + curr.capacity, 0)}
              </div>
              <div className="text-gray-600">Capacité totale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}