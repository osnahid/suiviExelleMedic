export class Customer{
  name: string;
  type: string;
  phone: string;
  location: string;
  city: string;
  email: string;
  updated_at: Date;
  created_at: Date;
  id: number;
  actions: any[] = [];
  employees: Employee[] = [];
}

export class Employee {
  id: number;
  name: string;
  type: string;
  phone: string;
  email: string;
  customer_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
