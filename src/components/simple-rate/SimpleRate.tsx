interface ISimpleRateProps {
  color?: string;
  opacity?: number;
}

export default function SimpleRate(props: ISimpleRateProps) {
  const { color = "white", opacity = 1 } = props;

  const style: any = {
    background: 'white',
    marginRight: '7px',
    width: '12px',
    height: '12px',
    transform: 'skewX(145deg)',
    opacity,
    color
  };

  return (
    <div className="rhombus skewx" style={style}></div>
  )
}
