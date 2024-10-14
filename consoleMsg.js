const WebSocket = require('ws')
const uuid = require('uuid')

// 포트 3000에 새로운 웹소켓 서버 생성
console.log('준비 완료. 마인크래프트 채팅창에 /connect localhost:3000을 입력하세요')
const wss = new WebSocket.Server({ port: 3000 })

// 마인크래프트에서 "/connect localhost:3000"을 입력하면 연결이 생성됩니다
wss.on('connection', socket => {
  console.log('연결됨')

  // 마인크래프트에 모든 채팅 메시지를 보내도록 요청. 마인크래프트 시작 시 한 번 필요
  socket.send(JSON.stringify({
    "header": {
      "version": 1,                     // 버전 1 메시지 프로토콜 사용
      "requestId": uuid.v4(),           // 요청에 대한 고유 ID
      "messageType": "commandRequest",  // 이것은 요청입니다 ...
      "messagePurpose": "subscribe"     // ... 구독하기 위한 ...
    },
    "body": {
      "eventName": "PlayerMessage"      // ... 모든 플레이어 메시지에 대해.
    },
  }))

  // 마인크래프트가 메시지를 보낼 때(예: 플레이어 채팅) 작동
  socket.on('message', packet => {
    const msg = JSON.parse(packet)

    // 이것이 채팅 메시지라면
    if (msg.header.eventName === 'PlayerMessage') {
      const time = new Date().toLocaleTimeString() // 현재 시간
      const playerId = msg.body.sender
      const message = msg.body.message
      console.log(`<${time}> <${playerId}>: ${message}`)
    }
  })
})
