import { FormControl, InputLabel, FormHelperText, Input } from '@mui/material'
import { FC } from 'react'


type Props = {
  name: string,
  value?: string,
  inputId?: string,
  helperId?: string,
  label: string,
  type?: string,
  helperText?: any,
  onChange?: any,
  error?: string,
}

const Field: FC<Props> = (props) => {
  const { name, label, value = '', helperText = '', error = '' } = props
  let {
    type = 'text',
    inputId = `${name}-input`,
    helperId = `${name}-helper`,
    onChange = () => { }
  } = props
  
  return <FormControl>
    <InputLabel htmlFor={inputId}>{label}</InputLabel>
    <Input id={inputId} aria-describedby={helperId} type={type} value={value} name={name}
      error={!!error} onChange={onChange} />
    {(error || helperText)
      ? <FormHelperText id={helperId} error={!!error}>{error || helperText}</FormHelperText>
      : null}
  </FormControl>
}

export default Field