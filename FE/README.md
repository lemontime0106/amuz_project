# [AMUZ_Todolist](https://amuz-project.vercel.app/) (Vercel 배포 사이트)

## 소개
Vue3 + Firebase 기반으로 제작한 Todolist

## 구현 사항
회원가입 및 로그인 (Firebase Authentication) <br>
To-Do 리스트 CRUD (추가, 수정, 삭제, 이동) <br>
로그인한 유저별 데이터 저장 (Firestore 연동) <br>
Pinia를 활용한 상태 관리

## 사용 기술
Frontend: Vue 3, Pinia, Tailwind CSS <br>
Backend: Firebase Firestore, Firebase Authentication <br>
State Management: Pinia <br>
Hosting: Vercel (배포) 

```
구동 방법
1. git clone https://github.com/lemontime0106/amuz_project.git
2. cd amuz_project/FE
3. npm install
4. npm run dev
5. http://localhost:5173 접속
```

### 폴더 구조
```
📦src
 ┣ 📂assets
 ┃ ┗ 📂fonts
 ┃ ┃ ┗ 📜PretendardVariable.woff2
 ┣ 📂components
 ┃ ┣ 📂home
 ┃ ┃ ┗ 📜Landing.vue
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜AuthForm.vue
 ┃ ┃ ┗ 📜LoginForm.vue
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜SignUpForm.vue
 ┃ ┗ 📂usertodo
 ┃ ┃ ┣ 📜AddTodoForm.vue
 ┃ ┃ ┣ 📜EditTodoForm.vue
 ┃ ┃ ┣ 📜ListHeader.vue
 ┃ ┃ ┣ 📜Modal.vue
 ┃ ┃ ┣ 📜TodoHeader.vue
 ┃ ┃ ┣ 📜TodoItems.vue
 ┃ ┃ ┗ 📜Todolist.vue
 ┣ 📂layout
 ┃ ┣ 📜MyFooter.vue
 ┃ ┗ 📜Navbar.vue
 ┣ 📂router
 ┃ ┗ 📜index.js
 ┣ 📂store
 ┃ ┣ 📜useAuthStore.js
 ┃ ┗ 📜useTodoStore.js
 ┣ 📂views
 ┃ ┣ 📜HomeView.vue
 ┃ ┣ 📜LoginView.vue
 ┃ ┣ 📜SignUpView.vue
 ┃ ┗ 📜UserTodoView.vue
 ┣ 📜App.vue
 ┣ 📜firebaseConfig.js
 ┣ 📜main.js
 ┗ 📜style.css
```

