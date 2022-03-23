
import { Box, CircularProgress } from '@mui/material';
import Field from '../molecules/Field'
import { Consumer, FormField, Provider } from '../utils/form-tools'
import Button from '../atoms/Button'
import { useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error'

const RegisterForm = () => {
  let [submitting, setSubmitting] = useState(false)
  return <Provider>
    <Consumer>{({ data, register, fields, errors, pendings, validateAll }) => {
      return <Box>
        <div>
          <Field name={'account'} {...register('account', {
            validate: async (val) => {
              isASCII(val)
              lengthLimit(val, 5, 20)
              await accountExists(val)
            }
          })} {...getFieldProps(fields.account, 'please enter account')} />
        </div><div>
          <Field name={'password'} {...register('password', {
            validate: async (val) => {
              isASCII(val)
              lengthLimit(val, 6, 32)
            }
          })} {...getFieldProps(fields.password, 'please enter password')} type="password" />
        </div>
        <div>
          <Button onClick={async () => {
            setSubmitting(true)
            if (await validateAll(true)) {
              console.log(`valid`, data)
              // do something with `data`
            } else {
              console.log(`invalid`)
            }
            setSubmitting(false)
          }}
            variant="contained"
            disabled={submitting || !!errors.length || !!pendings.length}>register {
              (submitting || pendings.length)
                ? <CircularProgress size={12} />
                : errors.length
                  ? <ErrorIcon />
                  : null
            }</Button>
        </div>
      </Box>
    }}</Consumer>
  </Provider>
}

export default RegisterForm

function isASCII(str: string) {
  if (! /^[\x00-\x7F]*$/.test(str))
    throw 'not ascii!'
}

function lengthLimit(str: string, min: number, max: number) {
  if (str.length < min) throw `length at least ${min}`
  if (str.length > max) throw `length at most ${max}`
}

function accountExists(str: string) {
  return new Promise((resolve, reject) => setTimeout(() => {
    if (Math.random() < 0.5) return reject('account exists!')
    resolve('')
  }, Math.random() * 1000))
}

function getFieldProps(f: FormField, tip: string) {
  if (!f) return {}
  return {
    error: f.touched ? f.error : '',
    helperText: f.pending ? <CircularProgress size={12} /> : <>{tip}</>
  }
}