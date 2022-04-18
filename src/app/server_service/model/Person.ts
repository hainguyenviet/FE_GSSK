export class Person {
    id: number;
    firstName: string;
    lastName: string;
    phone: number;
    idCard: string;
    date: Date;
    mail: string;
    gender: string;
    constructor(id: number, firstName: string, lastName: string, phone: number, idCard: string, date: Date, mail: string, gender: string){
      this.date = date;
      this.id = id  
      this.firstName = firstName
      this.lastName = lastName
      this.idCard = idCard
      this.phone = phone
      this.mail = mail
      this.gender = gender
    }
  }