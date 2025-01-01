import "./App.scss"
import { Header } from "./components/Header/Header.tsx"
import { Footer } from "./components/Footer/Footer.tsx"
import { Route, Routes } from "react-router-dom"
import { CreatePost } from "./pages/CreatePost/CreatePost/CreatePost.tsx"
import { Auth } from "./pages/Authorization/Auth.tsx"
import { ConfirmAuth } from "./pages/Authorization/ConfirmAuth.tsx"
import { Main } from "./pages/Main/Main/Main.tsx"
import { Account } from "./pages/Account/Account.tsx"
import { AuthFunctions, useAuth } from "./Hooks/Auth.tsx"
import { createContext, useEffect } from "react"
import { BottomMenu } from "./components/BottomMenu/BottomMenu.tsx"
import { Preloader } from "./components/Preloader/Preloader.tsx"
import { Provider } from "react-redux"
import { store } from "./store.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

const defaultUserContext: AuthFunctions = {
  getUser: async () =>
    console.log("attempting to use AuthContext outside of a valid provider"),
  signIn: async () =>
    console.log("attempting to use AuthContext outside of a valid provider"),
  signUp: async () =>
    console.log("attempting to use AuthContext outside of a valid provider"),
  getUserByEmail: async () =>
    console.log("attempting to use AuthContext outside of a valid provider"),
  logOut: async () =>
    console.log("attempting to use AuthContext outside of a valid provider"),
  User: null,
  isLoadingUser: false,
}
export const UserContext = createContext(defaultUserContext)

function App() {
  const {
    getUser,
    signIn,
    signUp,
    User,
    getUserByEmail,
    logOut,
    isLoadingUser,
  } = useAuth()

  useEffect(() => {
    if (!User) {
      getUser().catch(console.log)
    }
  }, [User, getUser])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <UserContext.Provider
          value={{
            getUser,
            signIn,
            signUp,
            User,
            getUserByEmail,
            logOut,
            isLoadingUser,
          }}
        >
          <Header />
          <div className="content">
            {isLoadingUser ? (
              <div className="content__preloader">
                <Preloader />
              </div>
            ) : (
              <Routes>
                <Route path="/*" element={<Main />} />
                {User ? (
                  <>
                    <Route path="/account/*" element={<Account />} />
                    <Route path="/create-post/*" element={<CreatePost />} />
                  </>
                ) : (
                  <>
                    <Route path="/auth/*" element={<Auth />} />
                    <Route path="/confirm-auth" element={<ConfirmAuth />} />
                  </>
                )}
                <Route path="*" element={<Main />} />
              </Routes>
            )}
          </div>
          <BottomMenu />
          <Footer />
        </UserContext.Provider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
