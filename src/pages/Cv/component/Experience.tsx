import SimpleIcon from '../../../components/simple-icon/SimpleIcon';
import SimpleList from '../../../components/simple-list/SimpleList';
import { ICvExperience } from '../../../interfaces/ICv';

interface IExperienceProps {
  list: ICvExperience[]
}

export default function Experience(props: IExperienceProps) {
  const { list } = props;
  
  return (
    <div className="experience">
      <h5>Experience</h5>
      { list.map((x, i) => 
        <div key={i} style={{ display: 'flex', marginBottom: '15px' }}>
          <div style={{ width: '30%' }}>
            <p>{x.timeperiod}</p>
          </div>
          <div style={{ width: '70%' }}>
            <p>{x.position}</p>
            <p>{x.company}</p>
            <div style={{ paddingTop: '0', display: 'ruby' }}>
              { x.technologies.map((d, ii) => 
              <div key={ii}>
                <span style={{ fontSize: '12px' }}>{d}</span>
                <SimpleIcon style={{ marginLeft: '2px' }} key={ii} iconSlug={d} height="14" width="14" />
              </div>) }
            </div>
            <div style={{ paddingTop: '5px' }}>
              <SimpleList style={{ ul: { marginLeft: '-15px' }, li: { listStyleType: 'square' }}} list={x.descriptions} />
            </div>
          </div>
        </div>)
      }
    </div>
  )
}
