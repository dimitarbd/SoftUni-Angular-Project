# Azure deployment guide

## Prerequisites

1. Create a GitHub repository and push this project there.
2. Create an Azure Static Web App for the frontend.
3. Create an Azure Web App for the backend.
4. Add the following GitHub secrets:
   - AZURE_STATIC_WEB_APPS_API_TOKEN
   - AZURE_WEBAPP_NAME
   - AZURE_WEBAPP_PUBLISH_PROFILE

## Backend deployment notes

The Node server already uses:
- `process.env.PORT` for the listening port
- `npm start` to start the app

This is compatible with Azure Web App.

## Frontend deployment notes

The Angular app is built into:
- `carParts-project/dist/car-parts-project/browser`

The workflow deploys that folder to Azure Static Web Apps.

## Manual deployment fallback

If you want to deploy manually, run:

```bash
cd carParts-project
npm ci
npm run build
```

And upload the contents of:

```bash
carParts-project/dist/car-parts-project/browser
```

to your Azure Static Web App.
