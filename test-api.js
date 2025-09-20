// Test pentru API-ul de înregistrare
console.log('🚀 Testez conexiunea cu backend-ul...');

// Primul test - verifică dacă serverul răspunde
fetch('http://127.0.0.1:3001/health')
.then(response => {
  console.log('✅ Health check răspuns:', response.status);
  return response.json();
})
.then(data => {
  console.log('✅ Health data:', data);
  
  // Al doilea test - înregistrare utilizator
  const testData = {
    email: "test@example.com",
    username: "testuser", 
    password: "password123",
    firstName: "Test",
    verificationType: "email"
  };

  console.log('📤 Trimit cerere de înregistrare...');
  return fetch('http://127.0.0.1:3001/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData),
  });
})
.then(response => {
  console.log('📥 Status înregistrare:', response.status);
  return response.json();
})
.then(data => {
  console.log('✅ Răspuns înregistrare:', data);
})
.catch(error => {
  console.error('❌ Eroare:', error);
});