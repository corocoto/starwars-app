import { FC, memo, useCallback, useState } from 'react'

// Libs
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import InputNumber from 'antd/es/input-number'
import Select from 'antd/es/select'
import isEqual from 'lodash/isEqual'
import { useDispatch } from 'react-redux'
import { FieldData } from 'rc-field-form/lib/interface'

// Constants
import { BODY_COLOR_OPTIONS, EYE_COLOR_OPTIONS, GENDER_OPTIONS, HAIR_COLOR_OPTIONS, RULES } from './constants'

// Type definition
import type { AppDispatch } from 'src/store'
import { UpdateDataFormProps, AllFormValues } from './UpdateDataForm.types'

// Hooks
import useInitialFormValues, { FormFields } from './hooks/useInitialFormValues'

// Actions
import { updateCharacterInfo } from 'src/store/slices/Character'

// Misc
import getNormalizedCharacterData from './utils/getNormalizedCharacterData'

const UpdateDataForm: FC<UpdateDataFormProps> = props => {
  const { initialData, onCancel } = props

  // State
  const [hasFormErrors, setHasFormErrors] = useState(false)
  const [isSameFormValues, setIsSameFormValues] = useState(true)

  // Hooks
  const [form] = Form.useForm()
  const dispatch = useDispatch<AppDispatch>()
  const initialValues: FormFields = useInitialFormValues(initialData)

  // Handlers
  const handleValuesChanged = useCallback(
    (_changedValue: Partial<AllFormValues>, allValues: AllFormValues) => {
      const isChanged = isEqual(allValues, initialValues)

      setIsSameFormValues(isChanged)
    },
    [initialValues]
  )

  const handleFieldsChange = useCallback((_changedFields: FieldData[], allFields: FieldData[]) => {
    const hasErrors = allFields.some(field => field.errors && field.errors.length > 0)

    setHasFormErrors(hasErrors)
  }, [])

  const handleFormSubmit = useCallback(
    (updatedFormData: AllFormValues) => {
      const normalizedCharacterData = getNormalizedCharacterData(initialData, updatedFormData)

      dispatch(updateCharacterInfo({ data: normalizedCharacterData }))
      onCancel()
    },
    [dispatch, initialData, onCancel]
  )

  return (
    <Form
      name="character"
      form={form}
      initialValues={initialValues}
      onFieldsChange={handleFieldsChange}
      onValuesChange={handleValuesChanged}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onReset={onCancel}
      onFinish={handleFormSubmit}
    >
      <Form.Item label="Name" name="name" rules={RULES.required}>
        <Input />
      </Form.Item>

      <Form.Item label="Birth year" name="birth_year" rules={RULES.required}>
        <InputNumber min={1} addonAfter="BBY" />
      </Form.Item>

      <Form.Item label="Height" name="height" rules={RULES.required}>
        <InputNumber min={30} max={250} addonAfter="cm" />
      </Form.Item>

      <Form.Item label="Mass" name="mass" rules={RULES.required}>
        <InputNumber min={10} max={1500} addonAfter="kg" />
      </Form.Item>

      <Form.Item label="Eye color" name="eye_color">
        <Select options={EYE_COLOR_OPTIONS} />
      </Form.Item>

      <Form.Item label="Hair color" name="hair_color" rules={[...RULES.required, ...RULES.multiplyValuesValidator]}>
        <Select mode="multiple" allowClear options={HAIR_COLOR_OPTIONS} maxTagCount={3} />
      </Form.Item>

      <Form.Item
        label="Skin (body) color"
        name="skin_color"
        rules={[...RULES.required, ...RULES.multiplyValuesValidator]}
      >
        <Select mode="multiple" allowClear options={BODY_COLOR_OPTIONS} maxTagCount={3} />
      </Form.Item>

      <Form.Item label="Gender" name="gender" rules={RULES.required}>
        <Select options={GENDER_OPTIONS} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasFormErrors || isSameFormValues}>
          Update
        </Button>
        <Button htmlType="reset">Cancel</Button>
      </Form.Item>
    </Form>
  )
}

export default memo(UpdateDataForm)
