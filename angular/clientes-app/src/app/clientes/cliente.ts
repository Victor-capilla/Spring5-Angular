import { Region } from './region';
import { Facturas } from '../facturas/models/facturas';
export class Cliente{
id:number;
nombre:string;
apellido:string;
email:string;
createAt:string;
foto:string;
region:Region;
facturas:Array<Facturas>;
}