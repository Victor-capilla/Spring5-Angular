import { ItemFacturas } from './item-facturas';
import { Cliente } from '../../clientes/cliente';

export class Facturas {
    descripcion:string;
    observacion:string;
    items:Array<ItemFacturas>;
    clientes:Cliente;
    total:number;
    createAt:string;

    


}

