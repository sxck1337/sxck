class app {
    url = "https://api.quotable.io/random";
    theme = "dark";

    generateQuote = () => {
        fetch(this.url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                document.getElementById("quote").innerHTML = data.content;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getRepos = () => {
        // borrowed from https://github.com/znixbtw/znixbtw :) 
        $.ajax({
            url: 'https://api.github.com/users/sxck1337/repos?sort=pushed&per_page=9'
        }).done(function (data) {
            $.each(data, function (index, repo) {
                if (repo.name.includes("sxck1337")) return;
                $('#cards').append(
                    `
                        <div onclick="_app.openlink('${repo.html_url}')" style="max-height: 180px;" class="card magic-hover magic-hover__square">
                        <div style="padding-top: 35px; padding-left: 35px;" class="card-content">
                          <div class="card-info">
                            <div class="card-info-title">
                              <h3>${repo.name}</h3>  
                              <h4 id="desc" style="max-width: 200px;">${repo.description}</h4>
                            </div>    
                          </div>
          
                          <h4 id="language" style="max-width: 200px;  color: rgba(255, 255, 255, 0.5); font-size: 0.85em; position: absolute; bottom: 0; margin-bottom: 15px;">${repo.language}</h4>
                      </div>
                      </div>
                    `
                );
            });
        });

    }

    openlink(url) {
        window.open(url, '_blank');
    }

    constructor() {
        this.generateQuote(); // generate quote on page load

        this.getRepos(); // get repos on page load

        document.getElementById("cards").onmousemove = e => {
            for (const card of document.getElementsByClassName("card")) {
                const rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            };
        }

        document.documentElement.style.cursor = 'none';

    }
}

let _app = new app();

options = {
    "cursorOuter": "circle-basic",
    "hoverEffect": "pointer-blur",
    "hoverItemMove": false,
    "defaultCursor": false,
    "outerWidth": 41,
    "outerHeight": 41
};

magicMouse(options);