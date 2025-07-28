import React, { useState } from 'react';
import { Heart, Cake, Baby, PartyPopper, Calendar, Users } from 'lucide-react';

interface EventSelectionProps {
  onEventSelect: (eventType: string) => void;
}

export function EventSelection({ onEventSelect }: EventSelectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const eventTypes = [
    {
      id: 'wedding',
      name: 'Mariage',
      icon: Heart,
      description: 'Célébrez votre union avec élégance',
      color: 'from-pink-400 to-red-400',
      guests: '50-300 invités'
    },
    {
      id: 'birthday',
      name: 'Anniversaire',
      icon: Cake,
      description: 'Fêtez un anniversaire inoubliable',
      color: 'from-yellow-400 to-orange-400',
      guests: '20-150 invités'
    },
    {
      id: 'baptism',
      name: 'Baptême',
      icon: Baby,
      description: 'Accueillez votre petit ange',
      color: 'from-blue-400 to-cyan-400',
      guests: '30-100 invités'
    },
    {
      id: 'party',
      name: 'Fête',
      icon: PartyPopper,
      description: 'Organisez une soirée mémorable',
      color: 'from-purple-400 to-pink-400',
      guests: '25-200 invités'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Quel Type d'Événement
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600">
              {' '}Organisez-Vous ?
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choisissez le type d'événement que vous souhaitez organiser pour découvrir 
            nos professionnels spécialisés et nos services dédiés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {eventTypes.map((event) => (
            <div
              key={event.id}
              className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                selectedEvent === event.id ? 'ring-4 ring-pink-400' : ''
              }`}
              onClick={() => setSelectedEvent(event.id)}
            >
              <div className={`h-64 bg-gradient-to-br ${event.color} p-8 text-white relative`}>
                <div className="absolute top-6 right-6">
                  <event.icon className="h-12 w-12 opacity-80" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
                  <p className="text-white/90 mb-3">{event.description}</p>
                  <div className="flex items-center text-white/80">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.guests}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 max-w-2xl mx-auto">
              <Calendar className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Parfait ! Organisons votre {eventTypes.find(e => e.id === selectedEvent)?.name.toLowerCase()}
              </h3>
              <p className="text-gray-600 mb-6">
                Nous allons maintenant vous présenter nos professionnels spécialisés 
                et vous aider à planifier chaque détail de votre événement.
              </p>
              <button
                onClick={() => onEventSelect(selectedEvent)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-600 text-white text-lg font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Continuer vers les Professionnels
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}