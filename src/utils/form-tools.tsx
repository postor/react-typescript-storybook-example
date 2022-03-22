import { useEffect } from 'react'
import { useRef } from 'react'
import { FC } from 'react'
import { createContext, useContext, useState } from 'react'
import throttle from 'lodash.throttle'

export type Fields = { [key: string]: FormField }

export interface FormField {
  pending: number
  error: string
  value: string
  touched: boolean
  validate: (val: string, fields: Fields) => Promise<void | any>
  valid: boolean
  onChange: any
  throttle?: number
}

interface FormData {
  fields: Fields
  pendings: string[]
  valid: boolean
  errors: string[]
  register: (key: string, options: Partial<FormField>) => any
  data: Data
  validateAll: (forceAll?: boolean) => Promise<void | any>
}

type Data = { [key: string]: string }

let Ctx = createContext({} as FormData)

export const Consumer = Ctx.Consumer

export const Provider: FC = ({ children }) => {
  let [fields, setFields] = useState({} as Fields)
  let [pendings, setPendings] = useState([] as string[])
  let [errors, setErrors] = useState([] as string[])
  let [valid, setValid] = useState(false)
  let [data, setData] = useState({})
  let onChanges = useRef({} as any)
  let fieldsRef = useRef(fields)
  let initedFields = useRef({} as any)

  useEffect(() => {
    fieldsRef.current = fields
    setValid(Object.values(fields).every(x => x.valid))
    setErrors(Object.keys(fields).filter(x => fields[x].error))
    setPendings(Object.keys(fields).filter(x => fields[x].pending))
    let v = {} as Data
    for (let k in fields) {
      v[k] = fields[k].value
    }
    setData(v)
  }, [fields])

  return <Ctx.Provider value={{
    fields,
    pendings,
    errors,
    valid,
    data,
    register: (key, opts = {}) => {
      if (!fields[key]) {
        let onChange = async (value: string, key: string, touched: boolean) => {
          let x = fieldsRef.current
          setFieldPartial(key, { value, error: '', touched }, 1)
          try {
            await x[key].validate(value, x)
            setFieldPartial(key, { valid: true }, -1)
            return 0
          } catch (e: any) {
            setFieldPartial(key, { valid: false, error: e }, -1)
            return 1
          }
        }
        onChanges.current[key] = opts.throttle ? throttle(onChange, opts.throttle) : onChange
        Promise.resolve().then(() => {
          setFields(x => {
            let y = {
              ...x,
              [key]: {
                pending: 0,
                value: '',
                touched: false,
                validate: async () => { },
                error: '',
                valid: false,
                onChange: (e: any) => {
                  let { value } = e.target
                  onChanges.current[key](value, key, true)
                },
                ...opts,
              }
            }
            fieldsRef.current = y
            return y
          })
        })

        return {}
      }
      const { value, onChange } = fields[key]

      if (!initedFields.current[key]) {
        initedFields.current[key] = true
        Promise.resolve().then(() =>
          onChanges.current[key](value, key, false)
        )
      }
      return {
        value, onChange
      }
    },
    validateAll,
  }}>{children}</Ctx.Provider>

  function setFieldPartial(key: string, partial: Partial<FormField>, pending = 0) {
    setFields(x => {
      let f = x[key]
      return {
        ...x,
        [key]: {
          ...f,
          ...partial,
          pending: f.pending + pending
        }
      }
    })
  }

  function validateAll(forceAll = false) {
    let f = fieldsRef.current, c = onChanges.current
    return Promise
      .all(Object.keys(c).map(k => (forceAll || !f[k].touched)
        ? c[k](f[k].value, k, true)
        : Promise.resolve(f[k].error ? 1 : 0)))
      .then(x => !x.some(y => y == 1))
  }
}

export const useForm = () => useContext(Ctx)

