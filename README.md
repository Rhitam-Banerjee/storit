# StorIt

StorIt is a cloud storage for file, where you can organise files and folders based on your priority and needs.
<br/>**Demo running on [vercel](https://storit-lac.vercel.app/)**
<br/>**Docker Image on [hub.docker](https://hub.docker.com/r/rhitamdev/storit)**

## Table of Contents

1. ⚙️ [Tech Stack](#tech-stack)
2. 📁 [Clone Repository](#clone)
3. 🗄️ [Enviornment Variables](#env) **[ Important ]**
4. 🖥️ [Setup without Docker](#setup)
5. 🐋 [Setup with Docker](#setup-docker)

## 🔗<a name="tech-stack">Tech Stack</a>

- [NextJs](https://nextjs.org/) - React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
- [ShadCn](https://ui.shadcn.com/) - a set of pre-designed components and a code distribution platform. Works with your favorite frameworks and AI models. Open Source. Open Code.
- [Zod](https://zod.dev/) - a typeScript validation library.
- [TailwindCss](https://tailwindcss.com/) - utility-first css framework to use pre-composed css classes, create and customize classes.
- [Clerk](https://clerk.com/) - fast, secure authentication platform.
- [ImageKit](https://imagekit.io/) - stores user files according as per user user folder structure created by user
- [Drizzle](https://orm.drizzle.team/) - lightweight, performant, typesafe, flexible and serverless-ready ORM by design
- [Neon](https://neon.com/) - serverless Postgres platform designed to help you build reliable and scalable applications faster
- [Docker](https://www.docker.com/) - Ensure consistent application performance across any environment, whether it’s on-premises Kubernetes or cloud platforms like AWS ECS, Azure ACI, and Google GKE.

## 🔗<a name="clone">Clone Repository</a>

```bash
git clone https://github.com/Rhitam-Banerjee/storit.git
cd storit
```

## 🔗<a name="env">Enviornment Variables</a>

**Create .env file using .env.example file inside root of the folder by filling values**

<details>
<summary> <code>.env.example</code></summary>

```bash
# clerk initialization
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database configuration
DATABASE_URL=

# Imagekit config
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=

# Next.js configuration ClERK
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

# Fallback URL for Clerk
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=
```

</details>

## 🔗<a name="setup">Setup without Docker</a>

**👉 Follow the below only if [nodejs](https://nodejs.org/en) is already setup in machine.**<br/>

**1. Install Dependencies**

```bash
npm i
```

**2. To run in Development mode**

```bash
npm run dev
```

**OR**

**2. To run in Production mode**

```bash
npm run build
npm start
```

## 🔗<a name="setup-docker">Setup with Docker</a>

**To run docker containers or images, download [docker](https://www.docker.com/)**

**Follow the below only if docker is already setup in machine and .env is created in step [2](#env)** <br/>

#### 1. Change the environment variables file location in compose.yaml

**In container.yaml remove the following**

```
env_file:
  - .env.example
```

#### 2. To build container and run in detach-mode

```bash
docker compose -f container.yaml up -d
```

#### 👉 ( Optional ) List Running containers

Created container should have image of `storit-app`

```bash
docker ps
```

#### 👉 ( Optional ) To stop and remove the built container

```bash
docker compose -f container.yaml down
```
