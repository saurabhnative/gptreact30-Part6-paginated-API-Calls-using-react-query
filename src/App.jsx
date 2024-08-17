import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import CharacterList from './components/CharacterList';
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CharacterList />
      </QueryClientProvider>
    </>
  );
}

export default App;
