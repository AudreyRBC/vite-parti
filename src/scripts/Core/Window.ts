import { debounce } from "../_helpers";

class WindowAPP {
  root: HTMLElement;
  cRoot: CSSStyleDeclaration;
  // WindowProps
  width: number;
  height: number;

  onResizeEvent: CustomEvent;

  isHoverable: boolean;
  isTouchScreen: boolean;

  isPortrait: boolean;

  // GridProps
  originWidth: number;
  originMargin: number;

  columnsCount: number;
  columnsSize: number;
  columnsGap: number;
  margin: number;

  constructor() {
    this.root = document.querySelector(":root")!;
    this.cRoot = getComputedStyle(this.root);
    this.width = parseInt(this.cRoot.getPropertyValue("--width"));

    this.onResizeEvent = new CustomEvent("resized", { detail: {} });

    this.height = 0;

    this.isHoverable = false;
    this.isTouchScreen = false;

    this.isPortrait = false;

    // GridProps
    this.originWidth = 0;
    this.originMargin = 0;

    this.columnsCount = 0;
    this.columnsSize = 0;
    this.columnsGap = 0;
    this.margin = 0;

    this.bindEvents();
  }

  getOriginVariables() {
    this.originWidth = parseInt(this.cRoot.getPropertyValue("--origin-width"));
    this.originMargin = parseInt(
      this.cRoot.getPropertyValue("--origin-margin")
    );

    this.columnsGap = parseInt(this.cRoot.getPropertyValue("--columns-gap"));
    this.columnsCount = parseInt(
      this.cRoot.getPropertyValue("--columns-count")
    );
  }

  getVariable() {
    this.width = window.innerWidth - (window.innerWidth - document.body.clientWidth);;
    this.height = window.innerHeight;

    this.isHoverable = window.matchMedia("(hover: hover)").matches;
    this.isTouchScreen = "ontouchstart" in window;

    this.isPortrait = window.innerWidth > window.innerHeight;

    this.margin = +(
      (+this.originMargin / this.originWidth) *
      this.width
    ).toFixed(2);

    this.columnsSize = +(
      (this.width - (this.margin * 2) - (this.columnsGap * (this.columnsCount - 1))) / this.columnsCount
    ).toFixed(2);
  }

  setVariable() {
    this.root.style.setProperty("--touchscreen", `${this.isTouchScreen}`);

    this.root.style.setProperty("--width", `${this.width}px`);
    this.root.style.setProperty("--widthNoUnit", `${this.width}`);
    this.root.style.setProperty("--height", `${this.height}px`);

    this.root.style.setProperty("--margin", `${this.margin}px`);
    this.root.style.setProperty("--columns-size", `${this.columnsSize}px`);
  }

  _onResize() {
    if (this.width == window.innerWidth) return

    this.getOriginVariables();
    this.getVariable();
    this.setVariable();

    window.dispatchEvent(this.onResizeEvent);
  }

  bindEvents() {
    window.addEventListener("resize", debounce(this._onResize.bind(this), 150));
  }
}

export default WindowAPP;
