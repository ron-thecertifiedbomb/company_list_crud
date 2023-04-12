import React, { useState } from 'react';
import { Company } from '../api/types';

function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);

  async function createCompany(company: Company): Promise<void> {
    const response = await fetch('/api/companies', {
      method: 'POST',
      body: JSON.stringify(company),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const createdCompany = await response.json();
    setCompanies([...companies, createdCompany]);
  }

  async function updateCompany(id: number, updatedCompany: Company): Promise<void> {
    const response = await fetch(`/api/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedCompany),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const updatedCompanyData = await response.json();
    setCompanies(
      companies.map((company) => (company.id === id ? updatedCompanyData : company))
    );
  }

  async function deleteCompany(id: number): Promise<void> {
    await fetch(`/api/companies/${id}`, {
      method: 'DELETE',
    });

    setCompanies(companies.filter((company) => company.id !== id));
  }

  async function handleCreateCompany() {
    const newCompany: Company = {
      id: 1,
      name: 'New Company',
      description: 'A new company',
      contactInfo: 'contact@newcompany.com',
      address: '123 New St',
      governmentRegistration: 'ABCD1234',
      isActive: true,
      isDeleted: false,
      createdByUserName: 'user1',
      createdByUserId: 1,
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      lastUpdatedByUserName: 'user1',
      lastUpdatedByUserId: '1',
    };

    await createCompany(newCompany);
  }

  return (
    <div>
      <button onClick={handleCreateCompany}>Create Company</button>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <span>{company.name}</span>
            <button onClick={() => updateCompany(company.id, { ...company, name: 'Updated Name' })}>
              Update
            </button>
            <button onClick={() => deleteCompany(company.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
