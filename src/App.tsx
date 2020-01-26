import React, { useState } from 'react'
import chunk from 'lodash/chunk'
import './App.css'
import { MOCK_CHAT_HISTORY, MOCK_LIST } from './helpers/mock'
import Table from './components/Table'

function splitToPairs(raw: string) {
  return chunk(
    raw
      .trim()
      .split(/[\n]{0,1}(\S+)\s+[\d]{2}:[\d]{2}:[\d]{2}\n/g)
      .filter(Boolean),
    2
  ) as [string, string][]
}

function App() {
  const [chatHistory, setChatHistory] = useState(MOCK_CHAT_HISTORY)
  const [list, setList] = useState(MOCK_LIST)
  const chatRecords = splitToPairs(chatHistory)
  return (
    <div className="App">
      <div className="left">
        <h2>聊天记录</h2>
        <textarea
          className="chat-history"
          value={chatHistory}
          onChange={(e) => setChatHistory(e.target.value)}
        />
        <h2>名单 <strong>一行一个</strong></h2>
        <textarea
          className="list"
          value={list}
          onChange={(e) => setList(e.target.value)}
        />
      </div>
      <div className="right">
        {/* <pre>{JSON.stringify(chatRecords, null, 2)}</pre> */}
        <Table
          list={list.split('\n').filter(Boolean)}
          chatRecords={chatRecords}
        />
      </div>
    </div>
  );
}

export default App;
