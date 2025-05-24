import React, { useEffect, useState } from 'react';

function Chat({ currentUserId }) {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [notification, setNotification] = useState({});

  // Charger la liste d'amis
  useEffect(() => {
    fetch(`http://localhost:5000/api/relationships/${currentUserId}`)
      .then(res => res.json())
      .then(data => setFriends(data));
  }, [currentUserId]);

  // Charger les messages et marquer comme lus
  useEffect(() => {
    if (selectedFriend) {
      fetch(`http://localhost:5000/api/messages/${currentUserId}/${selectedFriend.id}`)
        .then(res => res.json())
        .then(data => {
          setMessages(data);
          setNotification(prev => ({ ...prev, [selectedFriend.id]: false }));
        });

      // ✅ Marquer comme lus
      fetch(`http://localhost:5000/api/messages/read/${currentUserId}/${selectedFriend.id}`, {
        method: 'PUT'
      });
    }
  }, [selectedFriend, currentUserId]);

  // Vérifie régulièrement les nouveaux messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (!friends.length) return;

      friends.forEach(friend => {
        // Évite les requêtes vers un ami non sélectionné
        if (selectedFriend && friend.id === selectedFriend.id) return;

        fetch(`http://localhost:5000/api/messages/${friend.id}/${currentUserId}`)
          .then(res => res.json())
          .then(data => {
            const last = data[data.length - 1];
            if (
              last &&
              last.receiver_id === currentUserId &&
              (!messages.length || last.id !== messages[messages.length - 1]?.id)
            ) {
              setNotification(prev => ({ ...prev, [friend.id]: true }));
            }
          });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [friends, currentUserId, selectedFriend, messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender_id: currentUserId,
        receiver_id: selectedFriend.id,
        content: newMessage
      })
    })
      .then(res => res.json())
      .then(msg => {
        setMessages(prev => [...prev, msg]);
        setNewMessage('');
      });
  };

  return (
    <div className="box">
      <h2>📨 Messagerie</h2>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Liste des amis */}
        <div style={{ width: '30%' }}>
          <h4>Mes contacts</h4>
          <ul>
            {friends.map(friend => (
              <li key={friend.id}>
                <button onClick={() => setSelectedFriend(friend)}>
                  {friend.name}
                  {notification[friend.id] && (
                    <span style={{ color: 'red', marginLeft: 8 }}>•</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Zone de discussion */}
        <div style={{ flex: 1 }}>
          {selectedFriend ? (
            <>
              <h4>Discussion avec {selectedFriend.name}</h4>
              <div style={{ maxHeight: '300px', overflowY: 'auto', background: '#f4f4f4', padding: 10, borderRadius: 6, marginBottom: 10 }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{ textAlign: msg.sender_id === currentUserId ? 'right' : 'left' }}>
                    <p style={{
                      background: msg.sender_id === currentUserId ? '#DCF8C6' : '#fff',
                      display: 'inline-block',
                      padding: 8,
                      borderRadius: 8,
                      margin: 4,
                      maxWidth: '80%'
                    }}>
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Écris ton message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{
                    width: '70%',
                    padding: '10px',
                    fontSize: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    outline: 'none'
                    }}
                />
                <button
                    onClick={handleSend}
                    style={{
                    width: '30%',
                    padding: '10px',
                    fontSize: '0.9rem',
                    borderRadius: '6px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                    }}
                >
                    Envoyer
                </button>
                </div>

            </>
          ) : (
            <p>Sélectionne un ami pour discuter.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
