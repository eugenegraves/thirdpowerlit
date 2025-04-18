# Third Power Lit

This is the official website for Third Power Lit, offering creative services including web development, UI/UX design, photography, and photo editing.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment with Vercel

This project is set up for continuous deployment to Vercel using GitHub Actions.

### Setting Up Vercel Deployment

1. **Create a Vercel Account and Project**
   - Sign up at [vercel.com](https://vercel.com)
   - Create a new project and link it to your GitHub repository
   - Complete the initial deployment through the Vercel dashboard

2. **Get Vercel Tokens and IDs**
   - Go to your Vercel account settings
   - Generate a new token in the "Tokens" tab
   - Note down your Vercel Organization ID and Project ID from your project settings

3. **Configure GitHub Secrets**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets > Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel token
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID

4. **Deploy**
   - The GitHub Actions workflow will automatically deploy your project to Vercel whenever you push to the main branch
   - You can also trigger manual deployments from the GitHub Actions tab

## CI/CD Pipeline

The CI/CD pipeline consists of:

1. **Continuous Integration**
   - Code is automatically tested on every push
   - Dependencies are installed and the project is built

2. **Continuous Deployment**
   - Successful builds on the main branch are automatically deployed to Vercel
   - Preview deployments are created for pull requests

The workflow is defined in `.github/workflows/vercel-deploy.yml`.

## Project Structure

- `/src`: Source code
  - `/components`: React components
  - `/pages`: Page components
  - `/assets`: Images and static assets
  - `/utils`: Utility functions
- `/public`: Static files

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
