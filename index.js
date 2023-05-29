///************************************************************
///************************ index.js **************************
///************************************************************

///************************* Router ***************************

const home = { template: `<show-obras></show-obras>` };
const agregar = { template: `<nueva-obra></nueva-obra>` };

const routes = [
  { path: "/", component: home },
  { path: "/home", component: home },
  { path: "/agregar", component: agregar },
];

const router = new VueRouter({
  routes,
});

///************************ Vue object **************************

const app = new Vue({
  el: ".contenedor",
  router,
  data: {
    pagina: "",
    panelLoginVisible: false,
    mensaje: "Vamos a armar la aplicación en Vue modularmente",
    login: false,
    idCategoria: 0,
    //----------------------------------------------------------------
    //------------------------- CATEGORIAS ---------------------------
    categorias: [
      {
        id: 1,
        titulo: "Pintura",
        mensaje: "“Cuando miramos una obra de arte estamos sometidos al recuerdo de una multitud de cosas que para bien o para mal influyen sobre nuestros gustos“. (Gombrich)",
      },
      {
        id: 2,
        titulo: "Dibujo",
        mensaje:
          "“Se considera al dibujo como el lenguaje gráfico universal y ha sido utilizado por la humanidad para transmitir ideas, proyectos y en un sentido más amplio“.",
      },
      {
        id: 3,
        titulo: "Escultura",
        mensaje:
          "Incluye todas las artes de talla y cincel, junto con las de fundición y moldeado. ... “El escultor saca todo lo superfluo y reduce el material a la forma que existe dentro de la mente del artista“.",
      },
      {
        id: 4,
        titulo: "Fotografía",
        mensaje:
          "“La fotografia es un secreto de un secreto. Cuanto mas te dice, menos sabes“ (Diane Arbus).  «Lo más importante no es la cámara, sino el ojo.» (Alfred Eisenstaedt)",
      },
    ],

    //----------------------------------------------------------------
    //--------------------------- OBRAS ------------------------------
    catalogoObras: [
      {
        nombre: "Agoo",
        portada: "img/pin104.jpg",
        alt: "Pintura Agoo",
        categoria: "Pintura",
        categ: 1,
        anio: 1965,
        estilo: "Abstracción",
        autor: "Silva Carlos Ismael",
      },
      {
        nombre: "El conventillo",
        portada: "img/div201.jpg",
        alt: "Dibujo El conventillo",
        categoria: "Dibujo",
        categ: 2,
        anio: 1930,
        estilo: "Realismo",
        autor: "Facio Hebequer Guillermo",
      },
      {
        nombre: "El mudo",
        portada: "img/esc303.jpg",
        alt: "Dibujo El mudo",
        categoria: "Escultura",
        categ: 3,
        anio: 1973,
        estilo: "Nueva figuración",
        autor: "Distéfano Juan Carlos",
      },
      {
        nombre: "Buenos Aires nocturno",
        portada: "img/fot401.jpg",
        alt: "Fotografía Buenos Aires nocturno",
        categoria: "Fotografia",
        categ: 4,
        anio: 1936,
        estilo: "Realismo",
        autor: "Coppola Horacio",
      },
    ],

    //----------------------------------------------------------------
    //--------------------------- NAV BAR ----------------------------
    links: [
      { text: "Home", url: "home", enable: true, active: true },
      { text: "Agregar Obra", url: "agregar", enable: false, active: false },
    ],
  },

  //---------------------------------------------------
  //----------------- COMPONENTE ----------------------
  //---------------------------------------------------
  //--- hooks del CICLO DE VIDA: beforeCreate, created, BeforeMount, Mounted, beforeUpdate, updated, beforeDestroy, destroyed

  //--- beforeMount Invodado justo antes de que comience el montaje la función render está a punto de ser llamada por primera vez
  beforeMount() {
    console.log("Se va a montar el componente");
    if (localStorage.Catalogo) {
      this.catalogoObras = JSON.parse(localStorage.getItem("Catalogo"));
    }else{
        localStorage.setItem("Catalogo", JSON.stringify(this.catalogoObras));
    }
    if (localStorage.Categoria) {
      this.categorias = JSON.parse(localStorage.getItem("Categoria"));
    }else{
        localStorage.setItem("Categoria", JSON.stringify(this.categorias));
    }    
  },
  //Invocado después de que se ha montado la instancia, donde "el" se reemplaza por el reción creado vm.$el
  mounted() {
    console.log("Se ha montado el componente");
    //JSON.parse recibe por parámetro el string y devuelve un array
    const isLogin = JSON.parse(localStorage.getItem("login"));
    const mensaje = localStorage.getItem("mensaje");    
    if (mensaje) {
      this.mensaje = mensaje;
    }
    document.getElementById('Home').addEventListener("click",()=>{this.links[0].active=true;this.links[1].active=false;});
    document.getElementById('Agregar Obra').addEventListener("click",()=>{this.links[0].active=false;this.links[1].active=true;});  
    if (isLogin) {
      //"true", "false" -> true
      this.login = true;      
    }
    
    
  },
  //Invocado después de que una instancia de Vue ha sido destruida
  beforeDestroyed() {
    null;
  },

  //Invocado después de que una instancia de Vue ha sido destruida
  destroyed() {
    console.log("Se ha destruido el componente");
  },
  //Se invoca inmediatamente después de que se ha iniciado la instancia,
  //antes de la obseración de datos y la configuración de eventos y observadores
  beforeCreate() {
    console.log("Se ha creado el componente");
  },

  //----------------------------------------------------------------
  //--------------------------- MÉTODOS ----------------------------
  methods: {
    //----------------- INICIO SESION Y OPCIONES MENU ----------------
    authenticated(status) {
      if (status) {
        console.log("Se pudo loguear correctamente");              
      }      
    },
    mostrarPanelLogin() {
      this.panelLoginVisible = true;
    },
    ocultarPanelLogin() {
      this.panelLoginVisible = false;
    },

    iniciarSesion() {
      this.login = true;
      app.links[1].enable = this.login;
      localStorage.setItem("login", "true");
      this.ocultarPanelLogin();
      //primera vez
      //localStorage.setItem("mensaje", "Estoy cambiando el mensaje");
    },

    //-------------------- VERIFICA Inicio o Cierre ------------------
    toogleLogin() {
      if (!this.login) {
        // Si no está logueado
        this.mostrarPanelLogin();
      } else {
        console.log("Se ha cerrado la sesión");
        localStorage.setItem("login", "false");
        this.login = false;
        this.$router.push('/home');
        this.links[1].enable=false;
      }
    },

 
  },
});
