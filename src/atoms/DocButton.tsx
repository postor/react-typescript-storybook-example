/**
 * 自动生成文档
 */

import { FC, CSSProperties } from 'react'

type Props = {
  color: string
}

/**
 * 我的按钮我的按钮我的按钮我的按钮我的按钮
 * @param props 各种style属性
 * @returns 
 */
export const MyButton: FC<Props> = (props) => <button style={props} >{props.children}</button>


export default MyButton