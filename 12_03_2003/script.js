const DekaTutorial = (nama, foto, ucapan, musik, noWhatsapp) => {
  const audio = new Audio(musik);
  audio.loop = true;
  audio.autoplay = true;

  const linkRoot = "https://dekatutorial.github.io/brd/";
  const container = document.querySelector(".container");

  const targetConten2 = document.querySelector(".content1");
  container.scrollTop = targetConten2.offsetTop;
  // ===================
  const content1 = document.querySelector(".content1");
  const content2 = document.querySelector(".content2");
  const paperContainer = document.querySelector(".paper-container");
  const klikMe = document.querySelector("#klikaku");
  const waBtn = document.querySelector("#wa");
  //   Elemen Star Kelip-kelip
  const starC = document.createElement("div");
  starC.classList.add("star");
  starC.innerHTML = `
<div class="star">
    <img style="--s: 1s" src="${linkRoot}bintang biru.svg" />
    <img style="--s: 2s" src="${linkRoot}bintang biru.svg" />
    <img style="--s: 3s" src="${linkRoot}bintang biru.svg" />
    <img style="--s: 2s" src="${linkRoot}bintang biru.svg" />
    <img style="--s: 3s" src="${linkRoot}bintang biru.svg" />
    <img style="--s: 1s" src="${linkRoot}bintang biru.svg" />
    <img style="--s: 3s" src="${linkRoot}bintang putih.svg" />
    <img style="--s: 2s" src="${linkRoot}bintang putih.svg" />
    <img style="--s: 3" src="${linkRoot}bintang putih.svg" />
    <img style="--s: 2s" src="${linkRoot}bintang putih.svg" />
</div>`;

  content1.appendChild(starC);

  //   Elemen Foto
  const fotoC = document.createElement("div");
  fotoC.classList.add("foto");
  // fotoC.style = `background-image: url('${foto}')`;
  fotoC.innerHTML = `
<img src="${linkRoot}bunga1.svg" />
<img src="${linkRoot}bunga2.svg" />`;

  content1.insertBefore(fotoC, klikMe);

  //   Elemen Nama
  const nameC = document.createElement("div");
  nameC.classList.add("name");
  nameC.innerHTML = `<h3>${nama}</h3>`;

  content1.insertBefore(nameC, klikMe);

  //   Elemen Tambahan Content2
  const elemC2 = document.createElement("div");
  elemC2.innerHTML = `
<img class="uwel" src="${linkRoot}uwel.svg" />
<img class="uwel" src="${linkRoot}uwel.svg" />
<img class="trompet1" src="${linkRoot}trompet.svg" />
<img class="trompet2" src="${linkRoot}trompet.svg" />
<img class="str1" src="${linkRoot}str.webp" />
<img class="str2" src="${linkRoot}str.webp" />`;

  content2.insertBefore(elemC2, paperContainer);

  const heightV = document.querySelector(".content1").clientHeight - 150;
  const heightSisa = heightV % 30;
  const heightResult = heightV - heightSisa;

  //   Elemen Paper Content
  const paperC = document.createElement("div");
  paperC.classList.add("paper");
  paperC.style = `height: ${heightResult}px;`;
  paperC.innerHTML = `
<div class="paper-content">
    <textarea id="typepaper" disabled></textarea>
</div>`;

  paperContainer.insertBefore(paperC, waBtn);

  klikMe.addEventListener("click", () => {
    const targetContent = document.querySelector(".content2");
    container.scrollTop = targetContent.offsetTop;
    setTimeout(() => {
      content2.classList.add("show");
    }, 500);
    setTimeout(() => {
      ketikk(ucapan, "#typepaper", () => {});
    }, 1000);
  });
  function start() {
    audio.play();
    const open = document.querySelector(".open");
    open.style = "transition: .5s ease-out all; opacity: 0; transform: translateY(-100%);";
    setTimeout(() => {
      open.remove();
      content1.classList.add("show");
    }, 500);
  }

  document.querySelector(".mail").onclick = start;

  var swalo = Swal.mixin({ allowOutsideClick: false, confirmButtonText: "OK" });
  async function kirimpesan() {
    var { value: pesanku } = await swalo.fire({ title: "Tulis pesan", input: "textarea", confirmButtonText: "Kirim" });
    if (pesanku) {
      await swalo.fire("Kirim pesannya ke wa aku ya");
      if (!noWhatsapp.startsWith("62")) {
        noWhatsapp = ``;
      }
      location.assign(`https://wa.me/${noWhatsapp}?text=${pesanku}`);
    } else {
      await swalo.fire({ title: "Jangan dikosongin ya" });
      kirimpesan();
    }
  }

  document.querySelector("#wa").onclick = kirimPesannn;

  const bgC = document.querySelector(".foto");
  let indBgC = 0;
  function createBg() {
    foto.forEach((element) => {
      const bgI = document.createElement("div");
      if (indBgC == 0) {
        bgI.classList.add("show");
        indBgC++;
      }
      bgI.style.backgroundImage = `url('${element}')`;
      bgC.appendChild(bgI);
    });
  }

  createBg();

  const bgItem = document.querySelector(".foto").querySelectorAll("div");

  let indBgNext = 1;
  let interv = 2000;
  let activ = false;
  function nextBg() {
    if (!activ) {
      if (indBgNext == bgItem.length - 1) {
        activ = true;
        bgItem[indBgNext].classList.add("show");
        setTimeout(() => {
          for (let i = 1; i < bgItem.length - 1; i++) {
            bgItem[i].classList.remove("show");
          }
        }, 1000);
        setTimeout(() => {
          bgItem[indBgNext].classList.remove("show");
          indBgNext = 1;
          activ = false;
        }, interv);
      } else if (indBgNext < bgItem.length) {
        bgItem[indBgNext].classList.add("show");
        indBgNext++;
        if (indBgNext == bgItem.length) {
          indBgNext = 1;
        }
      }
    }
  }
  if (foto.length > 1) {
    setInterval(() => {
      nextBg();
    }, interv);
  }

  window.onload = () => {
    const preload = document.querySelector(".preload");
    preload.style = "transition: 1s ease-out all; opacity: 0";
    setTimeout(() => {
      preload.remove();
    }, 1000);
  };
};

function ketikk(text, elem, next) {
  let i = 0;
  const speed = 80;
  typeWriter(text, elem);
  function typeWriter(text, elem) {
    let element = document.querySelector(elem);
    if (i < text.length) {
      let char = text.charAt(i);
      element.innerHTML += char;
      i++;
      setTimeout(() => {
        typeWriter(text, elem);
      }, speed);
      element.scrollTop = element.scrollHeight;
    } else {
      next();
    }
  }
}

DekaTutorial(nama, foto, ucapan, musik, noWhatsapp);
