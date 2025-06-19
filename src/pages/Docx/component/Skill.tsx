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
      <p>
        { data.list.map((x, i) => x?.replaceAll(' ', '').split(',').join(', ')).join(', ') }
      </p>
    </>
  )
}
