import { ICvSummary } from '../../../interfaces/ICv';

interface ISummaryProps {
  data: ICvSummary
}

export default function Summary(props: ISummaryProps) {
  const { data } = props;
  
  return (
    <div className="summary">
      <h5>Summary</h5>
      <p>{data.title}</p>
    </div>
  )
}
