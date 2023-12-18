import { memo, FC } from 'react'

// Libs
import { Link } from 'react-router-dom'
import AntdCard from 'antd/es/card'

// Misc
import { getUrlId } from 'src/utils/getUrlId'

interface ICardProps {
  imageSrc: string
  details: Record<string, unknown>
}

const CARD_INLINE_STYLES = { width: 300 }

const CharacterCard: FC<ICardProps> = ({ imageSrc, details }) => {
  const { url, name } = details
  const id = getUrlId(url as string)

  return (
    <Link to={`/characters/${id}`}>
      <AntdCard hoverable style={CARD_INLINE_STYLES} cover={<img src={imageSrc} alt={`Character ${name}`} />}>
        <AntdCard.Meta title={name} />
      </AntdCard>
    </Link>
  );
}

CharacterCard.displayName = 'CharacterCard';

export default memo(CharacterCard)
