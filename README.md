# Flight-Tracker ✈️

Aplikacja **Flight-Tracker** to system służący do monitorowania i zarządzania lotami. Projekt ten został stworzony jako **praca na zaliczenie z zajęć projektowych**.

## 📌 Funkcjonalności
- Przeglądanie aktualnych lotów z filtrowaniem (np. po dacie, typie lotu, lotnisku).
- Panel administratora umożliwiający pełne zarządzanie lotami (dodawanie nowych, edycja istniejących, usuwanie).
- Nowoczesny, responsywny interfejs użytkownika.

## 🛠️ Technologie
Projekt został oparty o nowoczesny stos technologiczny, podzielony na część frontendową i backendową, uruchamianą w konteneryzowanym środowisku.

- **Frontend:** React, Vite, Tailwind CSS, Material UI (MUI).
- **Backend:** C# .NET 9.0, ASP.NET Core Web API, Entity Framework Core.
- **Baza Danych:** PostgreSQL.
- **Infrastruktura:** Docker, Docker Compose, Nginx.

## 🚀 Jak uruchomić projekt?

Dzięki wykorzystaniu środowiska Docker, uruchomienie całej aplikacji sprowadza się do jednej komendy. Wymagane jest posiadanie zainstalowanego narzędzia [Docker](https://www.docker.com/) oraz Docker Compose.

1. Sklonuj to repozytorium lub przejdź do głównego folderu projektu.
2. Otwórz terminal.
3. Wykonaj poniższą komendę:

```bash
docker compose up --build
```

### Dostęp po uruchomieniu:
Po pomyślnym zbudowaniu i starcie kontenerów, projekt będzie dostępny pod następującymi adresami:
- **Aplikacja kliencka (Frontend):** [http://localhost:5173](http://localhost:5173)
- **API (Swagger UI):** [http://localhost:5032/swagger](http://localhost:5032/swagger)
- **Baza danych PostgreSQL:** port `3003` (lokalnie)