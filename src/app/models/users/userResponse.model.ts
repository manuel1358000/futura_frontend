export class UserResponse {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    contact: string;
    access_token: string;
  
    constructor(data: any) {
      this.id = data.id || 0;
      this.email = data.email || '';
      this.firstname = data.firstname || '';
      this.lastname = data.lastname || '';
      this.contact = data.contact || '';
      this.access_token = data.access_token || '';
    }
  }
  