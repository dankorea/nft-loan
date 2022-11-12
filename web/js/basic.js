window.onload = async () => {
  const { ethereum } = window;

  if (ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      getUserBasicInfo();
    } catch (error) {
      console.log("get user info error");
    }
  } else {
    alert("Please install MetaMask Extension in your browser");
  }

  document.querySelectorAll(".loginBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const isLoggedIn = window.userAddress ? true : false;
      console.log("clicked", window.userAddress, isLoggedIn);
      if (isLoggedIn) {
        logOutClicked();
      } else {
        loginClicked();
      }
    });
  });

  function setUserInfo() {
    const main = document.getElementById("main");
    const isLoggedIn = window.userAddress ? true : false;
    console.log(isLoggedIn);
    document.querySelectorAll(".loginBtn").forEach((btn) => {
      if (isLoggedIn) {
        btn.innerText = "Logout";
        main.classList.remove("hidden");
      } else {
        btn.innerText = "Login";
        main.classList.add("hidden");
      }
    });
  }

  async function getUserBasicInfo() {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    if (accounts && accounts[0]) window.userAddress = accounts[0];
    document.getElementById("address").innerText = accounts[0];
    const ethBalance = fromWei(balance);
    document.getElementById("balance").innerText = `${ethBalance} ETH`;
    setUserInfo();
  }

  async function loginClicked() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    window.userAddress = accounts[0];
    await getUserBasicInfo();
    setUserInfo();
  }

  async function logOutClicked() {
    window.userAddress = null;
    document.getElementById("Address").innerText = "";
    setUserInfo();
  }
};
