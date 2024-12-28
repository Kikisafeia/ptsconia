import React, { ReactNode } from 'react';

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, subtitle }) => {
  return (
    <header className="mb-8" role="banner">
      <div className="flex items-center">
        <div role="img" aria-label="Ícono descriptivo">
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-safeia-black" id="page-title">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-lg text-safeia-gray" aria-describedby="page-title">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};
