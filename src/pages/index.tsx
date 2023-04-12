import { useState, useEffect } from 'react';
import { Company } from './api/types';

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://jhayrftpnew.bsite.net/api/companies');
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Companies;