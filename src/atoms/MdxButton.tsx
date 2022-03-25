import { FC } from 'react'

type Props = {
  color: string
}

export const MyButton: FC<Props> = (props) => <button style={props} >{props.children}</button>

export default MyButton