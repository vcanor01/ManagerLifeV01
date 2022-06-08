/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/quotes */
import { Producto } from "./Producto";


export interface ListaCompra{
    id: string;
    nombreLista: string;
    productos: Producto[];
}