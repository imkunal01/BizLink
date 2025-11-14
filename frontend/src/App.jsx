import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { store, persistor } from '@/store'
import { router } from '@/routes'
import ErrorBoundary from '@/components/feedback/ErrorBoundary'
import { useTheme } from '@/hooks/useTheme'

function App() {
  useTheme()

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            expand={false}
            richColors
            closeButton
            duration={4000}
          />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

export default App