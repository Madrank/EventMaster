import React from 'react';
import { Calendar, Heart, Users, MapPin } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function Header({ currentSection, onSectionChange }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Heart },
    { id: 'events', label: 'Événements', icon: Calendar },
    { id: 'professionals', label: 'Professionnels', icon: Users },
    { id: 'invitations', label: 'Invitations', icon: Users },
    { id: 'accommodations', label: 'Hébergements', icon: MapPin }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <h1 className="text-2xl font-bold text-gray-800">EventMagic</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  currentSection === id
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-pink-600">
              <Users className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}