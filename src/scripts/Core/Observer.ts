type El = Element & {
  dataset?: {
    observer: string
  };
};

class Observer {
  $els: NodeListOf<El>;

  constructor({ $els }: { $els: NodeListOf<El> }) {
    this.$els = $els;
    let options = {
      // root: null,
      // rootMargin: "0px",
      threshold: 0,
    }; 

    const onAppear = new CustomEvent("appear", { detail: {} });
    const onVisible = new CustomEvent("visible", { detail: {} });
    const onHidden = new CustomEvent("hidden", { detail: {} });

    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains('--appear')) {
            const target = entry.target as El

            target.dispatchEvent(onAppear);
            target.classList.add('--appear')
            if(target?.dataset?.observer === "appear") observer.unobserve(entry.target)
          } else {
            entry.target.dispatchEvent(onVisible);
          }          
        } else {
          entry.target.dispatchEvent(onHidden);
        }
      })
    }

    let observer = new IntersectionObserver(callback, options);

    this.$els.forEach($el => observer.observe($el));
  }
}

export default Observer