import React from 'react';
import { useDocumentStore } from '../store/documentStore';

export const CountrySelect: React.FC = () => {
  const setDefaultCountry = useDocumentStore((state) => state.setDefaultCountry);
  const defaultCountry = useDocumentStore((state) => state.defaultCountry);

  const countries = [
    { code: 'PE', name: 'Perú' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'MX', name: 'México' },
    { code: 'AR', name: 'Argentina' },
  ];

  return (
    <div className="space-y-2">
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
        País del Documento
      </label>
      <select
        id="country"
        value={defaultCountry}
        onChange={(e) => setDefaultCountry(e.target.value)}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-safeia-yellow focus:border-safeia-yellow"
      >
        <option value="">Selecciona un país</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};
