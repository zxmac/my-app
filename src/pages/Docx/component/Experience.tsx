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
      <h5 style={{ marginBottom: '15px' }}>Experience</h5>
      { list.map((x, i) => 
        <div key={i} style={{ marginTop: '30px', marginBottom: '30px' }}>
          <p style={{ fontWeight: 'bold' }}>{x.position}</p>
          <p style={{ fontWeight: 'bold' }}>{x.company}</p>
          <p style={{ fontStyle: 'italic', fontSize: '12px' }}>{x.timeperiod}</p>
          <p style={{ paddingTop: '0', display: 'ruby' }}>
            Tech Stacks: { x.technologies.join(', ') }
          </p>
          <div style={{ paddingTop: '10px' }}>
            <SimpleList style={{ ul: { marginLeft: '-15px' }, li: { listStyleType: 'square' }}} list={x.descriptions} />
          </div>
        </div>)
      }
    </div>
  )
}
