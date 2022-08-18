export class Person {
    id: number;
    firstName: string;
    lastName: string;
    phone: number;
    idCard: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    updateAt: string;
    constructor(id: number, firstName: string, lastName: string, phone: number, idCard: string, dateOfBirth: string, email: string, gender: string, updateAt:string){
      this.dateOfBirth = dateOfBirth;
      this.id = id  
      this.firstName = firstName
      this.lastName = lastName
      this.idCard = idCard
      this.phone = phone
      this.email = email
      this.gender = gender
      this.updateAt = updateAt
    }
  }