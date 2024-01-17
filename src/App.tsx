import { FC } from 'react';

// Libs
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

// Components
import { ErrorFallback, PageLayout } from 'src/components';
import CharacterPageDataWrapper from 'src/pages/CharacterPage/CharacterPageDataWrapper';

// Pages
import { CharactersListPage, CharacterPage } from './pages';

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

export default withErrorBoundary(App, {
  FallbackComponent: ErrorFallback,
  onError: (error: Error) => console.log(error)
});
