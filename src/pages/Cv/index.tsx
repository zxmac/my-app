import { useEffect, useState } from 'react';
import './style.scss';
import useGoogleSheets from 'use-google-sheets';
import { GSheetLib, ICv, ICvExperience, ICvReference, IGSheet } from '../../interfaces/ICv';
import { CvLib } from './cv.lib';
import Experience from './component/Experience';
import Profile from './component/Profile';
import Reference from './component/Reference';
import Skill from './component/Skill';
import Summary from './component/Summary';

// export const AppContext = createContext({});

export default function Cv() {
  const [cv, setCV] = useState<ICv>({} as any);
  
  const { data } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
    sheetId: process.env.REACT_APP_GOOGLE_SHEET_ID || "",
    sheetsOptions: [{ id: 'Sheet1' }],
  });

  useEffect(() => {
    if (!data || !data.length) return;
    
    const sheet: any[] = data[0].data;
    const profileList = CvLib.filterSheet(sheet, GSheetLib.CV_PROFILE);
    const skillList = CvLib.filterSheet(sheet, GSheetLib.CV_SKILL);
    const summaryList = CvLib.filterSheet(sheet, GSheetLib.CV_SUMMARY);
    const experienceList = CvLib.filterSheet(sheet, GSheetLib.CV_EXPERIENCE);
    const referenceList = CvLib.filterSheet(sheet, GSheetLib.CV_REFERENCE);

    // experience group-mapping
    const experienceTechList = experienceList.filter(x => x.key.includes("_TECH"));
    const experienceObjList = experienceList.filter(x => !x.key.includes("_TECH"));
    const experienceGroupObj = CvLib.groupData(experienceObjList);
    const experienceGroupList = Object.keys(experienceGroupObj).map(key => {
      const list: IGSheet[] = experienceGroupObj[key];
      const techObj = experienceTechList.find(t => t.key.includes(key));
      
      const obj: ICvExperience = {
        company: list[0]?.value,
        position: list[0]?.value2,
        timeperiod: list[0].value3,
        technologies: [],
        descriptions: list.map(x => x.description)
      };

      if (techObj) {
        obj.technologies = techObj.description.split(',')
      }
      
      return obj;
    });

    // reference group-mapping
    const referenceGroupObj = CvLib.groupData(referenceList);
    const referenceGroupList: ICvReference[] = Object.keys(referenceGroupObj).map(key => {
      const list: IGSheet[] = referenceGroupObj[key];
      return {
        list: list.map(x => ({
          key: x.value2,
          value: x.value
        }))
      };
    });
    
    setCV({
      profile: {
        photo: CvLib.findData(profileList, "PHOTO"),
        name: CvLib.findData(profileList, "NAME"),
        email: CvLib.findData(profileList, "EMAIL"),
        address: CvLib.findData(profileList, "ADDRESS"),
        position: CvLib.findData(profileList, "POSITION"),
        number: CvLib.findData(profileList, "NUMBER"),
        links: profileList.filter((x: IGSheet) => x.key.includes("LINK_")).map(x => {
          return {
            key: x.key.split("_")[1].toLowerCase(),
            value: x.value
          };
        })
      },
      skill: {
        backend: {
          level: CvLib.findData(skillList, "BACKEND_LVL"),
          list: CvLib.filterData(skillList, "BACKEND")
        },
        frontend: {
          level: CvLib.findData(skillList, "FRONTEND_LVL"),
          list: CvLib.filterData(skillList, "FRONTEND")
        },
        databases: {
          level: CvLib.findData(skillList, "DATABASES_LVL"),
          list: CvLib.filterData(skillList, "DATABASES")
        },
        miscellaneuos: {
          level: CvLib.findData(skillList, "MISCELLANEUOS_LVL"),
          list: CvLib.filterData(skillList, "MISCELLANEUOS")
        }
      },
      summary: {
        title: CvLib.findData(summaryList, "TITLE")
      },
      experience: experienceGroupList,
      referecence: referenceGroupList
    });
  }, [data]);

  const style = {
    col1: {
      div: { padding: '0px 15px 10px 15px' }
    },
    col2: {
      div: { padding: '0px 15px 10px 15px' }
    }
  };
  
  return (
    <div className="cv-container" style={{ width: '925px', margin: '0 auto' }}>
      <div style={{ display: 'flex', width: '100%'}}>
        <div className="cv-col-1" style={{ width: '30%', color: 'white' }}>
          <div style={style.col1.div}>
            { cv.profile && <Profile data={cv.profile} />}
          </div>
          <div style={style.col1.div}>
            { cv.skill?.frontend && <Skill title='Frontend' data={cv.skill.frontend} /> }
          </div>
          <div style={style.col1.div}>
            { cv.skill?.backend && <Skill title='Backend' data={cv.skill.backend} /> }
          </div>
          <div style={style.col1.div}>
            { cv.skill?.databases && <Skill title='Databases' data={cv.skill.databases} /> }
          </div>
          <div style={style.col1.div}>
            { cv.skill?.miscellaneuos && <Skill title='Miscellaneuos' data={cv.skill.miscellaneuos} /> }
          </div>
        </div>
        <div className="cv-col-2" style={{ width: '70%', backgroundColor: 'white' }}>
          <div style={style.col2.div}>
            { cv.summary && <Summary data={cv.summary} />}
          </div>
          <div style={style.col2.div}>
            { cv.experience && <Experience list={cv.experience} /> }
          </div>
          <div style={style.col2.div}>
            { cv.referecence && <Reference list={cv.referecence} /> }
          </div>
        </div>
      </div>
    </div>
  )
}
