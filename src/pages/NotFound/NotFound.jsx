import React from 'react'

const NotFound = () => {
  return (
    <div className='body'>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center text-indigo-400'>
          <h1 className='text-6xl font-bold mb-4'>404</h1>
          <p className='text-2xl mb-4'>Página no encontrada</p>
          <div className="bg-indigo-400 text-slate-200 rounded-full px-6 py-3 shadow">
            <a href="/roulette" className='text-primary-600 text-lg font-semibold'>Volver al inicio</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound