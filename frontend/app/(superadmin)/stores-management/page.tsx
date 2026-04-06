'use client'

import { useEffect, useState } from 'react'
import { storeApi } from '@/lib/api'
import { MapPin, Edit2, Trash2, CheckCircle, XCircle, Store } from 'lucide-react'
import { toast } from 'sonner'

interface StoreItem {
  _id: string
  name: string
  address: string
  status: string
  deliveryFee: number
  adminId?: { firstName: string; lastName: string }
}

export default function StoresManagementPage() {
  const [stores, setStores] = useState<StoreItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    storeApi.getAll({ status: 'all' })
      .then(res => setStores(res.data.data))
      .catch(() => toast.error('Erreur chargement'))
      .finally(() => setLoading(false))
  }, [])

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await storeApi.update(id, { status })
      setStores(prev => prev.map(s => s._id === id ? { ...s, status } : s))
      toast.success('Statut mis à jour')
    } catch {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
  </div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des magasins</h1>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            + Nouveau magasin
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Magasin</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Adresse</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Admin</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Statut</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stores.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">
                  <Store className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  Aucun magasin
                </td></tr>
              ) : stores.map(store => (
                <tr key={store._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{store.name}</td>
                  <td className="px-6 py-4 text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{store.address}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {store.adminId ? `${store.adminId.firstName} ${store.adminId.lastName}` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${store.status === 'active' ? 'bg-green-100 text-green-700' :
                        store.status === 'suspended' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                      {store.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {store.status !== 'active' && (
                        <button onClick={() => handleStatusChange(store._id, 'active')}
                          className="text-green-500 hover:text-green-700" title="Activer">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {store.status === 'active' && (
                        <button onClick={() => handleStatusChange(store._id, 'suspended')}
                          className="text-orange-500 hover:text-orange-700" title="Suspendre">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
