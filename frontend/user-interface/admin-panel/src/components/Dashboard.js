import React from 'react';
import BusManagement from './BusManagement';
import TicketManagement from './TicketManagement';
import RouteAnalysis from './RouteAnalysis';

function Dashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <BusManagement />
      <TicketManagement />
      <RouteAnalysis />
    </div>
  );
}

export default Dashboard;
