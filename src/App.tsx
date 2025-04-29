import React from 'react';
import { FormProvider, useFormContext } from './context/FormContext';
import Login from './pages/Login';
import DynamicForm from './pages/DynamicForm';

const AppContent: React.FC = () => {
  const { user, form } = useFormContext();

  // If user is not logged in, show login page
  if (!user) {
    return <Login />;
  }

  // If user is logged in but form is not fetched yet, show loading
  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading form structure...</p>
        </div>
      </div>
    );
  }

  // If user is logged in and form is fetched, show the dynamic form
  return <DynamicForm />;
};

function App() {
  return (
    <FormProvider>
      <div className="font-sans">
        <AppContent />
      </div>
    </FormProvider>
  );
}

export default App;