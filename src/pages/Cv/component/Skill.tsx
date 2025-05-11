import SimpleList from '../../../components/simple-list/SimpleList';
import SimpleRate from '../../../components/simple-rate/SimpleRate';
import { ICvSkillObj } from '../../../interfaces/ICv';

interface ICvSkillProps {
    title: string,
    data: ICvSkillObj
}

export default function Skill(props: ICvSkillProps) {
  const { title, data } = props;

  const rate = [];
  for (let i = 0; i < 10; i++) {
    rate.push(data.level > i);
  }

  return (
    <>
      <h5>{title}</h5>
      { data.level > 0 && 
        <div style={{ marginLeft: '10px', marginBottom: '10px', display: 'flex' }}>
          { rate.map((x, i) => <SimpleRate opacity={x ? 1 : .5} key={i} />) }
        </div>
      }
      <div>
        <SimpleList style={{ ul: { marginLeft: '-15px' }, li: { listStyleType: 'square' }}} list={data.list} />
      </div>
    </>
  )
}
