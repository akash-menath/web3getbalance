import { useEffect, useState } from "react";
import { init, getOwnBlance } from "./web3Client";

function App() {
  const [minted, setMinted] = useState(false);
  const [balance, setBalance] = useState(false);

  const mint = () => {
    setMinted(true);
  };
  const fetchBalance = () => {
    getOwnBlance()
      .then((balance) => {
        setBalance(balance);
      })
      .catch((err) => {
        console.log('balance error',err);
      });
  };

  // useEffect(() => {
  //   init();
  // }, []);
  return (
    <div>
      {!minted ? (
        <button onClick={() => mint()}>mint Token</button>
      ) : (
        <p>token minted successfully</p>
      )}

      <p>your balance is :{balance}</p>
      <button onClick={() => fetchBalance()}>refresh</button>
    </div>
  );
}

export default App;
