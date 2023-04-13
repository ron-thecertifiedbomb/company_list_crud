export interface Product {
  id: number;
  name: string;
  generic: string;
  price: number;
}

export interface ProductList {
  id: number;
  name: string;
  price: number;
}

export interface Company {
  id: number;
  name: string;
  description: string;
  contactInfo: string;
  address: string;
  governmentRegistration: string;
  isActive: boolean;
  isDeleted: boolean;
  createdByUserName: string;
  createdByUserId: number;
  createdAt: string;
  lastUpdatedAt: string;
  lastUpdatedByUserName: string;
  lastUpdatedByUserId: string;
}
