class Collapse {
  $el: HTMLElement
  $action: HTMLElement
  $target: HTMLElement

  open: boolean

  spacing: number
  height: number

  animation: any;
  state: any;

  constructor({ $el }: { $el: HTMLElement }) {
    this.$el = $el
    this.$action = $el.querySelector('[data-collapse-action]') ?? $el
    this.$target = $el.querySelector('[data-collapse-target]')!

    this.spacing = 0
    this.open = false
    this.state = this.defaultState
    this.animation = this.defaultAnimation

    this.height = 0
    
    this.init()
    this.bindEvents()
  }

  /**
   * Initializes the Collapse component by calculating the height and setting the initial state.
   */
  init() {
    this.height = this.$target.scrollHeight + this.spacing
    this.$el.style.setProperty('--height', `151px`);
    this.state()
  }

  /**
   * Binds the click and resize events to the Collapse component.
   */
  bindEvents() {
    this.$action.addEventListener('click', () => this._onClick())
    window.addEventListener('resized', () => this._onResize())
  }

  /**
   * Handles the click event on the Collapse component, toggling the open state and triggering the animation.
   * @param evt - The click event.
   */

  _onClick() {
    this.open = !this.open

    this.$el.classList.toggle('open')
    this.$el.style.setProperty('--height', `${this.open ? this.height : 151}px`);

    if(this.open) {
      const top = this.$el.getBoundingClientRect().y + window.scrollY - 200
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
    // this.animation()
    const _onResize = new CustomEvent("resizedIframe");

    window.parent.document.dispatchEvent(_onResize)

  }

  /**
   * Sets the default state of the Collapse component using gsap.set().
   * @returns {object} - The gsap.set() configuration object.
   */
  defaultState() {
    // return gsap.set(this.$target, {
    //   height: this.open ? this.height : 151,
    //   duration: .4,
    //   ease: 'expo.inOut'
    // })
  }

  /**
   * Sets the default animation of the Collapse component using gsap.to().
   * @returns {object} - The gsap.to() configuration object.
   */
  defaultAnimation() {
    // return gsap.to(this.$target, {
    //   height: this.open ? this.height : 151,
    //   duration: .4,
    //   ease: 'expo.inOut'
    // })
  }

  /**
   * Handles the resize event on the window, recalculating the height and resetting the open state.
   * @param evt - The resize event.
   */
  _onResize() {
    this.height = this.$target.scrollHeight + this.spacing
    this.open = false
    this.$el.style.setProperty('--height', `${this.open ? this.height : 151}px`);
  }
}

export default Collapse