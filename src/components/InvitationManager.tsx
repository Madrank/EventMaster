import React, { useState } from 'react';
import { Plus, Send, Users, CheckCircle, XCircle, Clock, Mail } from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'pending' | 'accepted' | 'declined';
  lastSent?: string;
  responded?: string;
}

export function InvitationManager() {
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: '1',
      name: 'Marie Dupont',
      email: 'marie.dupont@email.com',
      phone: '06 12 34 56 78',
      status: 'accepted',
      lastSent: '2024-03-15',
      responded: '2024-03-16'
    },
    {
      id: '2',
      name: 'Pierre Martin',
      email: 'pierre.martin@email.com',
      status: 'pending',
      lastSent: '2024-03-15'
    },
    {
      id: '3',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@email.com',
      status: 'declined',
      lastSent: '2024-03-15',
      responded: '2024-03-17'
    }
  ]);

  const [newGuest, setNewGuest] = useState({ name: '', email: '', phone: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const addGuest = () => {
    if (newGuest.name && newGuest.email) {
      const guest: Guest = {
        id: Date.now().toString(),
        name: newGuest.name,
        email: newGuest.email,
        phone: newGuest.phone,
        status: 'pending'
      };
      setGuests([...guests, guest]);
      setNewGuest({ name: '', email: '', phone: '' });
      setShowAddForm(false);
    }
  };

  const sendInvitation = (guestId: string) => {
    setGuests(guests.map(guest => 
      guest.id === guestId 
        ? { ...guest, lastSent: new Date().toISOString().split('T')[0] }
        : guest
    ));
  };

  const sendReminder = (guestId: string) => {
    sendInvitation(guestId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'declined':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Confirmé';
      case 'declined':
        return 'Décliné';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const acceptedCount = guests.filter(g => g.status === 'accepted').length;
  const pendingCount = guests.filter(g => g.status === 'pending').length;
  const declinedCount = guests.filter(g => g.status === 'declined').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gestion des Invitations
          </h1>
          <p className="text-xl text-gray-600">
            Invitez vos proches et suivez leurs réponses en temps réel
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{guests.length}</div>
            <div className="text-gray-600">Total Invités</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{acceptedCount}</div>
            <div className="text-gray-600">Confirmés</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{pendingCount}</div>
            <div className="text-gray-600">En Attente</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{declinedCount}</div>
            <div className="text-gray-600">Déclinés</div>
          </div>
        </div>

        {/* Add Guest Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter un Invité
          </button>
        </div>

        {/* Add Guest Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Ajouter un nouvel invité</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nom complet"
                value={newGuest.name}
                onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email"
                value={newGuest.email}
                onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Téléphone (optionnel)"
                value={newGuest.phone}
                onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={addGuest}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Ajouter
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Guests List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Liste des Invités</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {guests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{guest.email}</div>
                      {guest.phone && (
                        <div className="text-sm text-gray-500">{guest.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(guest.status)}`}>
                        {getStatusIcon(guest.status)}
                        <span className="ml-1">{getStatusText(guest.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {guest.lastSent && (
                        <div>Invitation: {new Date(guest.lastSent).toLocaleDateString('fr-FR')}</div>
                      )}
                      {guest.responded && (
                        <div>Réponse: {new Date(guest.responded).toLocaleDateString('fr-FR')}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      {guest.status === 'pending' && (
                        <>
                          <button
                            onClick={() => sendInvitation(guest.id)}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Envoyer
                          </button>
                          {guest.lastSent && (
                            <button
                              onClick={() => sendReminder(guest.id)}
                              className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Relancer
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Actions Groupées</h3>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Send className="h-4 w-4 mr-2" />
              Envoyer à tous les invités
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
              <Mail className="h-4 w-4 mr-2" />
              Relancer les invités en attente
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Users className="h-4 w-4 mr-2" />
              Exporter la liste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}