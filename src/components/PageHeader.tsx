import React, { ReactNode } from 'react';

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        {icon}
        <div>
          <h1 className="text-3xl font-bold text-safeia-black">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-lg text-safeia-gray">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
