customElements.define('rocka-movie',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
    }

    styles(){
      return `
      <style>
      :host{
        padding: 1em;
      }

      :host .component{
        color: var(--color-secondary);
        max-width: 500px;
        background-color: var(--color-bg);
        border-radius: 0.5em;
        overflow: hidden;
        display: inline-block;
      }

      :host p{
        color: var(--color-soft);
        font-weight: 1.4em;
      }

      :host p.actors{
        color: var(--color-secondary);
      }

      :host img{
        float: left;
        margin-right: 1em;
        max-width: 250px;
      }

      :host .text{
        padding: 1em;
      }

      :host .action{
        color: var(--color-primary);
      }

      :host button{
        background-color: var(--color-primary);
        color: var(--color-soft);
        -webkit-appearance: none;
        border: none;
        padding: 0.5em 1em;
        border-radius: 0.5em;
      }
      </style>
      `
    }

    template(){
      let movie = app.getMovie(this.id);
      return `
      <div class="component" itemscope itemtype="http://schema.org/Movie">
        <img alt="${movie.title} Poster" title="${movie.title} Poster" src="${movie.poster}" itemprop="image">
        <div class="text">
          <h2 itemprop="name">${movie.title} (${movie.averageRating})</h2>
          <p class="info">
          ${(() => {
            if(movie.contentRating){
              return `
                <span itemprop="contentRating">${movie.contentRating}</span>
                <span>|<span>
              `
            }
            return ``;
          })()}
            ${(() => {
              if(movie.duration){
                return `
                  <span itemprop="duration">${this.getDuration(movie.duration)}</span>
                  <span>|<span>
                `
              }
              return ``;
            })()}
            <span class="itemprop" itemprop="genre">
              ${movie.genres.join('</span>, <span class="itemprop" itemprop="genre">')}
            </span>
            <span>|<span>
            <span itemprop="datePublished" class="action" onclick="app.byYear(this.innerText)">${movie.year}</span>
          </p>
          <p>${movie.description}</p>
          <p class="actors">
            <span class="itemprop action" itemprop="actors" onclick="app.byActor(this.innerText)">
              ${movie.actors.join('</span>, <span class="itemprop action" itemprop="actors" onclick="app.byActor(this.innerText)">')}
            </span>
          </p>
          <button onclick="app.suggestions('${movie.id}')">Suggestions</button>
        </div>
      <div>
      `
    }

    getDuration(duration){
      let h = parseInt(duration / 60)
      let m = duration % 60;
      return `${h}h ${m ? m+'min':''}`;
    }

    static get observedAttributes() {
      return ['id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.shadowRoot.innerHTML = this.styles() + this.template();
    }

  }
);
