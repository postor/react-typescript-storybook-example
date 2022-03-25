/**
 * 自动生成文档
 */

import Button, { ButtonClasses } from '@mui/material/Button'
import { FC, MouseEventHandler, ReactNode, ElementType } from 'react'

type Props = {
  variant: 'contained' | 'outlined' | 'text'
  href?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
  size?: "small" | "medium" | "large"
  children?: ReactNode
  classes?: Partial<ButtonClasses>
  component: ElementType<any>
}

/**
 * 我的按钮
 * @param props 
 * @returns 
 */
const MyButton: FC<Props> = (props) => <Button {...props} classes={''} />


export default MyButton