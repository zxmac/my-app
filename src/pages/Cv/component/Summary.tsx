import { ICvSummary } from '../../../interfaces/ICv';

interface ISummaryProps {
  data: ICvSummary
}

export default function Summary(props: ISummaryProps) {
  const { data } = props;
  
  return (
    <div className="summary">
      <h2>Summary</h2>
      <p>{data.title}</p>
    </div>
  )
}
