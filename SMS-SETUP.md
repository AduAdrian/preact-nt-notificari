````markdown
# 📱 Configurarea SMS cu SMSADVERTR.RO

## Pasul 1: Obține API Key

1. Accesează [smsadvertr.ro](https://www.smsadvertr.ro)
2. Creează un cont sau loghează-te
3. Mergi la secțiunea "API" sau "Developer"
4. Generează un API key nou
5. Copiază API key-ul

## Pasul 2: Configurează Backend-ul

Actualizează fișierul `backend/.env`:

```env
# SMS API Configuration - SMSADVERTR.RO
SMS_API_KEY="API_KEY_DE_LA_SMSADVERTR"
SMS_API_URL="https://www.smsadvertr.ro/api/sms"
SMS_SENDER="MISEDA"
```

## Pasul 3: Testează Configurația

### A. Prin API direct:
```bash
POST http://localhost:3001/api/sms
Content-Type: application/json

{
  "to": "+40712345678",
  "text": "Test SMS MISEDA INSPECT"
}
```

### B. Prin endpoint-urile de test:
```bash
# Verifică configurația SMS
GET http://localhost:3001/test/sms-config

# Trimite SMS de test
POST http://localhost:3001/test/send-test-sms
Content-Type: application/json

{
  "phone": "+40712345678"
}

# Status general notificări
GET http://localhost:3001/test/notification-status
```

### C. Prin frontend:
1. Accesează http://localhost:5173
2. Folosește componenta SMSTest (dacă e integrată)
3. Introdu numărul de telefon și mesajul
4. Apasă "Trimite SMS"

## Pasul 4: Integrare în Aplicație

SMS-urile se trimit automat la:
- Înregistrarea utilizatorilor (verificare)
- Reset parolă (dacă implementat)
- Notificări importante

## Formatare Numere de Telefon

Sistemul formatează automat numerele românești:
- `0712345678` → `+40712345678`
- `+40712345678` → `+40712345678` (neschimbat)
- `40712345678` → `+40712345678`

## Debugging

În modul dezvoltare (`NODE_ENV=development`):
- SMS-urile sunt simulate și loggate în consolă
- Nu se consumă credite reale
- Endpoint-urile returnează `simulated: true`

În producție:
- SMS-urile se trimit real prin smsadvertr.ro
- Se consumă credite din cont
- Logging complet pentru monitoring

## Endpoint-uri Disponibile

| Endpoint | Metodă | Descriere |
|----------|--------|-----------||
| `/api/sms` | POST | Proxy sigur către smsadvertr.ro |
| `/test/sms-config` | GET | Verifică configurația SMS |
| `/test/send-test-sms` | POST | Trimite SMS de test |
| `/test/notification-status` | GET | Status email + SMS |
| `/auth/register` | POST | Trimite cod verificare SMS |
| `/auth/resend-verification` | POST | Retrimite cod SMS |

## Securitate

✅ API key-ul nu este expus în frontend
✅ Toate request-urile SMS trec prin backend
✅ Validare input (format telefon, lungime mesaj)
✅ Rate limiting (opțional - implementează dacă e nevoie)
✅ Logging pentru audit și debugging

## Troubleshooting

### Eroarea "SMS_API_KEY nu este configurată"
- Verifică fișierul `.env`
- Repornește backend-ul după modificarea `.env`

### Eroarea "SMS API Error: 401"
- API key-ul este greșit sau expirat
- Verifică contul smsadvertr.ro

### Eroarea "SMS API Error: 403"
- Cont fără credite suficiente
- Numărul de telefon este blocat/invalid

### SMS-urile nu ajung
- Verifică formatul numărului de telefon
- Verifică logs-urile backend-ului
- Testează în modul dezvoltare mai întâi
````