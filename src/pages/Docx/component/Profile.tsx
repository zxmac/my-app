import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICvProfile } from '../../../interfaces/ICv';

interface IProfileProps {
    data: ICvProfile
}

export default function Profile(props: IProfileProps) {
  const { data } = props;
    
  return (
    <div className="profile">
      <div className='main-profile'>
        {/* <div className='profile-photo'>
          <img style={{width: '180px', borderRadius: '100px' }} src={data.photo ? data.photo : ''} referrerPolicy="no-referrer"></img>
        </div> */}
        <h6 style={{ textAlign: 'center' }}>{data.name}</h6>
        <h6 style={{ textAlign: 'center' }}>{data.position}</h6>
        <p style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '12px' }}>{data.email}<br/>{data.number}<br/>{data.address}</p>
        {/* <p>{data.number}</p>
        <p>{data.address}</p> */}
      </div>
      {/* <div style={{ marginBottom: '10px' }}>
        <FontAwesomeIcon icon="globe" />
      </div> */}
      <div className='profile-links'>
        { data.links.map((x, i) => 
          <p key={i}>
            <FontAwesomeIcon icon={['fab', x.key as any]} />
            <span style={{ marginLeft: '8px' }}>{x.value}</span>
          </p>)
        }
      </div>
    </div>
  )
}
