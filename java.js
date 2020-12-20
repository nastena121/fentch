
let body = document.body;
let name1 = 'nastena121';
let url = window.location.href;

let getName = (url) =>  {
	let g = url.split('=');
	let name = g[1];
	if (name == undefined) {
			name = name1;
	}
	return name;
}

fetch(`https://api.github.com/users/${getName(url)}`)
	.then(res => res.json())
	.then(json => {
   	let name = document.createElement('h1');
   	if (json.name != null) {
         name.innerHTML = json.name;
      } else {
         name.innerHTML = 'Информация о пользователе недоступна.';
      }
   	body.append(name);
   	name.addEventListener("click", () => window.location = json.html_url);
   	let description = document.createElement('p');
   	if (json.bio != null) {
         description.innerHTML = json.bio;
      } else {
         description.innerHTML = 'Информация о пользователе недоступна.';
      }
   	body.append(description);
   	let img = new Image();
   	img.src = json.avatar_url;
   	body.append(img);
	})
	.catch(err => console.log(err));
