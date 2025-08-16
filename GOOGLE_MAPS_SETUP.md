# Google Maps API Setup Guide

## Стъпки за създаване на Google Maps API ключ:

### 1. Отидете в Google Cloud Console
- Посетете: https://console.cloud.google.com/
- Влезте с вашия Google акаунт

### 2. Създайте нов проект (ако нямате)
- Кликнете "Select a project" → "New Project"
- Въведете име на проекта (например: "CarParts-Maps")
- Кликнете "Create"

### 3. Активирайте Maps JavaScript API
- Отидете в "APIs & Services" → "Library"
- Търсете "Maps JavaScript API"
- Кликнете върху него и натиснете "Enable"

### 4. Създайте API ключ
- Отидете в "APIs & Services" → "Credentials"
- Кликнете "Create Credentials" → "API Key"
- Копирайте новия API ключ

### 5. Ограничете API ключа (препоръчително)
- Кликнете върху новия API ключ
- В "Application restrictions" изберете "HTTP referrers"
- Добавете: `localhost:4200/*` и вашия домейн
- В "API restrictions" изберете "Maps JavaScript API"
- Запазете промените

### 6. Настройте Billing (ако е необходимо)
- Отидете в "Billing"
- Свържете проекта с billing account
- Google дава $200 безплатен кредит месечно

### 7. Заменете API ключа в проекта
В `src/index.html`, заменете:
```html
src="https://maps.googleapis.com/maps/api/js?key=YOUR_NEW_API_KEY"
```

## Алтернативно решение (без API ключ)

Ако не искате да използвате Google Maps API, можете да използвате:

### OpenStreetMap с Leaflet
```bash
npm install leaflet @types/leaflet
```

### Google Maps Embed (без JavaScript API)
```html
<iframe
  width="100%"
  height="400"
  frameborder="0"
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Sofia,Bulgaria"
  allowfullscreen>
</iframe>
```

## Безплатни лимити на Google Maps:
- $200 безплатен кредит месечно
- До 28,500 заявки месечно за Map Loads
- Това е достатъчно за повечето малки приложения
