import parse from 'html-react-parser'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState, useEffect, useCallback } from "react";
import { useChat } from "../hooks/useChat"
import { resolveUserAgent } from "../api/sc/agents/resolveUserAgent"
import "./Chat.css";


function Chat() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    initChat,
    sendMessage,
    isAgentAnswer,
    onFetching,
    messages,
    chatRef,
  } = useChat(user)

  const onSend = useCallback(
    async (text) => {
      if (!user) return
      await sendMessage(user, text)
    },
    [user, sendMessage]
  )

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const user = await resolveUserAgent()
      if (!user) return
      setUser(user)
      await initChat([user])
      setIsLoading(false)
    })()
  }, [initChat])

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    onSend(data.message_text)
    reset()
  }

  

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message `}>
            <div>{parse(message.text)}</div>
            <div class="message-time">{message.time} </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="input-box">
        <input
          type="text"
          placeholder="Введите данные для генерации расписания..."
          {...register('message_text', { required: true })}
        />
        <button
          type='submit'
          disabled={isAgentAnswer}
        >Отправить</button>
      </form>
    </div>
  );
}

export default Chat;
