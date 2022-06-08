/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { Ejercicio } from "./Ejercicio";

/* eslint-disable no-trailing-spaces */
export interface Rutina{
    id: string;
    dia: number;
    ejercicios: Ejercicio[];

}