import DropdownContainer from "./components/DropdownContainer";
import DropdownErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className='dropdown-form'>
      <DropdownErrorBoundary>
        <h4>Cloudfiles React Select Dropdown</h4>
        <DropdownContainer />
      </DropdownErrorBoundary>
    </div>
  );
}

export default App;
