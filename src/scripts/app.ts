import "../styles/main.scss"

// -- core
import WindowAPP from "./Core/Window"

// -- additionnal
import HelloMe from "./Core/HelloMe"


class _APP {
  constructor() {
    this.core()
    this.app()

    this.additionnal()
  }
  
  core() {
    // very latest script 
    new WindowAPP() // all available states and variables
  }
  app() {
    // Site scripts
  }
  
  additionnal() {
    // very latest script 
    HelloMe() // VK console.log 
  }
}
new _APP()