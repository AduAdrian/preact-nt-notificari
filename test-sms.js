// Test dedicat pentru SMS V2 system
const BASE_URL = 'http://localhost:3001';

async function testSMS() {
  try {
    console.log('🚀 Testez noul sistem SMS îmbunătățit...\n');
    
    const response = await fetch(`${BASE_URL}/test/send-test-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        phone: '0756596565',
        message: 'Test SMS V2 cu sistem retry și multi-provider. Momentul trimiterii: ' + new Date().toLocaleString('ro-RO')
      })
    });

    console.log('📊 Status răspuns SMS:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Eroare HTTP:', response.status, errorText);
      return;
    }

    const responseData = await response.json();
    console.log('📱 Răspuns SMS V2:', JSON.stringify(responseData, null, 2));

    // Analiză răspuns
    if (responseData.success) {
      console.log('✅ SMS trimis cu succes!');
      if (responseData.messageId) {
        console.log('📧 Message ID:', responseData.messageId);
      }
      if (responseData.provider) {
        console.log('🏢 Provider folosit:', responseData.provider);
      }
      if (responseData.simulated) {
        console.log('🧪 Mod simulare:', responseData.simulated ? 'DA' : 'NU');
      }
    } else {
      console.log('❌ SMS nu a fost trimis:', responseData.error);
    }

  } catch (error) {
    console.error('💥 Eroare la testarea SMS:', error.message);
  }
}

// Testez de 2 ori cu 3 secunde pauză pentru a verifica retry logic
async function testMultiple() {
  await testSMS();
  
  console.log('\n⏳ Aștept 3 secunde pentru al doilea test...\n');
  setTimeout(async () => {
    await testSMS();
  }, 3000);
}

testMultiple();