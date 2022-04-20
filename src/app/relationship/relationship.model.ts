import { illness } from "../illness/illness";
export class relationship {
    id: number;
    name: string;
    idCard: number;
    age: number;
    relationship: string
    orderFamily: string
    gender: string
    illnessName: illness[];
    
    constructor(
        id: number,
        name: string,
        idCard: number,
        relationship: string,
        orderFamily: string,
        gender: string,
        age: number,
        illnessName: illness[],

      ) {
        this.id = id;
        this.name = name;
        this.idCard = idCard;
        this.relationship = relationship;
        this.orderFamily = orderFamily;
        this.gender = gender
        this.age = age
        this.illnessName = illnessName
      }
  }
  