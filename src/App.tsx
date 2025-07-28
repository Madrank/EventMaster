import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { EventSelection } from './components/EventSelection';
import { ProfessionalsList } from './components/ProfessionalsList';
import { InvitationManager } from './components/InvitationManager';
import { AccommodationSearch } from './components/AccommodationSearch';
import { CrowdfundingSystem } from './components/CrowdfundingSystem';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);

  const handleGetStarted = () => {
    setCurrentSection('events');
  };

  const handleEventSelect = (eventType: string) => {
    setSelectedEventType(eventType);
    setCurrentSection('professionals');
  };

  const handleProfessionalSelect = (professional: any) => {
    // Vous pouvez stocker les informations du professionnel sélectionné
    console.log('Professionnel sélectionné:', professional);
    setCurrentSection('invitations');
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onGetStarted={handleGetStarted} />;
      case 'events':
        return <EventSelection onEventSelect={handleEventSelect} />;
      case 'professionals':
        return (
          <ProfessionalsList
            eventType={selectedEventType || 'événement'}
            onProfessionalSelect={handleProfessionalSelect}
          />
        );
      case 'invitations':
        return <InvitationManager />;
      case 'accommodations':
        return <AccommodationSearch />;
      case 'crowdfunding':
        return <CrowdfundingSystem />;
      default:
        return <HomePage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentSection={currentSection} onSectionChange={setCurrentSection} />
      {renderCurrentSection()}
    </div>
  );
}

export default App;