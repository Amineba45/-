'use client'

import { useCart } from '@/hooks/useStore'
import { useAppDispatch } from '@/hooks/useStore'
import { removeFromCart, updateQuantity, clearCart } from '@/lib/store/slices/cartSlice'
import { formatPrice } from '@/lib/utils'
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCart()
  const dispatch = useAppDispatch()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Votre panier est vide</h2>
          <Link href="/stores" className="text-primary-600 hover:underline">
            Continuer vos achats
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Mon panier ({totalItems} article{totalItems > 1 ? 's' : ''})
        </h1>

        <div className="space-y-4 mb-8">
          {items.map(item => (
            <div key={item.productId} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-primary-600 font-semibold">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <p className="font-semibold text-gray-900 w-24 text-right">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button
                onClick={() => dispatch(removeFromCart(item.productId))}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Sous-total</span>
            <span className="font-semibold">{formatPrice(totalPrice)}</span>
          </div>
          <div className="border-t pt-4 flex justify-between items-center mb-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-xl font-bold text-primary-600">{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
            >
              Vider le panier
            </button>
            <Link
              href="/checkout"
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-primary-700"
            >
              Commander
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
