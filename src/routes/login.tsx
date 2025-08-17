import { useAuth } from '@/context/AuthContext'
import { getAllUsers } from '@/services/users'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: Login,
  loader: async ({ context }) => {
    return { user: context.user || null }
  }
})

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { user } = useLoaderData({ from: '/login' });

  if (user) {
    navigate({ to: '/profile' })
    return null
  }

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    enabled: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(username, password)
      if (success) {
        navigate({ to: '/' })
      } else {
        setError('Credenciais inválidas. Tente: admin / password')
      }
    } catch (err) {
      setError('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h2 className='subtitle'>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Fazendo login...' : 'Login'}
        </button>
      </form>
    </>
  )
}
