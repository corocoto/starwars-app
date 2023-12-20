import { FC } from 'react'
// Libs
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Components
import PageLayout from './components/PageLayout/PageLayout'

// Pages
import { CharactersListPage, CharacterPage } from './pages'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<CharactersListPage />} />
        </Route>
        <Route path="/characters/:id" element={<PageLayout />}>
          <Route index element={<CharacterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

App.displayName = 'App'

export default App