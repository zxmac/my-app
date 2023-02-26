import { ICvReference } from '../../../interfaces/ICv'

interface IReferenceProps {
  list: ICvReference[]
}

export default function Reference(props: IReferenceProps) {
  const { list } = props;

  return (
    <div className="reference">
      <h5>Reference</h5>
      <div>
        {
          list.map((x, i) => 
            <div className="ref-row" key={i}>
              {
                x.list.map((r, ii) => 
                  <div key={ii}>
                    <div style={{ width: '30%' }}>
                      <p>{r.key}</p>
                    </div>
                    <div style={{ width: '70%' }}>
                      <p><span style={{ opacity: r.key ? 1 : 0 }}>: </span>{r.value}</p>
                    </div>
                  </div>)
              }
            </div>
          )
        }
      </div>
    </div>
  )
}
