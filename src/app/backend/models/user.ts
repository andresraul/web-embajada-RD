export class User {
    name: string;
    lastname: string;
    email: string;
    role = 'USER_ROLE';
    password: string;
    access: any[];
    img: string;
    eventos: any;
    noticias: any;
constructor(name: string, lastname: string, email: string) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
}

}