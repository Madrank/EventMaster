import React from 'react';
import { ArrowRight, Star, Calendar, Users, MapPin, CreditCard } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export function HomePage({ onGetStarted }: HomePageProps) {
  const features = [
    {
      icon: Calendar,
      title: 'Planification Simple',
      description: 'Organisez votre événement en quelques clics avec notre interface intuitive'
    },
    {
      icon: Users,
      title: 'Professionnels Certifiés',
      description: 'Accédez à notre réseau de prestataires vérifiés et qualifiés'
    },
    {
      icon: MapPin,
      title: 'Logements à Proximité',
      description: 'Trouvez facilement des hébergements pour vos invités'
    },
    {
      icon: CreditCard,
      title: 'Cagnotte Collaborative',
      description: 'Permettez à vos proches de contribuer financièrement'
    }
  ];

  const testimonials = [
    {
      name: 'Marie & Pierre',
      event: 'Mariage',
      text: 'EventMagic a rendu notre mariage parfait ! Tout était organisé à la perfection.',
      rating: 5
    },
    {
      name: 'Sophie',
      event: 'Anniversaire 30 ans',
      text: 'Une plateforme fantastique qui m\'a fait gagner un temps précieux.',
      rating: 5
    },
    {
      name: 'Thomas',
      event: 'Baptême',
      text: 'Service client exceptionnel et prestataires de qualité.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Créez des Moments
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600">
              {' '}Inoubliables
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            La plateforme complète pour organiser vos événements de rêve. 
            Mariages, anniversaires, baptêmes - nous vous accompagnons à chaque étape.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-600 text-white text-lg font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Commencer mon événement
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir EventMagic ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous simplifions l'organisation de vos événements avec des outils innovants
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-pink-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils Nous Font Confiance
            </h2>
            <p className="text-xl text-gray-600">
              Plus de 10,000 événements organisés avec succès
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Créer Votre Événement de Rêve ?
          </h2>
          <p className="text-xl text-pink-100 mb-10 leading-relaxed">
            Rejoignez des milliers de personnes qui ont fait confiance à EventMagic
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-10 py-5 bg-white text-pink-600 text-lg font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Commencer Gratuitement
            <ArrowRight className="ml-3 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}