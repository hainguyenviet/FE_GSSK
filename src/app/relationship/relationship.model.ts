import { illness } from "../illness/illness";
export class relationship {
    id: number;
    firstName: string;
    lastName: string;
    idCard: number;
    relationship: string
    orderFamily: string
    sex: string
    
    constructor(
        id: number,
        firstName: string,
        lastName: string,
        idCard: number,
        relationship: string,
        orderFamily: string,
        sex: string
      ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.idCard = idCard;
        this.relationship = relationship;
        this.orderFamily = orderFamily;
        this.sex = sex

      }
  }
  