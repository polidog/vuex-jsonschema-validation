import Ajv from 'ajv'
const ajv = new Ajv({allErrors: true})

export default function storeJsonSchemaValidation(schema) {
  return store => {    
    store.subscribe((_, state) => {
      if (!ajv.validate(schema, state)) {
        throw new Error(ajv.errorsText())
      }
    })
  }
}