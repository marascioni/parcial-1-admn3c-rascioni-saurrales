///***********************************************************
///***************** show-categorias.js **********************
///**************** CONTENIDO CATEGORIAS *********************
///***********************************************************
Vue.component('show-obras', {
    data:function(){
        return {
            categorias:[],
            catalogoObras:[],
            idCategoria: 0
        }
    },
    template: `    
    <div>
        <!---------------------------------------------------------------->
        <!----------------------- SCROLL CATEGORIAS  --------------------->        
        <div class="card-group">   
        
            <h3 class="mx-5 pt-5 text-white text-left fs-4 mt-2">Filtro</h3>
            <select class="mt-5 form-select form-select-lg mb-3 w-25 fs-5" v-model="idCategoria">
                <option selected value="0">Catalogo</option>
                <option v-for="item in categorias" :value="item.id" :key="item.id">{{item.titulo}}</option>
            </select> 
        </div> 

        
        <!---------------------------------------------------------------->
        <!-------------------- DESCRIPCIÓN CATEGORIAS -------------------->
        <div v-if="idCategoria!=0">    
            <div class="row w-75 text-center mx-auto d-block p-2"> 
                <div class=" mx-auto mb-5  w-75 fs-5 pageContent bg-secondary bg-opacity-25 text-center p-4 shadow-lg" >  
                    <h2 class="Text-danger text-white fw-bold">{{categorias[idCategoria-1].titulo}}</h2>                      
                    <p class="pageContent__text text-white">{{categorias[idCategoria-1].mensaje}}</p>
                </div>
            </div>       
        </div> 
        <div v-if="idCategoria==0">    
            <div class="row w-75 text-center mx-auto d-block p-2"> 
                <div class=" mx-auto mb-5 w-75 fs-5 pageContent bg-secondary bg-opacity-25 text-center p-4 shadow-lg" >  
                    <h2 class="Text-danger text-white fw-bold">Galería SauRa</h2>                      
                    <p class="pageContent__text text-white">¿Te imaginas un mundo sin arte?
                    «El objetivo del arte no es representar la apariencia externa de las cosas,
                    sino su significado interior.» (Aristóteles)</p>
                </div>
            </div>       
        </div> 


        <!---------------------------------------------------------------->
        <!------------------- CARS CATALOGO PRODUCTOS ------------------->
        <div class="text-white" >
            <h1 class="hh">Obras</h1>  
            <ul class="text-center mx-auto ps-4 px-4">
                <!-- Iteración sobre catalogoObras, muestra las propiedades de cada obra -->
                <!-- v-for para imprimir todos los elementos del array -->          
                <li class="marco p-2 m-3 mb-5" v-for="obra in catalogoObras" v-if="obra.categ==idCategoria || idCategoria==0">
                    <h2 class="fs-3 mb-3 text-warning text-center" >{{obra.nombre}}</h2>           
                    <img v-bind:src="obra.portada" v-bind:alt="obra.alt">   
                    <div class="fondoCard mt-3" >       
                        <h3 class="mx-2" > <span class="text-primary fw-bold">Categoría:</span> {{obra.categoria}} </h3> 
                        <h3 class="mx-2" > <span class="text-primary fw-bold">Año:</span> {{obra.anio}} </h3> 
                        <h3 class="mx-2" > <span class="text-primary fw-bold">Estilo:</span> {{obra.estilo}} </h3>            
                        <h3 class="mx-2" > <span class="text-primary fw-bold">Autor:</span> {{obra.autor}} </h3>             
                    </div>
                </li>      
            </ul>
        </div>
    </div>
    `, 

    mounted:function(){
		if(localStorage.Categoria){
            this.categorias=JSON.parse(localStorage.getItem("Categoria"));
            }
        if (localStorage.Catalogo) {
            this.catalogoObras = JSON.parse(localStorage.getItem("Catalogo"));
            }        
	},
});
