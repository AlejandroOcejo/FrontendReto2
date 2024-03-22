export default function draw() {
// Configuración del canvas
 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');

 // Carga tu logo (aquí debes reemplazar 'logo.png' con la ruta de tu propio logo)
 const logo = new Image();
 logo.src = 'logoblanco.png';

 // Configuración inicial
 const initialPosition = -logo.width;
 const targetPosition = canvas.width / 2 - logo.width / 2;
 let position = initialPosition;
 const speed = 2; // Velocidad de movimiento
 let rotationAngle = 0; // Ángulo de rotación inicial

 
   // Borra el canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Calcula el ángulo de rotación basado en la posición horizontal
   const rotationSpeed = 0.05; // Velocidad de rotación
   rotationAngle += speed * rotationSpeed;

   // Dibuja el logo aplicando la rotación
   ctx.save();
   ctx.translate(position + logo.width / 2, canvas.height / 2);
   ctx.rotate(rotationAngle);
   ctx.drawImage(logo, -logo.width / 2, -logo.height / 2);
   ctx.restore();

   // Mueve el logo hacia la derecha
   position += speed;

   // Si el logo alcanza la posición objetivo, detén la animación
   if (position >= targetPosition) {
     position = targetPosition;
     cancelAnimationFrame(animation);
   } else {
     // Solicita al navegador que vuelva a dibujar la escena
     animation = requestAnimationFrame(draw);
   }
 

 // Inicia la animación
 let animation = requestAnimationFrame(draw);
  }