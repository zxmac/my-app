import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICvProfile } from '../../../interfaces/ICv';
import SimpleIcon from '../../../components/simple-icon/SimpleIcon';

interface IProfileProps {
    data: ICvProfile
}

export default function Profile(props: IProfileProps) {
  const { data } = props;
    
  return (
    <div className="profile">
      <div className='main-profile'>
        <div className='profile-photo'>
          <img style={{width: '180px', borderRadius: '100px' }} src={data.photo ? data.photo : ''} referrerPolicy="no-referrer"></img>
        </div>
        <h5 style={{ textAlign: 'center' }}>{data.name}</h5>
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>{data.position}</p>
        <p style={{ paddingTop: '10px' }}>{data.email}</p>
        <p>{data.number}</p>
        <p>{data.address}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <FontAwesomeIcon icon="globe" />
      </div>
      <div className='profile-links'>
        { data.links.map((x, i) => 
          <p key={i}>
            <SimpleIcon style={{ marginLeft: '0px' }} iconSlug={x.key} height="14" width="14" />
            <span style={{ marginLeft: '8px' }}>{x.value}</span>
          </p>)
        }
      </div>
    </div>
  )
}
