import React from 'react';
import BusManagement from './BusManagement';
import TicketManagement from './TicketManagement';
import RouteAnalysis from './RouteAnalysis';
import RealTimeUpdates from './RealTimeUpdates';

function Dashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <BusManagement />
      <TicketManagement />
      <RouteAnalysis />
      <RealTimeUpdates />
    </div>
  );
}

export default Dashboard;
