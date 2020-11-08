import { Order } from '../../../types/connpass'

export function OrderValueToLabel(val: Order) {
	switch (val) {
		case Order.DATE_OF_EVENT:
			return '開催日'
		case Order.LAST_UPDATE:
			return '更新日'
		case Order.NEW_ARRIVALS:
			return '新着'
		default:
			throw new Error('An unexpected value was entered')
	}
}