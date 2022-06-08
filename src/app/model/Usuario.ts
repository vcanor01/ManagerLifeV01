import { Producto } from './Producto';
import {ListaCompra} from './ListaCompra';
import { Rutina } from './Rutina';
import { Comida } from './Comida';

export interface Usuario{
    id: string;
    nombre: string;
    apellidoUno: string;
    aprellidoDos: string;
    email: string;
    pass: string;
};
