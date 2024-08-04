import { CardList } from "./components/CardList";

function App() {
  return (
    <div>
      <header className="p-4 text-gray-500 text-xs max-w-screen-lg m-auto">
        Subly Technical Test - David Hignett
      </header>
      <CardList />
      <footer className="p-4 text-gray-500 text-xs max-w-screen-lg m-auto">
        <a href="https://www.flaticon.com/free-icons/alert" title="alert icons">Alert icons created by Pixel Buddha - Flaticon</a>
      </footer>
    </div>
  );
}

export default App;
