import { memo, FC, ImgHTMLAttributes } from 'react'

// Libs
import AntdCard  from 'antd/es/card'


interface CardProps {
  hoverable?: boolean;
  imageProps: ImgHTMLAttributes<HTMLImageElement>;
  title: string;
}

const CARD_INLINE_STYLES = { width: 300 }

const Card: FC<CardProps> = ({ hoverable, imageProps, title }) => {
  return (
    <AntdCard hoverable={hoverable} style={CARD_INLINE_STYLES} cover={<img {...imageProps}  alt={imageProps.alt}/>}>
      <AntdCard.Meta title={title} />
    </AntdCard>
  )
}

Card.displayName = 'Card'

export default memo(Card)
