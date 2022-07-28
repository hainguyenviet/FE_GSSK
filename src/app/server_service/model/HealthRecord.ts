export class HealthRecord {
  id: number;
  isTwin: boolean;
  isAdopted: boolean;
  height: Int32List;
  weight: Int32List;
  firstPeriodAge: Int32List;
  birthControl: Int32List;
  pregnantTime: Int32List;
  firstBornAge: Int32List;
  isSmoke: boolean;
  smokeTime: Int32List;
  giveUpSmokeAge: string;
  wineVolume: Int32List;
  workOutVolume: Int32List;
  workOutType: string;

  constructor(
    id: number,
    isTwin: boolean,
    isAdoptep: boolean,
    height: Int32List,
    weight: Int32List,
    firstPeriodAge: Int32List,
    birthControl: Int32List,
    pregnantTime: Int32List,
    firstBornAge: Int32List,
    isSmoke: boolean,
    smokeTime: Int32List,
    giveUpSmokeAge: string,
    wineVolume: Int32List,
    workOutVolume: Int32List,
    workOutType: string
  ) {
    this.id = id;
    this.isTwin = isTwin;
    this.isAdopted = isAdoptep;
    this.height = height;
    this.weight = weight;
    this.firstPeriodAge = firstBornAge;
    this.birthControl = birthControl;
    this.pregnantTime = pregnantTime;
    this.firstBornAge = firstBornAge;
    this.isSmoke = isSmoke;
    this.smokeTime = smokeTime;
    this.giveUpSmokeAge = giveUpSmokeAge;
    this.wineVolume = wineVolume;
    this.workOutVolume = workOutVolume;
    this.workOutType = workOutType;
  }
}
