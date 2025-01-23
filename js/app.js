document.addEventListener('DOMContentLoaded', function(){
    //inputs
    const inpuEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    let emailOb = {
        email:'',
        asunto:'',
        mensaje:''
    }
    const cc = document.querySelector('#cc');

    //Botones
    const enviar = document.querySelector('#formulario button[type="submit"]');
    const reset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //AddEventListeners
    inpuEmail.addEventListener('blur', validar);
    cc.addEventListener('blur', validarCc);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarEmail);
    reset.addEventListener('click', function(e){
        e.preventDefault();

        resetFormulario();
    });

    function validarCc(e){

        if(e.target.value.trim() === ''){//campoVacio

            //actualizar el objeto en caso que se elimine algun campo tambien se elimine en el objeto 
            emailOb[e.target.name] = '';
            console.log(emailOb[e.target.name]);

            limpiarAlerta(e.target.parentElement);
            comprobarEmail(e);
            return; 
        }

        if(e.target.id === 'cc' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);

            //reiniciar ob
            emailOb[e.target.name] = '';

            //hacer una validacion por si se habilita el boton pero se vuelve a modificar los inputs
            comprobarEmail(e)
            return;
        }

       limpiarAlerta(e.target.parentElement);

       //asignar los valores al objeto y poder usar el boton de neviar, es buen lugar porque ya paso las validaciones
       emailOb[e.target.name] = e.target.value.trim().toLowerCase();//trim quita los espacion y tolower lo hace tod minisculas

       comprobarEmail(e);
    }

    function enviarEmail(e){
        e.preventDefault();

        //obtener valor cc
        emailOb.cc = cc.value.trim().toLowerCase();
        console.log(emailOb);

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        //Simulacion de envio
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            //Alerta fomrulario enviado
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('mjeExito', 'bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
                                        'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje Enviado Exitosamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.classList.add('animacion');

                setTimeout(() => {
                    alertaExito.remove();
                }, 1000);
            }, 2000);
        }, 3000);
    }

    function validar(e){
        if(e.target.value.trim() === ''){

            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            console.log(e.target.parentElement);

            emailOb[e.target.name] = '';
            console.log(emailOb[e.target.name]);//Trae el valor del input

            comprobarEmail(e);

            return;
        }
        //Validacion
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El Email no es Valido', e.target.parentElement);

            emailOb[e.target.name] = '';
            console.log(emailOb[e.target.name]);

            comprobarEmail(e);
            return;
        }

        limpiarAlerta(e.target.parentElement);

        emailOb[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(emailOb[e.target.name]);

        comprobarEmail(e);
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-with', 'p-2', 'text-center');

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w([.-]?\w+)*(\.\w{1,10})+$/;
        const resultado = regex.test(email);//este test regresa un true o false
        return resultado;
    }

    function comprobarEmail(e){
        delete emailOb.cc;

        if(Object.values(emailOb).includes('')){
            enviar.classList.add('opacity-50');
            enviar.disabled = true;
            return;
        }
        enviar.classList.remove('opacity-50');
        enviar.disabled = false;
    }

    function resetFormulario(){
        emailOb.email = '';
        emailOb.cc = '';
        emailOb.asunto = '';
        emailOb.mensaje = '';

        formulario.reset();//Reiniciar formulario del HTML

        comprobarEmail();//para que se bloquee el boton enviar}
        
    }

})

