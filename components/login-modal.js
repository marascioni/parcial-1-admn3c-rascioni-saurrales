///************************************************************
///******************* login-modal.js *************************
///************ VENTANA MODAL - LOGIN DE USUARIO **************
///************************************************************
console.log("Se ha cargado el componente login-modal.js")
const USUARIO = "root";
const PASSWORD = "123456";

// COMPONENTE Vue.component para registrar el componente, pasar etiqueta(nombre del componente) y constructor (opciones)
Vue.component('login-modal', {
    
    //html
    template: `

        <!-----v-show muestra de modo condicional el elemento. Si el valor es true mostrará el elemento ------>
        <!-----si es false le apliará la propiedad display:none ------>
        <div v-show="panelLoginVisible" class="modal" tabindex="-1" role="dialog" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                <!----------------------------------------------------------->
                <!------- CABECERA MODAL (y cruz para cerrar ventana) -------> 
                <!----------------------------------------------------------->
                    <div class="modal-header">
                        <h5 class="modal-title">Inicio de sesión</h5>
                        <button type="button" class="close" aria-label="Close" @click="ocultarPanelLogin">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                <form @submit.prevent="loginOnServer">
                    <div class="modal-body">    
                    
                        <!--------------------------------------------------->
                        <!------------ INGRESO USUARIO ---------------> 
                        <!--------------------------------------------------->
                        <p>Por favor, ingrese su usuario</p>
                        <!------ v-on para vincular un evento al input ------>
                        <input type="usuario" v-model="usuario">

                        <!--------------------------------------------------->
                        <!------------ INGRESO PASSWD USUARIO ---------------> 
                        <!--------------------------------------------------->
                        <p>Por favor, ingrese la contraseña genérica provista.</p>
                        <!------ v-on para vincular un evento al input ------>
                        <input type="password" v-model="password">
                        

                        <!--------------------------------------------------->
                        <!-------- POLITICAS TERMINOS Y CONDICIONES ---------> 
                        <!--------------------------------------------------->                       
                        <!--- v-model permite crear el data binding / o el enlace de datos / de 2 vias ------------------------> 
                        <!-- inputs, textarea y select poseen esta directiva actualizar el elemento según el tipo de entrada --> 
                        <!----------------------------------------------------------------------------------------------------->  
                        <p class="mt-1 fw-bold" >Para poder continuar, debe aceptar las politicas de privacidad, y los términos y condiciones</p>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="policies" id="flexCheckDefault" v-model="legals">
                          <label class="form-check-label" for="flexCheckDefault">
                            Politicas de privacidad
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="terms" id="flexCheckChecked" v-model="legals">
                          <label class="form-check-label" for="flexCheckChecked">
                            Términos y condiciones
                          </label>
                        </div>
                    </div>

                    <div class="modal-errors">
                        <div v-for="error in errors" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>                  
                    </div>

                        <!--------------------------------------------------->
                        <!------------ BOTON INICIO DE SESION----------------> 
                        <!--------------------------------------------------->
                        <div class="modal-footer">
                            <input type="submit" value="Iniciar Sesión" class="btn btn-primary" :disabled="loginIsDisable">
                            <!----- atajo v-on vincula un evento a un botón ----->
                            <button type="button" class="btn btn-secondary" @click="ocultarPanelLogin">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,

    //props tiene lo que le paso de afuera 
    props: ['panelLoginVisible', 'ocultarPanelLogin', 'iniciarSesion'],

    //computed variables calculadas ej. loginIsDisable variable para el template, 
    //se calcula a partir del valor de otra variable, indirecta, puede tener varias consultas
    computed: {
        loginIsDisable: function () {
            return this.legals.length !== 2;
        }
    },

    methods: {
        loginOnServer: function () {
            this.errors = [];
            //valida usuario correcto
            if (this.usuario !== USUARIO) {
                this.errors.push("El usuario es incorrecto");
                return;
            }
            //valida password correcto
            if (this.password !== PASSWORD) {
                this.errors.push("La contraseña es incorrecta");
                return;
            }
            new Promise((success, error) => {
                setTimeout(() => {
                    success();
                }, 2000);
            })


                //emit, depende de si se autentico bien o no devuelve true o false
                //el hijo dispara un evento que va al padre app
                .then(() => {
                    console.log("Estamos autenticando al usuario en el servidor");
                    this.iniciarSesion();
                    this.$emit('authenticated', true);
                })
                .catch(() => {
                    console.log("No se pudo autenticar al usuario en el servidor");
                    this.$emit('authenticated', false);
                });
        }
    },


    //---------------------------------------------------
    //--------------- LOGIN DE USUARIO ------------------
    //---------------------------------------------------
    //--- hooks del CICLO DE VIDA: beforeCreate, created, BeforeMount, Mounted, beforeUpdate, updated, beforeDestroy, destroyed

    //--- beforeMount Invodado justo antes de que comience el montaje la función render está a punto de ser llamada por primera vez
    beforeMount() {
        /* console.log("Se va a montar el componente login-modal");
        console.log(this.panelLoginVisible); */
    },
    //--- Invocado cuando los datos cambian antes de que se actualice el DOM
    beforeUpdate() {
        /* console.log("Se va a actualizar el componente");
        console.log(this.panelLoginVisible); */
    },


    data: function () {
        return {
            errors: [],
            legals: [],
            usuario: "",
            password: ""
        }
    }

});