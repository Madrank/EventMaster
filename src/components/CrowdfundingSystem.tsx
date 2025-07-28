import React, { useState } from 'react';
import { PiggyBank, Users, Euro, Target, TrendingUp, Gift, Heart, CreditCard } from 'lucide-react';

interface Contribution {
  id: string;
  name: string;
  amount: number;
  message?: string;
  date: string;
  anonymous: boolean;
}

export function CrowdfundingSystem() {
  const [contributions, setContributions] = useState<Contribution[]>([
    {
      id: '1',
      name: 'Marie & Pierre',
      amount: 150,
      message: 'Félicitations pour votre mariage ! Nous sommes désolés de ne pas pouvoir être présents.',
      date: '2024-03-15',
      anonymous: false
    },
    {
      id: '2',
      name: 'Sophie',
      amount: 100,
      message: 'Avec tout notre amour',
      date: '2024-03-16',
      anonymous: false
    },
    {
      id: '3',
      name: 'Contributeur anonyme',
      amount: 75,
      date: '2024-03-17',
      anonymous: true
    }
  ]);

  const [newContribution, setNewContribution] = useState({
    name: '',
    amount: '',
    message: '',
    anonymous: false
  });

  const [showContributeForm, setShowContributeForm] = useState(false);

  const targetAmount = 2000;
  const currentAmount = contributions.reduce((sum, contrib) => sum + contrib.amount, 0);
  const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100);

  const addContribution = () => {
    if (newContribution.amount && parseFloat(newContribution.amount) > 0) {
      const contribution: Contribution = {
        id: Date.now().toString(),
        name: newContribution.anonymous ? 'Contributeur anonyme' : newContribution.name || 'Anonyme',
        amount: parseFloat(newContribution.amount),
        message: newContribution.message,
        date: new Date().toISOString().split('T')[0],
        anonymous: newContribution.anonymous
      };
      setContributions([contribution, ...contributions]);
      setNewContribution({ name: '', amount: '', message: '', anonymous: false });
      setShowContributeForm(false);
    }
  };

  const suggestedAmounts = [25, 50, 100, 150, 200];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cagnotte Collaborative
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Permettez à vos proches qui ne peuvent pas assister à votre événement 
            de contribuer et de partager ce moment spécial avec vous
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full mb-4">
              <PiggyBank className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Objectif de la Cagnotte</h2>
            <p className="text-gray-600">Aidez-nous à rendre cet événement encore plus spécial</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progression</span>
              <span className="text-sm font-medium text-gray-900">
                {currentAmount}€ / {targetAmount}€
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-pink-500 to-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-center mt-2">
              <span className="text-2xl font-bold text-gray-900">{Math.round(progressPercentage)}%</span>
              <span className="text-gray-600 ml-1">atteint</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                <Euro className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{currentAmount}€</div>
              <div className="text-gray-600">Collecté</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{contributions.length}</div>
              <div className="text-gray-600">Contributeurs</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {contributions.length > 0 ? Math.round(currentAmount / contributions.length) : 0}€
              </div>
              <div className="text-gray-600">Moyenne</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowContributeForm(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-600 text-white text-lg font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Heart className="h-5 w-5 mr-2" />
              Contribuer à la Cagnotte
            </button>
          </div>
        </div>

        {/* Contribution Form */}
        {showContributeForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Faire une Contribution
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre nom (optionnel)
                  </label>
                  <input
                    type="text"
                    value={newContribution.name}
                    onChange={(e) => setNewContribution({ ...newContribution, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Entrez votre nom"
                    disabled={newContribution.anonymous}
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newContribution.anonymous}
                      onChange={(e) => setNewContribution({ ...newContribution, anonymous: e.target.checked })}
                      className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Contribution anonyme</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant *
                  </label>
                  <div className="flex gap-2 mb-3">
                    {suggestedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setNewContribution({ ...newContribution, amount: amount.toString() })}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          newContribution.amount === amount.toString()
                            ? 'bg-pink-500 text-white border-pink-500'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-pink-500'
                        }`}
                      >
                        {amount}€
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={newContribution.amount}
                    onChange={(e) => setNewContribution({ ...newContribution, amount: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Montant personnalisé"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (optionnel)
                  </label>
                  <textarea
                    value={newContribution.message}
                    onChange={(e) => setNewContribution({ ...newContribution, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Laissez un message d'encouragement..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={addContribution}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Contribuer
                </button>
                <button
                  onClick={() => setShowContributeForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Contributions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Contributions Récentes</h3>
            <div className="flex items-center text-pink-500">
              <Gift className="h-5 w-5 mr-2" />
              <span className="font-medium">{contributions.length} contributions</span>
            </div>
          </div>

          <div className="space-y-4">
            {contributions.map((contribution) => (
              <div
                key={contribution.id}
                className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 border-l-4 border-pink-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{contribution.name}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(contribution.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pink-600">
                      {contribution.amount}€
                    </div>
                  </div>
                </div>
                {contribution.message && (
                  <p className="text-gray-700 italic border-l-2 border-pink-200 pl-4">
                    "{contribution.message}"
                  </p>
                )}
              </div>
            ))}
          </div>

          {contributions.length === 0 && (
            <div className="text-center py-12">
              <PiggyBank className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Aucune contribution pour le moment</h4>
              <p className="text-gray-600">Soyez le premier à contribuer à cette cagnotte !</p>
            </div>
          )}
        </div>

        {/* Usage Information */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="text-center">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">À quoi servira cette cagnotte ?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">40%</div>
                <div className="text-blue-100">Décoration & Fleurs</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">35%</div>
                <div className="text-blue-100">Photographe</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">25%</div>
                <div className="text-blue-100">Voyage de noces</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}