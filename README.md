# SoftUni Angular Project

This project is prepared for deployment to Vercel.

## Structure

- Frontend Angular app: `carParts-project`
- Serverless API: `api/`

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Set the project root to the repository root.
4. Vercel will automatically detect the configuration from `vercel.json`.

## Local development

### Frontend

```bash
cd carParts-project
npm install
npm start
```

### API

```bash
npm install
npx vercel dev
```
