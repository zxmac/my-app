import SimpleIcon from '../../../components/simple-icon/SimpleIcon';
import { ICvEducation } from '../../../interfaces/ICv'

interface IEducationProps {
  list: ICvEducation[]
}

export default function Education(props: IEducationProps) {
  const { list } = props;

  return (
    <div className="education">
      <h5>Education</h5>
      <div>
        { list.map((x, i) => 
          <div className="ref-row" key={i}>
            { x.list.map((r, ii) => 
              <div key={ii}>
                <h6>{r.value}</h6>
                <p style={{ marginBottom: '7px' }}>{r.value2}</p>
                <p>
                    <SimpleIcon className="si-c2" style={{ marginLeft: '2px', marginTop: '-5px' }} key={ii} iconSlug="calendar-days-solid" height="14" width="14" />
                    <span>{r.value3}</span>
                </p>
              </div>)
            }
          </div>)
        }
      </div>
    </div>
  )
}
