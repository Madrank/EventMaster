import React, { useState } from 'react';
import { MapPin, Star, Clock, Euro, Phone, Mail, Calendar } from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  distance: string;
  availability: string[];
  phone: string;
  email: string;
  image: string;
  specialties: string[];
}

interface ProfessionalsListProps {
  eventType: string;
  onProfessionalSelect: (professional: Professional) => void;
}

export function ProfessionalsList({ eventType, onProfessionalSelect }: ProfessionalsListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'venue', name: 'Lieux de Réception' },
    { id: 'catering', name: 'Traiteurs' },
    { id: 'photography', name: 'Photographes' },
    { id: 'flowers', name: 'Fleuristes' },
    { id: 'music', name: 'Musiciens & DJ' },
    { id: 'decoration', name: 'Décorateurs' }
  ];

  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Château de Malmaison',
      category: 'venue',
      rating: 4.9,
      reviews: 127,
      price: '180-250€/personne',
      location: 'Rueil-Malmaison',
      distance: '15 km',
      availability: ['2024-06-15', '2024-07-20', '2024-09-10'],
      phone: '01 47 32 69 70',
      email: 'contact@chateau-malmaison.fr',
      image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
      specialties: ['Mariages', 'Réceptions', 'Séminaires']
    },
    {
      id: '2',
      name: 'Les Saveurs de Marie',
      category: 'catering',
      rating: 4.8,
      reviews: 89,
      price: '45-75€/personne',
      location: 'Boulogne-Billancourt',
      distance: '8 km',
      availability: ['2024-06-20', '2024-07-15', '2024-08-25'],
      phone: '01 46 03 21 87',
      email: 'marie@saveurs-marie.fr',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
      specialties: ['Cuisine française', 'Menu végétarien', 'Buffets']
    },
    {
      id: '3',
      name: 'Studio Lumière',
      category: 'photography',
      rating: 4.9,
      reviews: 156,
      price: '800-1500€/jour',
      location: 'Paris 16ème',
      distance: '12 km',
      availability: ['2024-06-08', '2024-07-12', '2024-09-20'],
      phone: '01 42 88 35 92',
      email: 'contact@studio-lumiere.fr',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
      specialties: ['Reportage mariage', 'Portrait', 'Événementiel']
    },
    {
      id: '4',
      name: 'Fleurs & Émotions',
      category: 'flowers',
      rating: 4.7,
      reviews: 94,
      price: '200-500€',
      location: 'Neuilly-sur-Seine',
      distance: '10 km',
      availability: ['2024-06-10', '2024-07-18', '2024-08-30'],
      phone: '01 47 47 89 23',
      email: 'info@fleurs-emotions.fr',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg',
      specialties: ['Bouquets mariée', 'Décoration florale', 'Centres de table']
    }
  ];

  const filteredProfessionals = selectedCategory === 'all' 
    ? professionals 
    : professionals.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professionnels pour votre {eventType}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de professionnels certifiés et trouvez les partenaires parfaits pour votre événement
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Professionals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfessionals.map((professional) => (
            <div
              key={professional.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{professional.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {professional.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{professional.location} • {professional.distance}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Euro className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{professional.price}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {professional.specialties.slice(0, 2).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-600 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-xs">{professional.availability.length} dates disponibles</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {professional.reviews} avis
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setSelectedProfessional(professional)}
                    className="w-full bg-gradient-to-r from-pink-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Voir les disponibilités
                  </button>
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Details Modal */}
        {selectedProfessional && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedProfessional.name}
                  </h2>
                  <button
                    onClick={() => setSelectedProfessional(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-pink-500" />
                    Dates Disponibles
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProfessional.availability.map((date, index) => (
                      <button
                        key={index}
                        className="p-3 border border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors text-center"
                      >
                        <div className="text-sm text-gray-600">
                          {new Date(date).toLocaleDateString('fr-FR', { 
                            day: 'numeric', 
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => onProfessionalSelect(selectedProfessional)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Réserver ce Professionnel
                  </button>
                  <button
                    onClick={() => setSelectedProfessional(null)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}