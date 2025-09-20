// Test simplu folosind node standard HTTP
const http = require('http');

const data = JSON.stringify({
  phone: '0756596565',
  message: 'Test SMS V2 cu sistem retry și multi-provider. Momentul trimiterii: ' + new Date().toLocaleString('ro-RO')
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/test/send-test-sms',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'Accept': 'application/json'
  }
};

console.log('🚀 Testez sistemul SMS îmbunătățit...');

const req = http.request(options, (res) => {
  console.log('📊 Status răspuns SMS:', res.statusCode);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonResponse = JSON.parse(responseData);
      console.log('📱 Răspuns SMS V2:', JSON.stringify(jsonResponse, null, 2));
      
      if (jsonResponse.success) {
        console.log('✅ SMS trimis cu succes!');
        if (jsonResponse.messageId) {
          console.log('📧 Message ID:', jsonResponse.messageId);
        }
        if (jsonResponse.provider) {
          console.log('🏢 Provider folosit:', jsonResponse.provider);
        }
        if (jsonResponse.simulated) {
          console.log('🧪 Mod simulare:', jsonResponse.simulated ? 'DA' : 'NU');
        }
      } else {
        console.log('❌ SMS nu a fost trimis:', jsonResponse.error);
      }
    } catch (error) {
      console.error('❌ Eroare parsare răspuns JSON:', error.message);
      console.log('📋 Răspuns raw:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('💥 Eroare la cererea SMS:', error.message);
});

// Trimite datele
req.write(data);
req.end();