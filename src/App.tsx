import Form from "./components/Form";

function App() {
  const gbAddr = {
    line1: "123 Main Street",
    line2: "",
    country: "United Kingdom",
    postCode: "SW1A 1AA",
  };

  const frAddr = {
    line1: "123 Rue de la République",
    country: "France",
    postCode: "75001",
  };

  return (
    <main>
      <Form />
    </main>
  );
}

export default App;
