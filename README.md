# PTSConia - Análisis de Procedimientos de Trabajo Seguro

PTSConia es una aplicación web para analizar y verificar el cumplimiento de Procedimientos de Trabajo Seguro (PTS) con los requisitos establecidos en seguridad y salud, medio ambiente y calidad para un país específico.

## Características Principales
- Análisis automatizado de documentos PTS
- Verificación de cumplimiento con normativas locales e internacionales
- Generación de reportes detallados
- Integración con Azure Document Intelligence y Perplexity AI

## Requisitos del Sistema
- Node.js v18 o superior
- npm v9 o superior
- Cuenta de Azure con Document Intelligence habilitado
- API Key de Perplexity AI

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Kikisafeia/ptsconia.git
   cd ptsconia
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega las siguientes variables:
     ```
     VITE_PERPLEXITY_API_KEY=tu_api_key_aqui
     VITE_AZURE_ENDPOINT=tu_endpoint_azure
     VITE_AZURE_KEY=tu_key_azure
     ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Uso

1. Sube un documento PTS en formato PDF
2. Selecciona el país de análisis
3. Revisa los resultados del análisis
4. Exporta el reporte generado

## Capturas de Pantalla

[Agrega capturas de pantalla de la aplicación aquí]

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
