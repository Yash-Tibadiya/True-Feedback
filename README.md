# True Feedback 🌍

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Deployed with Vercel](https://img.shields.io/badge/deployed%20with-vercel-%23000000.svg)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/lang-typescript-%23007ACC.svg)](https://www.typescriptlang.org/)

**Anonymous feedback made powerful and secure.**  
Empower your team with AI-driven insights while protecting privacy. Trusted by industry leaders and built for seamless integration.

---

![True Feedback Preview](https://img.enacton.com/ShareX/2025/03/Screenshot%202025-03-20%20143632.png)

![True Feedback Preview](https://github.com/Yash-Tibadiya/True-Feedback/blob/main/public/extra/s3.png)

![True Feedback Preview](https://img.enacton.com/ShareX/2025/03/Screenshot%202025-03-20%20143647.png)


## ✨ Features

### ⚡ Real-Time Feedback
- Collect and analyze feedback instantly with live updates and dashboards
- Drive immediate action with time-sensitive insights

### 💪 Enterprise-Grade Tools
- Advanced filtering and sentiment analysis
- Team collaboration features with role-based access

### 🔒 Military-Grade Security
- End-to-end encryption for all feedback
- Zero metadata retention policy

### 🤖 AI-Powered Insights
- Automated trend detection using OpenAI's GPT models
- Smart suggestions for process improvements

---

## 🛠 Tech Stack

| Component              | Technology                          |
|------------------------|-------------------------------------|
| **Frontend**           | Next.js 15, ShadCN UI, Tailwind CSS |
| **Authentication**     | NextAuth.js (OAuth 2.0 + JWT)       |
| **Database**           | MongoDB Atlas (NoSQL)               |
| **AI Integration**     | OpenAI GPT-4 Turbo                  |
| **Validation**         | Zod Schema Validation               |
| **Email Services**     | Resend Transactional Email          |
| **CI/CD**              | Vercel Edge Network                 |
| **Monitoring**         | Sentry Error Tracking               |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- MongoDB Atlas account
- OpenAI API key
- Resend API key

### Installation

```bash
git clone https://github.com/Yash-Tibadiya/True-Feedback.git
cd True-Feedback
bun install
```

## 🔧 Configuration

Create `.env` file in your project root:

```env
# Database Configuration
MONGODB_URI=""

# Authentication
NEXTAUTH_SECRET=

# Email Services
RESEND_API_KEY=""

# AI Services
OPENAI_API_KEY=
```

Running Locally
```bash
npm run dev
```
Visit http://localhost:3000

## 🌐 Deployment

### Vercel One-Click Deployment
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Yash-Tibadiya/True-Feedback)

### Manual Deployment Steps:
1. Fork repository
2. Connect to Vercel project
3. Configure environment variables:
   - **Required**: `MONGODB_URI`, `NEXTAUTH_SECRET`, `OPENAI_API_KEY`, `RESEND_API_KEY`
   - **Recommended**: Enable Vercel Analytics
4. Deploy!

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Development Standards:
- TypeScript strict mode enforced
- Prettier code formatting
- Conventional commits required
- 100% test coverage for new features

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## 📬 Contact

- Project Maintainer: Yash Tibadiya
- Email: tibadiyayash@gmail.com
- [GitHub Issues](https://github.com/Yash-Tibadiya/True-Feedback/issues)

## 🌟 Acknowledgements

- [OpenAI](https://openai.com/) for their cutting-edge language models
- [Vercel](https://vercel.com/) for seamless deployment experience
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for reliable database hosting
- [ShadCN UI](https://ui.shadcn.com/) community for component library
