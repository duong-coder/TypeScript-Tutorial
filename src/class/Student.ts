export class Student {
    id: string;
    name: string;
    status: boolean;
    role: string;
    email: string;
    dateActive: Date;

    constructor(id: string, name: string, status: boolean, role: string,
                email: string, dateActive: Date) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.role = role;
        this.email = email;
        this.dateActive = dateActive;                
    }
}