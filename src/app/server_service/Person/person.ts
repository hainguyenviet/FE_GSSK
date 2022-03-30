export class person {
  id: number;
  firstName: string;
  lastName: string;
  phone: number;
  idCard: number;
  date: Date;
  mail: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    phone: number,
    idCard: number,
    date: Date,
    mail: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.idCard = idCard;
    this.date = date;
    this.mail = mail;
  }
}
