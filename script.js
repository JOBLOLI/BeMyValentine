const gallery = document.getElementById("gallery");

    const totalDurationSec = 32; 
    const animMs = 900;                
    const dropToBackAtMs = 520;         

    const fixedRotations = [6, -6, 8, -8, 5, -5, 7, -7];
    [...gallery.children].forEach((img, i) => {
      img.dataset.rot = fixedRotations[i % fixedRotations.length];
      img.style.setProperty("--r", img.dataset.rot + "deg");
    });

    function restack() {
    const imgs = [...gallery.children];
    const n = imgs.length;
    const mid = (n - 1) / 2;

    imgs.forEach((img, i) => {
      img.style.zIndex = String(n - i);

    const offset = (i - mid) * 1.2;
      img.style.setProperty("--dx", offset + "px");
      img.style.setProperty("--dy", offset + "px");

      img.classList.remove("to-back", "behind");
    });
    }

    restack();

    let busy = false;

    function cycleOnce() {
      if (busy) return;
      busy = true;

      const first = gallery.firstElementChild;
      if (!first) return;

      first.classList.add("to-back");

      const dropTimer = setTimeout(() => {
        first.classList.add("behind");
      }, dropToBackAtMs);

      setTimeout(() => {
        clearTimeout(dropTimer);

        first.classList.remove("to-back", "behind");
        gallery.appendChild(first); 
        restack();

        busy = false;
      }, animMs);
    }

    setTimeout(() => {
      cycleOnce();
      const stepMs = (totalDurationSec * 1000) / gallery.children.length;
      setInterval(cycleOnce, stepMs);
    }, 700);