if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
      console.log("Worker Registered");
    } catch (resp) {
      console.log(resp);
    }
  });
}
const prompt = document.querySelector(".prompt");
const installButton = prompt.querySelector(".prompt__install");
const closeButton = prompt.querySelector(".prompt__close");
let deferredPrompt;

function getVisited() {
  return localStorage.getItem("install-prompt");
}

function setVisited() {
  localStorage.setItem("install-prompt", true);
}

self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  prompt.style.display = "block";
});

installButton.addEventListener("click", () => {
  // hide the prompt banner
  prompt.style.display = "none";
  console.log('install button clicked')

  // trigger the prompt to show to the user
  deferredPrompt.prompt();

  // check what choice the user made
  deferredPrompt.userChoice.then(choice => {
    // if the user declined, we don't want to show the button again
    // set localStorage to true
    if (choice.outcome !== "accepted") {
      setVisited();
    }

    deferredPrompt = null;
  });
});
/* btnAdd.addEventListener('click', event=>{
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice)=>{
          if(choice.outcome==='accepted')
              console.log('accepted to install');
      })
      deferredPrompt = null;
  }) */
