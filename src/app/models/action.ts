import { User } from './user';
import { Customer } from './customer';
import { Material } from './material';
import { Software } from './software';
import { Subscription } from './subscription';

export class Action {
  id: number;
  city: string;
  account = new User();
  client = new Customer();
  type: string;
  created_at: Date = new Date();
  material: {
    material: Material,
    sn: string
  } = {material: new Material(), sn: ''};
  software = new Software();
  subscription = new Subscription();

}
