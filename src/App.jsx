import DropdownContainer from "./components/DropdownContainer";
import DropdownErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className='dropdown-form'>
      <DropdownErrorBoundary>
        <h3 style={{marginTop:'120px'}}>Cloudfiles React Select Dropdown</h3>
        <DropdownContainer />
      </DropdownErrorBoundary>
    </div>
  );
}

export default App;
