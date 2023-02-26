interface ISimpleIconProps {
    iconSlug: string;
    color?: string;
    height?: string;
    width?: string;
    style?: any;
}

export default function SimpleIcon(props: ISimpleIconProps) {
  const { height = "32", width = "32", style  } = props;
  let { iconSlug, color = ""  } = props;

  switch (iconSlug) {
    case 'csharpcore':
      iconSlug = "csharp";
      color= "blueviolet";
      break;
    case '.netcore':
      iconSlug = ".net";
      color= "blueviolet";
      break;
  }
  
  return (
    <img className="simple-icon" style={style} height={height} width={width} src={'https://cdn.simpleicons.org/' + iconSlug + '/' + color} />
  )
}
