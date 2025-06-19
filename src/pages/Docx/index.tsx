import { useEffect, useState } from 'react';
import './style.scss';
import useGoogleSheets from 'use-google-sheets';
import { GSheetLib, ICv, ICvEducation, ICvExperience, ICvReference, IGSheet } from '../../interfaces/ICv';
// import { DocxLib } from './cv.lib';
// import Experience from './component/Experience';
// import Profile from './component/Profile';
// import Reference from './component/Reference';
// import Skill from './component/Skill';
// import Summary from './component/Summary';
import { useParams } from 'react-router-dom';
import Education from '../Docx/component/Education';
import Experience from '../Docx/component/Experience';
import Profile from '../Docx/component/Profile';
import Reference from '../Docx/component/Reference';
import Skill from '../Docx/component/Skill';
import Summary from '../Docx/component/Summary';
import { DocxLib } from './docx.lib';
// import Education from './component/Education';

// export const AppContext = createContext({});

export default function Docx() {
  const [cv, setCv] = useState<ICv>({} as any);

  let { gapikey, gsheetid } = useParams();

  const { data } = useGoogleSheets({
    apiKey: gapikey || "",
    sheetId: gsheetid || "",
    sheetsOptions: [{ id: 'Sheet1' }],
  });

  // const { data } = useGoogleSheets({
  //   apiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
  //   sheetId: process.env.REACT_APP_GOOGLE_SHEET_ID || "",
  //   sheetsOptions: [{ id: 'Sheet1' }],
  // });

  useEffect(() => {
    if (!data || !data.length) return;
    
    const sheet: any[] = data[0].data;
    const profileList = DocxLib.filterSheet(sheet, GSheetLib.CV_PROFILE);
    const skillList = DocxLib.filterSheet(sheet, GSheetLib.CV_SKILL);
    const summaryList = DocxLib.filterSheet(sheet, GSheetLib.CV_SUMMARY);
    const experienceList = DocxLib.filterSheet(sheet, GSheetLib.CV_EXPERIENCE);
    const referenceList = DocxLib.filterSheet(sheet, GSheetLib.CV_REFERENCE);
    const educationList = DocxLib.filterSheet(sheet, GSheetLib.CV_EDUCATION);
    const tabTitleList = DocxLib.filterSheet(sheet, GSheetLib.CV_TABTITLE);

    // experience group-mapping
    const experienceTechList = experienceList.filter(x => x.key.includes("_TECH"));
    const experienceObjList = experienceList.filter(x => !x.key.includes("_TECH"));
    const experienceGroupObj = DocxLib.groupData(experienceObjList);
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
    const referenceGroupObj = DocxLib.groupData(referenceList);
    const referenceGroupList: ICvReference[] = Object.keys(referenceGroupObj).map(key => {
      const list: IGSheet[] = referenceGroupObj[key];
      return {
        list: list.map(x => ({
          key: x.value2,
          value: x.value
        }))
      };
    });

    // education group-mapping
    const educationGroupObj = DocxLib.groupData(educationList);
    const educationGroupList: ICvEducation[] = Object.keys(educationGroupObj).map(key => {
      const list: IGSheet[] = educationGroupObj[key];
      return { list };
    });

    if (tabTitleList?.length && tabTitleList[0]) {
      document.title = tabTitleList[0].value;
    }
    
    setCv({
      profile: {
        photo: DocxLib.findData(profileList, "PHOTO"),
        name: DocxLib.findData(profileList, "NAME"),
        email: DocxLib.findData(profileList, "EMAIL"),
        address: DocxLib.findData(profileList, "ADDRESS"),
        position: DocxLib.findData(profileList, "POSITION"),
        number: DocxLib.findData(profileList, "NUMBER"),
        links: profileList.filter((x: IGSheet) => x.key.includes("LINK_")).map(x => {
          return {
            key: x.key.split("_")[1].toLowerCase(),
            value: x.value
          };
        })
      },
      skill: {
        backend: {
          level: DocxLib.findData(skillList, "BACKEND_LVL"),
          list: DocxLib.filterData(skillList, "BACKEND")
        },
        frontend: {
          level: DocxLib.findData(skillList, "FRONTEND_LVL"),
          list: DocxLib.filterData(skillList, "FRONTEND")
        },
        databases: {
          level: DocxLib.findData(skillList, "DATABASES_LVL"),
          list: DocxLib.filterData(skillList, "DATABASES")
        },
        miscellaneuos: {
          level: DocxLib.findData(skillList, "MISCELLANEUOS_LVL"),
          list: DocxLib.filterData(skillList, "MISCELLANEUOS")
        }
      },
      summary: {
        title: DocxLib.findData(summaryList, "TITLE")
      },
      experience: experienceGroupList,
      referecence: referenceGroupList,
      education: educationGroupList
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
    <div className="docx-container" style={{ width: '925px', margin: '0 auto' }}>
      <div style={{ width: '100%'}}>
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
          { cv.skill?.miscellaneuos && <Skill title='Miscellaneous' data={cv.skill.miscellaneuos} /> }
        </div>
        {/* <div style={style.col2.div}>
          { cv.summary && <Summary data={cv.summary} />}
        </div> */}
        <div style={style.col2.div}>
          { cv.experience && <Experience list={cv.experience} /> }
        </div>
        { cv.referecence?.length > 0 &&
          <div style={style.col2.div}>
            { cv.referecence && <Reference list={cv.referecence} /> }
          </div>
        }
        { cv.education?.length > 0 &&
          <div style={style.col2.div}>
            { cv.education && <Education list={cv.education} /> }
          </div>
        }
      </div>
    </div>
  )
}
