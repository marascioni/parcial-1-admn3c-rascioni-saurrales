///************************************************************
///********************** nueva-obra.js ***********************
///****************** AGREGA UNA NUEVA OBRA *******************
///************************************************************
// COMPONENTE Vue.component para registrar el componente, pasar etiqueta(nombre del componente) y constructor (opciones)

Vue.component("nueva-obra", {
  data: function () {
    return {
      tituloObra: "",
      errorTitulo:true,
      portadaObra: "",
      errorPortada:true,
      altObra: "",
      errorAlt:true,
      anioObra: "",
      errorAnio: true,
      estiloObra: "",
      errorEstilo: true,
      autorObra: "",
      errorAutor: true,
      idObra: 0,
      errorId: true,
      categoriaObra: "",
      obra: [],
      nuevaObra: [],
      categorias: [],
      catalogoObras: [],
      
    };
  },

  template: `


  <div class="container-fluid">

      <form v-on:submit.prevent @submit="controlarCampos">
          <div class="col">
              <div class="mb-0 w-75 mx-auto d-block">

                  <h3 class="hh text-center pt-5">Nueva Obra</h3>
                  <div class="row">
                      <!---------------------------------------------------------------->
                      <!----------------------- LOGO DE LA GALERIA --------------------->
                      <div class="pt-4 mt-4 col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <img src="img/logo/logo1.png" class="img2 img-fluid mx-auto d-block" alt="Imagen de la obra">
                      </div>                     
                  
                      <!---------------------------------------------------------------->
                      <!-------------- FORMULARIO DE INGRESO NUEVA OBRA  --------------->
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 d-flex flex-column mt-4 p-2">
                          <div class="form-group row-3 px-5">                            
                              <input type="text" id="titulo" class="form-control mb-1" placeholder="Titulo de obra" v-model="tituloObra">  
                              <span class="text-danger" v-if="!this.errorTitulo">Debe completar el nombre de la obra</span>                                  
                              <input type="text" id="portada" class="form-control mb-1 mt-3" placeholder="Archivo.jpg o link a la imagen" v-model="portadaObra">                           
                              <span class="text-danger" v-if="!this.errorPortada">Debe completar el nombre de la portada</span>                                  
                              <input type="text" id="alt" class="form-control mb-1  mt-3" placeholder="Texto alternativo para la imagen" v-model="altObra">                                
                              <select class="form-select form-select-lg mb-1  mt-3 fs-5" id="categ" v-model="idObra">                
                                <option disabled value="0"> - Seleccionar - </option>
                                <option v-for="item in categorias" :value="item.id" :key="item.id" >{{item.titulo}}</option>
                              </select> 
                              <span class="text-danger" v-if="!this.errorId">No eligió una categoría</span>                                  
                              <input type="number" id="anio" class="form-control mb-1 mt-3" placeholder="Año de la obra" v-model="anioObra">
                              <span class="text-danger" v-if="!this.errorAnio">El año debe estar entre 1 y 9999</span>                                  
                              <input type="text" id="estilo" class="form-control mb-1 mt-3" placeholder="Estilo artístico" v-model="estiloObra">
                              <span class="text-danger" v-if="!this.errorEstilo">Debe completar el estilo artístico</span>                                  
                              <input type="text" id="autor" class="form-control mb-1 mt-3" placeholder="Nombre del artista" v-model="autorObra">
                              <span class="text-danger" v-if="!this.errorAutor">Debe completar el nombre del artista</span>                                  
                          </div>

                          <div class="d-grid gap-2 col-6 mx-auto mb-5 mt-3">
                              <input type="submit" value="Agregar" class="btn btn-primary">
                          </div>
                      </div>


                  </div>
              </div>
          </div>
      </form>
  
      <!---------------------------------------------------------------->
      <!----------------- MUESTRA LAS OBRAS AGREGADAS ------------------>
      <div class="p-5 mr-5 mb-3 w-75 col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12 col-xxl-12 container-fluid">
          <h3 class="hh text-center" v-if="this.nuevaObra.length">Obra agregada</h3>
          <div class="d-flex flex-wrap bd-highlight border border-3 m-3 mb-4" v-for="item in nuevaObra">
              <div class="text-white flex-fill bd-highlight border p-1">  <span class="text-primary">Título: </span>{{item['nombre']}}</div>
              <div class="text-white flex-fill bd-highlight border p-1">  <span class="text-primary">Portada: </span>{{item['portada']}}</div>
              <div class="text-white flex-fill bd-highlight border p-1">  <span class="text-primary">Alternativo: </span>{{item['alt']}}</div>
              <div class="text-white flex-fill bd-highlight border p-1">  <span class="text-primary">Categoria: </span>{{item['categoria']}}</div>
              <div class="text-white flex-fill bd-highlight border p-1">  <span class="text-primary">Año: </span>{{item['anio']}}</div>
              <div class="text-white flex-fill bd-highlight border p-1">  <span class="text-primary">Estilo: </span>{{item['estilo']}}</div>
              <div class="text-white flex-fill bd-highlight border p-1">  <span class="text-primary">Artista: </span>{{item['autor']}}</div>
          </div>           
      </div>

  </div>
  

    `,

  //Lee de localStorage las Categorias para el dropdown de selección
  beforeMount() {
    if (localStorage.Categoria) {
      this.categorias = JSON.parse(localStorage.getItem("Categoria"));
    }    
  },
  

  //Guarda en localStorage las obras agregadas
  beforeDestroy() {
    if (this.nuevaObra != []) {
      if (localStorage.Catalogo) {
        this.catalogoObras = JSON.parse(localStorage.getItem("Catalogo"));
      }
      this.catalogoObras = this.catalogoObras.concat(this.nuevaObra);
      localStorage.setItem("Catalogo", JSON.stringify(this.catalogoObras));
    }
  },

  methods: {
    agregarObra: function () {
      categoriaObra = this.categorias[this.idObra - 1].titulo;
      obra = {
        nombre: this.tituloObra,
        portada: this.portadaObra,
        alt: this.altObra,
        categoria: this.categorias[this.idObra - 1].titulo,
        categ: this.idObra,
        anio: this.anioObra,
        estilo: this.estiloObra,
        autor: this.autorObra,
      };
      this.nuevaObra.push(obra);
      this.tituloObra = "";
      this.portadaObra = "";
      this.altObra = "";
      this.idObra = 0;
      this.anioObra = "";
      this.estiloObra = "";
      this.autorObra = "";
    },

    controlarCampos: function () {
      this.tituloObra != "" ? this.errorTitulo=true : this.errorTitulo=false;
      this.portadaObra != "" ? this.errorPortada=true : this.errorPortada=false;
      this.idObra != 0 ? this.errorId=true : this.errorId=false;      
      this.estiloObra != "" ? this.errorEstilo=true : this.errorEstilo=false;
      this.autorObra != "" ? this.errorAutor=true : this.errorAutor=false; 
      if (this.anioObra != ""){ 
        if( this.anioObra >= 1 && this.anioObra <= 9999){
          this.errorAnio=true;
        }
        else { this.errorAnio=false;}
      }  
      else {this.errorAnio=false;}
      if(this.errorTitulo && this.errorPortada &&this.errorId &&this.errorAnio &&this.errorEstilo && this.errorAutor)
        this.agregarObra();      
    },
  },
});

