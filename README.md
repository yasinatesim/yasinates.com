

<h3 align="center">
  <br>
  <a href="https://github.com/yasinatesim/yasinates.com"><img src="./public/yasinates-com-logo.png" alt="yasinates.com" width="200"></a>
  <br>
  yasinates.com | Personal Website
  <br>
</h3>
<hr>
<p align="center">This project is my personal website. My articles on medium.com and dev.to are here 😎</p>

<p align="center">
    <img src="https://img.shields.io/github/license/yasinatesim/yasinates.com?color=%23303036&style=flat-square"
         alt="License">
<a href="https://www.linkedin.com/in/yasinatesim"><img src="https://img.shields.io/badge/Linkedin-%23303036?logo=linkedin&color=%23303036&style=flat-square"></a>
<a href="https://www.instagram.com/codewith_yasinatesim"><img src="https://img.shields.io/badge/Instagram-%23303036?logo=instagram&color=%23303036&style=flat-square"></a>
</p>

  <p align="center">
    · <a href="http://yasinates.com/">View Website</a>
  </p>
</p>

## 📖 About

<img src="https://miro.medium.com/max/2560/1*_0nqztZ1oZQEdNILB1UhnA.jpeg" alt="yasinates.com">

This project is my personal website. My articles on Medium and dev.to are here 😎. My repositories on github are here too. 😋

### 💡Idea
I wanted to **create a copy** of my Github repositories, Medium and dev.to articles and show them on my website.

I wanted to copy it, I wrote the data to static json files, using Next.js's [Static Site Generator](https://www.staticgen.com) feature, requesting the APIs of Github, Medium and dev.to. After publish a new github repository or article. I am making requests to APIs on my Admin panel, with my admin panel I only send requests to APIs when I share a github repository or an article, I don't always send request the APIs.   So my website opens very fast. 💪

### 📚Tech Stack

<table>
<tr>
<td>
<a  href="https://nextjs.org/">Next.js</a>
</td>
<td>Requesting the APIs of Github, Medium and dev.to</td>
</tr>
<tr>
<td>
<a href="https://github.com/conventional-changelog/commitlint">Commitlint</a>
</td>
<td>Send commit messages to <a  href="https://www.conventionalcommits.org/en/v1.0.0/">conventional commits</a> rules</td>
</tr>
<tr>
<td>
<a href="https://github.com/css-modules/css-modules">CSS Module</a>
</td>
<td>Class names and animation names are scoped locally CSS files</td>
</tr>
<tr>
<td>
<a href="https://sass-lang.com/](https://sass-lang.com/">SASS</a>
</td>
<td>The most mature, stable, and powerful professional grade CSS extension language in the world</td>
</tr>
<tr>
<td>
<a  href="https://editorconfig.org/">Editorconfig</a>
</td>
<td>Helps maintain consistent coding styles for my working on the same project across various editors and IDEs</td>
</tr>
<tr>
<td>
<a  href="https://eslint.org/">Eslint</a>
</td>
<td>Find and fix problems in your JavaScript code</td>
</tr>
<tr>
<td>
<a  href="https://prettier.io/">Prettier</a>
</td>
<td>An opinionated code formatter</td>
</tr>
</table>


## Getting Started

###  📦 Prerequisites

- Node (v12.0.0+)
- Npm (v6.00+)

### ⚙️ How To Use

 1. Clone this repository

```bash
git clone https://github.com/yasinatesim/yasinates.com.git
```

 2. Add `.env` file on root
```bash
NEXT_PUBLIC_MEDIUM_URL =  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@{{medium-username}}'
NEXT_PUBLIC_DEV_URL =  'https://dev.to/api/articles'
NEXT_PUBLIC_DEV_USERNAME =  '?username={{dev-username}}'
NEXT_PUBLIC_GITHUB_URL =  'https://api.github.com/users/{{github-username}}/repos'
NEXT_PUBLIC_POSTS_API_URL =  'http://localhost:3000/api/posts'
NEXT_PUBLIC_REPOS_API_URL =  'http://localhost:3000/api/repos'
NEXT_PUBLIC_ADMIN_PASSWORD =  '{{your-admin-password}}'
NEXT_PUBLIC_GH_USERNAME =  '{{your-github-username}}'
NEXT_PUBLIC_GH_TOKEN =  '{{your-github-access-token}}'
NEXT_PUBLIC_GH_REPOSITORY =  'https://api.github.com/repos/{{your-github-username}}/{{your-github-repository}}'
```

> You can create your `NEXT_PUBLIC_ADMIN_PASSWORD` with the `Encrypt` function,

**Usage the `Encrypt` function**

Go to the `pages/admin/index.js` file and write this in the render function
```js
{Encrypt('{{ your admin password }}')}
```
*Note:  Don't forget to delete the encrypt function added 🤣*

 3. Install the project dependencies
```bash
yarn install
```
**For Development**
```bash
yarn dev
```

**For Production Build & Build Start**
```bash
yarn build
```

and

```bash
yarn start
```

**For Export [SSG](https://www.staticgen.com/)**
```bash
yarn export
```

**For Lint & Format**
```bash
yarn lint
yarn format
```

## 🔑 License
* Copyright © 2020 - MIT License.
See `LICENSE` for more information.
