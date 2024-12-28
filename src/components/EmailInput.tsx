import React from 'react';
import { useEmailStore } from '../store/emailStore';

export const EmailInput: React.FC = () => {
  const { email, setEmail } = useEmailStore();

  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-safeia-gray mb-1">
        Correo Electrónico
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ejemplo@correo.com"
        className="w-full px-3 py-2 border border-safeia-gray rounded-md 
                 focus:ring-safeia-yellow focus:border-safeia-yellow"
        required
      />
    </div>
  );
};