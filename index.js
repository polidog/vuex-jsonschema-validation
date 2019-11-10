import Ajv from 'ajv'
import deepcopy from 'deepcopy'
const ajv = new Ajv({ allErrors: true })

export default function storeJsonSchemaValidation(schema) {
  return store => {
    const prevState = deepcopy(store.state)
    store.subscribe((_, state) => {
      if (!ajv.validate(schema, state)) {
        store.replaceState(prevState)
        throw new Error(ajv.errorsText())
      }
    })
  }
}
