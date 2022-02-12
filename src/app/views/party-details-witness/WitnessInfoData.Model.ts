export class WitnessData{

    public documentId:number  ;
    public name: string  ;
    public address: string ;
    public sex : boolean;
    public age :string  ;
    public profession :string ;
    public registrationId:number  ;
    public dateOfBirth:string ;
    public status:string  ;
    public phoneNo:string  ;
    public relation:string  ;
    public motherName:string  ;
    public fathersName:string  ;
    public presentatsolemanization : string;
    public isOnline :boolean  ;
    
    constructor(documentId:number,name: string,address: string,
        sex : boolean, age :string ,profession :string,registrationId:number,
        dateOfBirth:string,status:string,phoneNo:string,relation:string,motherName:string,
        fathersName:string,presentatsolemanization : string,isOnline :boolean){

            this.documentId=documentId;
            this.name=name;
            this.address=address;
            this.sex=sex;
            this.age=age;
            this.profession=profession;
            this.registrationId=registrationId;
            this.dateOfBirth=dateOfBirth;
            this.status=status;
            this.phoneNo=phoneNo;
            this.profession=profession;
            this.relation=relation;
            this.motherName=motherName;
            this.fathersName=fathersName;
            this.presentatsolemanization=presentatsolemanization;
            this.isOnline=isOnline;
    }

}