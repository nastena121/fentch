let date = new Date();
let name1= 'nastena121';
let url = window.location.toString();

const getNameFromUrl = (url) => {
  let getUrl = url.split('=');
  let name = getUrl[1]; //
  if(name == undefined) {
    name = name1;
  }
  return name;
}

let userName = getNameFromUrl(url);

const getUser = new Promise((resolve,reject) => {
  setTimeout(() => userName ? resolve(userName) : reject(alert('Ошибка с пользователем')), 2000);
})

const getDate = new Promise((resolve,reject) => {
  setTimeout(() => date ? resolve(date) : reject('Ошибка с датой'), 3000);
})

Promise.all([getUser, getDate])
.then(([name, date]) => fetch(`https://api.github.com/users/${userName}`))
  .then((result) => {
    let preloader = document.getElementById("preloader");
    if (result.ok) {
      return result.json();
    } else {
      loading = false;
      alert('Информация о пользователе недоступна');
      let error = new Error(result.statusText);
      error.response = result;
      throw error;
    }
    document.body.classList.remove('loading');
  })
  .then(json => {
    console.log(json);

    preloader.classList.add('loaded');

    let img = new Image();
    img.src = json.avatar_url;
    img.className = 'img';
    document.body.append(img);

    let wrap = document.createElement('div');
    wrap.className='wrap';
    let name = document.createElement('a');
    name.className = 'name';
    name.href = `https://https://github.com/?username=${json.login}`;
    name.innerHTML = json.name;
    document.body.append(wrap);
    if (json.name != null) {
      document.querySelector('.wrap').append(name);
    } else {
      document.querySelector('.wrap').append('У пользователя нет имени!');
    }

    let bio = document.createElement('div');
    bio.className = 'bio';
    bio.innerHTML = json.bio;
    if (json.bio != null) {
      document.body.append(bio);
    } else {
      document.body.append('Нет информации о пользователе');
    }

    let currentDate = document.createElement('footer');
    currentDate.innerHTML = `На дату: ${date.toLocaleDateString()}`;
    document.body.append(currentDate);
  })
  .catch(error => console.log(error));
