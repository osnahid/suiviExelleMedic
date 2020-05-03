export class Material {
  name: string;
  image: string | File;
  type: string;
  hasSoftware: boolean = false;
  characteristics: string;
  company_id: number;
  company_name: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}
