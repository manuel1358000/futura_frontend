export class User {
    firstname?: string;
    lastname?: string;
    email: string;
    password: string;
    contact?: string;
  
    constructor(data: any) {
      this.firstname = data.firstname || '';
      this.lastname = data.lastname || '';
      this.email = data.email || '';
      this.password = data.password || '';
      this.contact = data.contact || '';
    }
}