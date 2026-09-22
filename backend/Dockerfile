FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Skopiuj plik rozwiązania i pliki projektu, aby wykorzystać cache Dockera
COPY flightTrackerApi/flightTrackerApi.sln flightTrackerApi/
COPY flightTrackerApi/flightTrackerApi/flightTrackerApi.csproj flightTrackerApi/flightTrackerApi/
RUN dotnet restore flightTrackerApi/flightTrackerApi/flightTrackerApi.csproj

# Skopiuj resztę plików i zbuduj aplikację
COPY flightTrackerApi/ flightTrackerApi/
WORKDIR /src/flightTrackerApi/flightTrackerApi
RUN dotnet publish flightTrackerApi.csproj -c Release -o /app/publish

# Zbuduj ostateczny obraz
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "flightTrackerApi.dll"]
