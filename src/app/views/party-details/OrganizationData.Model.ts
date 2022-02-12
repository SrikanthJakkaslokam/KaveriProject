export class OrganizationData{

    public orgname: string  ;
    public orgcorrectedname: string ;
    public orgidnumber :string  ;
    public panno :string ;
    public tinno:string ;
    public tanno:string  ;
    public regaddress:string  ;
    public yearofincorp :number  ;
    public documentid:number  ;
    public srocode:number  ;
    public applicationnumber:string  ;

    constructor(orgname: string,orgcorrectedname: string,orgidnumber :string,
        panno :string, tinno:string,tanno:string,regaddress:string,
        yearofincorp :number,documentid:number,srocode:number,applicationnumber:string){

            this.orgname=orgname;
            this.orgcorrectedname=orgcorrectedname;
            this.orgidnumber=orgidnumber;
            this.panno=panno;
            this.tinno=tinno;
            this.tanno=tanno;
            this.regaddress=regaddress;
            this.yearofincorp=yearofincorp;
            this.documentid=documentid;
            this.srocode=srocode;
            this.applicationnumber=applicationnumber;
    }

}