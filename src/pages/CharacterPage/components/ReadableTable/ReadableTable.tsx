import { FC, ReactNode, memo } from 'react'

// Type definitions
import { Character } from 'src/types/Character.type'

// Hooks
import useDataNormalize from './hooks/useDataNormalize'

// Libs
import Descriptions from 'antd/es/descriptions'

interface ReadableTableProps {
  data: Character
  actionButtons: ReactNode
}

const ReadableTable: FC<ReadableTableProps> = props => {
  const { data, actionButtons: ActionButtons } = props

  // Hooks
  const normalizedData = useDataNormalize({ data })

  return (
    <Descriptions
      title={`${data.name} information:`}
      layout="vertical"
      items={normalizedData}
      extra={ActionButtons}
      bordered
    />
  )
}

ReadableTable.displayName = 'ReadableTable'

export default memo(ReadableTable)
