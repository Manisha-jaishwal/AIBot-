import { Box, Stack } from '@mui/material';
import InitialChat from '../../Component/InitialChat/InitialChat';
import ChatInput from '../../Component/ChatInput/ChatInput';
import ChattingCard from '../../Component/ChattingCard/ChattingCard';
import FeedbackModal from '../../Component/FeedbackModal/FeedbackModal';
import { useEffect, useRef, useState, useContext } from 'react';
import data from '../../aiData/sampleData.json'
import { useOutletContext } from "react-router-dom";
import Navbar from '../../Component/Navbar/Navbar';
import { ThemeContext } from '../../theme/ThemeContext';

export default function Home() {

  const [showModal, setShowModal] = useState(false)
  const listRef = useRef(null)
  const [chatId, setChatId] = useState(1)
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const { chat, setChat } = useOutletContext();
  const { mode } = useContext(ThemeContext)

  const generateResponse = (input) => {
    const response = data.find(item => input.toLowerCase() === item.question.toLowerCase())
    let answer = "Sorry, Did not understand your query!"
    if (response) answer = response.response

    setChat(prev => ([
      ...prev,
      { type: 'Human', text: input, time: new Date(), id: chatId },
      { type: 'AI', text: answer, time: new Date(), id: chatId + 1 }
    ]))

    setChatId(prev => prev + 2)
  }

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" })
  }, [scrollToBottom])

  return (
    <Stack
      height="100vh"
      width="100%"
      sx={{
        background: 'linear-gradient(rgba(215,199,244,0.2), rgba(151,133,186,0.2))',
      }}
    >

      <Navbar />

      <Box
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: "1100px",
          mx: "auto",
          overflowY: "auto",
        }}
        ref={listRef}
      >
        {chat.length === 0 && <InitialChat generateResponse={generateResponse} />}

        {chat.length > 0 && (
          <Stack p={{ xs: 2, md: 3 }} spacing={2}>
            {chat.map((item, index) => (
              <ChattingCard
                details={item}
                key={index}
                updateChat={setChat}
                setSelectedChatId={setSelectedChatId}
                showFeedbackModal={() => setShowModal(true)}
              />
            ))}
          </Stack>
        )}
      </Box>

      <ChatInput generateResponse={generateResponse} setScroll={setScrollToBottom} chat={chat} clearChat={() => setChat([])} />

      <FeedbackModal open={showModal} updateChat={setChat} chatId={selectedChatId} handleClose={() => setShowModal(false)} />

    </Stack>
  )
}
