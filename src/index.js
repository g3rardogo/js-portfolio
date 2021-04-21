//Usamos alias para identificar en donde se encuentra nuestro archivo sin necesidad de especificar toda la ruta
//El @ indica que es un alias
import Template from '@templates/Template.js';
//Agregando los estilos css
import '@styles/main.css';
import '@styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
