import { useState } from 'react'

function InsertChannelForm({ onChannelAdded }) {
  const [channelName, setChannelName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!channelName.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: channelName }),
      })
      if (!response.ok) throw new Error('Failed to add channel')
      const data = await response.json()
      onChannelAdded(data) // callback to parent to update state
      setChannelName('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New channel name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Channel'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default InsertChannelForm

