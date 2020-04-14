export class Material {
  name: string;
  image: File | string;
  type: string;
  hasSoftware: boolean = false;
  characteristics: string;
  company_id: number;
  company_name: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}
