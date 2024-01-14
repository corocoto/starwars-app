import { FC } from 'react';
// Libs
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import PageLayout from './components/PageLayout/PageLayout';

// Pages
import { CharactersListPage, CharacterPage } from './pages';
import CharacterPageDataWrapper from 'src/pages/CharacterPage/CharacterPageDataWrapper';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<CharactersListPage />} />
        </Route>
        <Route path="/characters/:id" element={<PageLayout />}>
          <Route
            index
            element={<CharacterPageDataWrapper>{props => <CharacterPage {...props} />}</CharacterPageDataWrapper>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

App.displayName = 'App';

export default App;
