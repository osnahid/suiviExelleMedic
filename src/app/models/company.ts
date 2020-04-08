export class Company {
  id: 1;
  logo: string | File;
  name: string;
  support_email: string;
  phone: string;
  location: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  materiels: any[] = [];
  softwares: any[] = [];
}
