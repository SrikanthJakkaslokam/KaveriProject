export class partyInfoData{

    public srocode:number  ;
    public documentid :number  ;
    public partytypeid:number  ;
    public address:string  ;
    public isexecutor:boolean  ;
    public ispresenter :boolean  ;
    public firstname:string  ;
    public age:string  ;
    public admissiondate:string  ;
    public section88exemption:boolean  ;
    public isorganization:boolean  ;
    public organizationid:number  ;
    public middlename:string  ;
    public lastname:string  ;
    public sex:number  ;
    public aliasname:string  ;
    public correctedname:string  ;
    public relationship:string  ;
    public relativename:string  ;
    public epic:string  ;
    public pan:string  ;
    public phonenumber:string  ;
    public availableextacre:number  ;
    public availableextgunta:number  ;
    public availableextfgunta:number  ;
    public bincom:string  ;
    public category:string  ;
    public dateofdeath:string  ;
    public fingerid:number  ;
    public fingerverificationstatusid:number  ;
    public ispartofrtc:boolean  ;
    public landcode:number  ;
    public mainownerno:number  ;
    public ownerno:number  ;
    public partypoa:string  ;
    public photopath:string  ;
    public poaadmission:number  ;
    public poapresentation:number  ;
    public primaryseller:boolean  ;
    public profession:string  ;
    public restriction:object  ;
    public restrictiondescription:string  ;
    public restrictiontype:string  ;
    public thumbmatchfailedreasonid:number  ;
    public thumbminutiae:object ;
    public thumbpath:string  ;
    public totalextacre:number  ;
    public totalextgunta:number  ;
    public totalextfgunta:number  ;
    public transactextacre:number  ;
    public transactextgunta:number  ;
    public transactextfgunta:number  ;
    public volumename:string  ;
    public hasgpa:boolean  ;
    public isaua:boolean  ;
    public importedpartyparentid:number  ;
    public salutationid:number  ;
    public applicationnumber:string  ;

    constructor(srocode:number,documentid :number,partytypeid:number, address:string,
        isexecutor:boolean,ispresenter :boolean,firstname:string,age:string,admissiondate:string,
        section88exemption:boolean,isorganization:boolean,organizationid:number,middlename:string ,
        lastname:string,sex:number,aliasname:string,correctedname:string,relationship:string,relativename:string ,
        epic:string,pan:string,phonenumber:string,availableextacre:number,availableextgunta:number,
        availableextfgunta:number,bincom:string,category:string,dateofdeath:string,fingerid:number,
        fingerverificationstatusid:number,ispartofrtc:boolean,landcode:number,mainownerno:number,ownerno:number,
        partypoa:string,photopath:string,poaadmission:number, poapresentation:number,primaryseller:boolean ,
        profession:string,restriction:object,restrictiondescription:string,restrictiontype:string,
        thumbmatchfailedreasonid:number,thumbminutiae:object,thumbpath:string,totalextacre:number,
        totalextgunta:number,totalextfgunta:number,transactextacre:number ,transactextgunta:number,
        transactextfgunta:number,volumename:string,hasgpa:boolean,isaua:boolean,importedpartyparentid:number,
        salutationid:number,applicationnumber:string){
        this.srocode = srocode;
        this.documentid = documentid;
        this.partytypeid = partytypeid;
        this.address = address;
        this.isexecutor = isexecutor;
        this.ispresenter = ispresenter;
        this.firstname = firstname;
        this.age = age;
        this.admissiondate = admissiondate;
        this.section88exemption = section88exemption;
        this.isorganization = isorganization;
        this.organizationid = organizationid;
        this.middlename = middlename;
        this.lastname = lastname;
        this.sex = sex;
        this.aliasname = aliasname;
        this.correctedname = correctedname;
        this.relationship = relationship;
        this.relativename = relativename;
        this.epic = epic;
        this.pan = pan;
        this.phonenumber = phonenumber;
        this.availableextacre = availableextacre;
        this.availableextgunta = availableextgunta;
        this.availableextfgunta = availableextfgunta;
        this.bincom = bincom;
        this.category = category;
        this.dateofdeath = dateofdeath;
        this.fingerid = fingerid;
        this.fingerverificationstatusid = fingerverificationstatusid;
        this.ispartofrtc = ispartofrtc;
        this.landcode = landcode;
        this.mainownerno = mainownerno;
        this.ownerno = ownerno;
        this.partypoa = partypoa;
        this.photopath = photopath;
        this.poaadmission = poaadmission;
        this.poapresentation = poapresentation;
        this.primaryseller = primaryseller;
        this.profession = profession;
        this.restriction = restriction;
        this.restrictiondescription = restrictiondescription;
        this.restrictiontype = restrictiontype;
        this.thumbmatchfailedreasonid = thumbmatchfailedreasonid;
        this.thumbminutiae = thumbminutiae;
        this.thumbpath = thumbpath;
        this.totalextacre = totalextacre;
        this.totalextgunta = totalextgunta;
        this.totalextfgunta = totalextfgunta;
        this.transactextacre = transactextacre;
        this.transactextgunta = transactextgunta;
        this.transactextfgunta = transactextfgunta;
        this.volumename = volumename;
        this.hasgpa = hasgpa;
        this.isaua = isaua;
        this.importedpartyparentid = importedpartyparentid;
        this.salutationid = salutationid;
        this.applicationnumber=applicationnumber;
    }

}