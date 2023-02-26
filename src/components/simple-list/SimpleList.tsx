interface ISimpleListProps {
    list: string[];
    style: any;
}

export default function SimpleList(props: ISimpleListProps) {
  const { list, style } = props;

  return (
    <ul style={style.ul}>
        { list.map((d, i) => <li style={style.li} key={i}>{d}</li>) }
    </ul>
  )
}
