'use client'

import { useEffect, useState } from 'react'
import { productApi } from '@/lib/api'
import { useAppSelector } from '@/hooks/useStore'
import { formatPrice } from '@/lib/utils'
import { Plus, Edit2, Trash2, Package } from 'lucide-react'
import { toast } from 'sonner'

interface Product {
  _id: string
  name: string
  price: number
  stock: number
  isActive: boolean
  categoryId?: { name: string }
}

export default function AdminProductsPage() {
  const { user } = useAppSelector(state => state.auth)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productApi.getAll({ storeId: user?.storeId })
      .then(res => setProducts(res.data.data))
      .catch(() => toast.error('Erreur lors du chargement des produits'))
      .finally(() => setLoading(false))
  }, [user])

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return
    try {
      await productApi.delete(id)
      setProducts(prev => prev.filter(p => p._id !== id))
      toast.success('Produit supprimé')
    } catch {
      toast.error('Erreur lors de la suppression')
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
  </div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mes produits</h1>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700">
            <Plus className="w-4 h-4" /> Ajouter un produit
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Aucun produit</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Produit</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Catégorie</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Prix</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Stock</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Statut</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">{product.categoryId?.name || '-'}</td>
                    <td className="px-6 py-4 text-gray-900">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">
                      <span className={product.stock < 10 ? 'text-red-600 font-medium' : 'text-gray-900'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {product.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
