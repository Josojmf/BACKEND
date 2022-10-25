export type User = {
    DNI: string;
    Nombre: string;
    Apellido: string;
    Telefono: string;
    Email: string;
    IBAN: string;
    ID: string;
}

export type Transaction= {
    ID_Sender: string;
    ID_Receiver: string;
    Amount: number;
}