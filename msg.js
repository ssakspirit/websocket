const WebSocket = require('ws')
const uuid = require('uuid')        // UUID 생성을 위해 나중에 사용

// 3000번 포트에 새로운 웹소켓 서버 생성
console.log('준비 완료. Minecraft 채팅에서 /connect localhost:3000을 입력하세요')
const wss = new WebSocket.Server({ port: 3000 })

// Minecraft에서 "/connect localhost:3000"을 입력하면 연결이 생성됩니다
wss.on('connection', socket => {
  console.log('연결됨')
  
  // 클라이언트로부터 메시지를 받았을 때 처리
  socket.on('message', message => {
    try {
      const parsedMessage = JSON.parse(message.toString()); // 메시지를 JSON으로 파싱
      console.log('받은 메시지:', parsedMessage.body.message); // 실제 메시지 출력
      // 여기에 메시지 처리 로직을 추가할 수 있습니다
    } catch (error) {
      console.error('메시지 처리 중 오류 발생:', error); // 오류 처리
    }
  })

  // 연결이 종료되었을 때 처리
  socket.on('close', () => {
    console.log('연결 종료됨')
  })
})
