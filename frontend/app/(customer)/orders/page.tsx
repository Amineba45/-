'use client'

import { useEffect, useState } from 'react'
import { orderApi } from '@/lib/api'
import { formatPrice, formatDateTime, getOrderStatusLabel, getOrderStatusColor } from '@/lib/utils'
import { Package } from 'lucide-react'

interface Order {
  _id: string
  orderNumber: string
  storeId: { name: string }
  finalAmount: number
  orderStatus: string
  paymentMethod: string
  createdAt: string
  items: Array<{ name: string; quantity: number; price: number }>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderApi.getAll({})
      .then(res => setOrders(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mes commandes</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Aucune commande pour le moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">#{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">{order.storeId?.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                    {getOrderStatusLabel(order.orderStatus)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {order.items.map((item, i) => (
                    <span key={i}>{item.name} ×{item.quantity}{i < order.items.length - 1 ? ', ' : ''}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{formatDateTime(order.createdAt)}</span>
                  <span className="font-bold text-primary-600">{formatPrice(order.finalAmount)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
