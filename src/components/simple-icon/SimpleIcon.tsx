interface ISimpleIconProps {
    iconSlug: string;
    color?: string;
    height?: string;
    width?: string;
    style?: any;
}

export default function SimpleIcon(props: ISimpleIconProps) {
  const { height = "32", width = "32", style  } = props;
  const { iconSlug } = props;
  
  return (
    <img className="simple-icon" style={style} height={height} width={width} src={'/my-app/simple-icons/' + iconSlug + '.svg'} title={iconSlug}/>
  )
}
