
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

    switchTheme = () => {
        if (this.theme === "dark") {
            this.theme = "light";
            document.getElementById("body").setAttribute("data-theme", "light");
        } 
        else {
            this.theme = "dark";
            document.getElementById("body").setAttribute("data-theme", "dracula");
        }
        localStorage.setItem('theme', this.theme);
    }

    getRepos = () => {
        // borrowed from https://github.com/znixbtw/znixbtw :) 
        $.ajax({
			url: 'https://api.github.com/users/sxck1337/repos?sort=pushed&per_page=9'
		}).done(function (data) {
			$.each(data, function (index, repo) {
                if(repo.name.includes("sxck1337")) return;
				$('#repos').append(
						`
                        <div class="card bg-base-300 shadow-xl repo">
                            <div class="card-body">
                                <a href="${repo.html_url}" class="card-title text-base-content">${repo.name}</a>
                                <p id="description" style="max-width: 250px;" class="text-base-content opacity-60">${repo.description}</p>
                                <span style="display: block!important; position: absolute; right: 30; top: 35;" class="px-3 py-1 text-xs uppercase rounded-full bg-primary text-base-300">${repo.language}</span>
                            </div>
                        </div>
                    `
				);
			});
		});

    }

    constructor() {
        this.generateQuote(); // generate quote on page load

        setTimeout(() => {
            if(localStorage.getItem('theme') === "light") { // check if theme is light or dark and set it accordingly on page load
                this.theme = "light";
                document.getElementById("body").setAttribute("data-theme", "light");
            }
            document.getElementById("theme-switch").addEventListener("click", this.switchTheme); // switch theme on click

            this.getRepos(); // get repos on page load
        }, 500);
    }
}

new app();




/*

    

*/