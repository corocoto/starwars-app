// Libs
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Components
import PageLayout from './components/PageLayout/PageLayout'

// Pages
import CharacterPage from './pages/CharacterPage'
import { CharactersListPage } from './pages'

function App() {
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

export default App
