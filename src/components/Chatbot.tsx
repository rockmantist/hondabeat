import React, { useState } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

const initialMessages = [
  {
    id: 1,
    type: 'bot',
    message: 'Halo! Saya asisten JagaDesa. Bagaimana saya bisa membantu Anda hari ini?',
    timestamp: new Date()
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        message: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('laporan') || input.includes('report')) {
      return 'Untuk membuat laporan baru, Anda bisa menggunakan menu "Laporan" di sidebar. Apakah Anda memerlukan bantuan dalam mengisi formulir laporan?';
    }
    
    if (input.includes('kasus') || input.includes('case')) {
      return 'Informasi kasus dapat dilihat di menu "Manajemen Kasus". Anda dapat melihat status, progress, dan detail setiap kasus yang sedang ditangani.';
    }
    
    if (input.includes('peta') || input.includes('map')) {
      return 'Peta Intelijen menampilkan distribusi risiko desa secara visual. Anda dapat melihat tingkat risiko setiap desa dengan kode warna yang berbeda.';
    }
    
    if (input.includes('ai') || input.includes('analytics')) {
      return 'AI Analytics menyediakan analisis mendalam termasuk deteksi fraud, analisis sentimen, deteksi anomali, dan prediksi risiko. Fitur mana yang ingin Anda ketahui lebih lanjut?';
    }
    
    return 'Terima kasih atas pertanyaan Anda. Saya dapat membantu dengan informasi tentang laporan, kasus, peta intelijen, dan AI analytics. Silakan tanyakan hal yang lebih spesifik!';
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-40 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">JagaDesa Assistant</h3>
              <p className="text-gray-400 text-sm">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-gray-700'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ketik pesan Anda..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}