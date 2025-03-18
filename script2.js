document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const vinyl = document.getElementById("vinyl")
    const playButton = document.getElementById("play-button")
    const menuToggle = document.querySelector(".menu-toggle")
    const nav = document.querySelector(".main-nav")
    const navLinks = document.querySelectorAll(".main-nav ul li a")
    const audioPlayer = document.getElementById("audio-player")
    const header = document.querySelector(".main-header")
    let isPlaying = false
  
    // Lista de canciones (reemplaza estos nombres con los nombres reales de tus archivos)
    const songs = [
      "baby_demon.mp3",
      "baby_demon.mp3",
      "baby_demon.mp3",
      "https://github.com/1loro/anthony/blob/main/baby_demon.mp3",
      "https://github.com/1loro/anthony/blob/main/baby_demon.mp3",
    ]
  
    // Función para obtener una canción aleatoria
    function getRandomSong() {
      const randomIndex = Math.floor(Math.random() * songs.length)
      return songs[randomIndex]
    }
  
    // Función para alternar la reproducción de música y la animación del vinilo
    function togglePlayback() {
      if (isPlaying) {
        // Detener la reproducción y la animación
        vinyl.classList.remove("spinning")
        playButton.innerHTML = '<i class="fas fa-play"></i>'
        audioPlayer.pause()
      } else {
        // Iniciar la reproducción y la animación
        vinyl.classList.add("spinning")
        playButton.innerHTML = '<i class="fas fa-pause"></i>'
  
        // Seleccionar una canción aleatoria
        const randomSong = getRandomSong()
        audioPlayer.src = randomSong
  
        // Reproducir la canción
        audioPlayer.play().catch((error) => {
          console.error("Error al reproducir el audio:", error)
          // Si hay un error, revertir el estado visual
          vinyl.classList.remove("spinning")
          playButton.innerHTML = '<i class="fas fa-play"></i>'
          isPlaying = false
          return
        })
      }
      isPlaying = !isPlaying
    }
  
    // Event listener para el botón de reproducción
    playButton.addEventListener("click", togglePlayback)
  
    // Cuando la canción termina, detener la animación
    audioPlayer.addEventListener("ended", () => {
      vinyl.classList.remove("spinning")
      playButton.innerHTML = '<i class="fas fa-play"></i>'
      isPlaying = false
    })
  
    // Event listener para el menú móvil
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
      menuToggle.innerHTML = nav.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>'
  
      // Prevenir scroll cuando el menú está abierto
      if (nav.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    })
  
    // Cerrar el menú al hacer clic en un enlace
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
        document.body.style.overflow = ""
      })
    })
  
    // Cambiar el estilo del header al hacer scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.padding = "0.75rem 0"
        header.style.backgroundColor = "rgba(10, 0, 0, 0.95)"
      } else {
        header.style.padding = "1.25rem 0"
        header.style.backgroundColor = "rgba(10, 0, 0, 0.8)"
      }
    })
  
    // Animación de aparición para elementos al hacer scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const fadeElements = document.querySelectorAll(".fade-in")
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    // Añadir clase fade-in a elementos que queremos animar
    document
      .querySelectorAll(
        ".section-header, .stats-grid, .releases-grid, .testimonials-grid, .events-timeline, .contact-grid",
      )
      .forEach((el) => {
        el.classList.add("fade-in")
        observer.observe(el)
      })
  
    // Animación para las burbujas de artistas
    const artistBubbles = document.querySelectorAll(".artist-bubble")
    artistBubbles.forEach((bubble) => {
      bubble.addEventListener("mouseenter", function () {
        this.style.zIndex = "10"
      })
  
      bubble.addEventListener("mouseleave", function () {
        this.style.zIndex = "1"
      })
    })
  
    // Modal para el video
    const watchVideoBtn = document.getElementById("watch-video");
    if (watchVideoBtn) {
      watchVideoBtn.addEventListener("click", (e) => {
        e.preventDefault();
  
        // Crear modal para el video
        const modal = document.createElement("div");
        modal.className = "video-modal";
  
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
  
        const closeBtn = document.createElement("button");
        closeBtn.className = "close-modal";
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  
        const videoFrame = document.createElement("div");
        videoFrame.className = "video-frame";
        
        // Usar el video de Cloudinary en lugar del iframe de YouTube
        videoFrame.innerHTML = `
          <video width="100%" controls autoplay>
            <source src="https://res.cloudinary.com/dcuwwseta/video/upload/v1742242738/ic5hnjb1hodrjbms9roo.mp4" type="video/mp4">
            Tu navegador no soporta el elemento de video.
          </video>
        `;
  
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(videoFrame);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
  
        // Mostrar modal
        setTimeout(() => {
          modal.classList.add("active");
        }, 10);
  
        // Cerrar modal
        closeBtn.addEventListener("click", () => {
          modal.classList.remove("active");
          setTimeout(() => {
            document.body.removeChild(modal);
          }, 300);
        });
  
        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.classList.remove("active");
            setTimeout(() => {
              document.body.removeChild(modal);
            }, 300);
          }
        });
      });
    }
  
    // Añadir estilos para el modal de video
    const style = document.createElement("style")
    style.textContent = `
          .video-modal {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.9);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
              opacity: 0;
              visibility: hidden;
              transition: opacity 0.3s ease, visibility 0.3s ease;
          }
          
          .video-modal.active {
              opacity: 1;
              visibility: visible;
          }
          
          .modal-content {
              position: relative;
              width: 90%;
              max-width: 800px;
              background-color: var(--background-dark);
              border-radius: 12px;
              overflow: hidden;
              transform: scale(0.9);
              transition: transform 0.3s ease;
          }
          
          .video-modal.active .modal-content {
              transform: scale(1);
          }
          
          .close-modal {
              position: absolute;
              top: 10px;
              right: 10px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: var(--primary-color);
              color: var(--text-light);
              border: none;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              z-index: 1;
          }
          
          .video-frame {
              position: relative;
              padding-bottom: 56.25%;
              height: 0;
              overflow: hidden;
          }
          
          .video-frame iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
          }
      `
    document.head.appendChild(style)
  })
  
