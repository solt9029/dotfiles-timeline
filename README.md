## dotfiles-timeline
### Overview
This service is connected to appwrite as an authentication server.
Users login to this service and uses a provider token to fetch dotfiles commits using GitHub API.

### Setup
- Launch appwrite server and create a project for this service.
- copy .env file and complete the environment variables.

```sh
yarn install
yarn dev
```

### Deploy
This service is deployed using vercel.
