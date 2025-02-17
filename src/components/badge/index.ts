import './badge.less'
import { Badge, dot } from './badge'
import { attachPropertiesToComponent } from '@/components/utils/attach-properties-to-component'
export type { BadgeProps } from './badge'

export default attachPropertiesToComponent(Badge, { dot })
