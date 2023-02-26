export interface ICv {
    profile: ICvProfile;
    skill: ICvSkill;
    summary: ICvSummary;
    experience: ICvExperience[];
    referecence: ICvReference[];
}

export interface ICvProfile {
    photo: string;
    name: string;
    email: string;
    address: string;
    position: string;
    number: string;
    links: ICvLink[];
}

export interface ICvLink extends ICvBase {
    //
}

export interface ICvSkill {
    frontend: ICvSkillObj;
    backend: ICvSkillObj;
    databases: ICvSkillObj;
    miscellaneuos: ICvSkillObj;
}

export interface ICvSkillObj {
    level: number;
    list: string[];
}

export interface ICvSummary {
    title: string;
}

export interface ICvExperience {
    timeperiod: string;
    position: string;
    company: string;
    technologies: string[];
    descriptions: string[];
}

export interface ICvReference {
    list: ICvBase[]
}

export interface ICvBase {
    key: string;
    value: string;
}

export interface IGSheet extends ICvBase {
    groupId: string;
    value2: string;
    value3: string;
    description: string;
}

export class GSheetLib {
    public static readonly KEY_GROUP_ID = "groupId";
    public static readonly KEY_KEY = "key";
    public static readonly KEY_VALUE = "value";
    public static readonly KEY_DESCRIPTION = "description";

    public static readonly CV_PROFILE = "CVPRL";
    public static readonly CV_SKILL = "CVSKL";
    public static readonly CV_SUMMARY = "CVSMY";
    public static readonly CV_EXPERIENCE = "CVEXP";
    public static readonly CV_REFERENCE = "CVREF";
}