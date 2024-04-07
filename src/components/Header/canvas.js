export default function draw() {
 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');

 const logo = new Image();
 logo.src = 'logoblanco.png';

 const initialPosition = -logo.width;
 const targetPosition = canvas.width / 2 - logo.width / 2;
 let position = initialPosition;
 const speed = 2;
 let rotationAngle = 0; 

 
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   const rotationSpeed = 0.05; 
   rotationAngle += speed * rotationSpeed;

   ctx.save();
   ctx.translate(position + logo.width / 2, canvas.height / 2);
   ctx.rotate(rotationAngle);
   ctx.drawImage(logo, -logo.width / 2, -logo.height / 2);
   ctx.restore();

   position += speed;

   if (position >= targetPosition) {
     position = targetPosition;
     cancelAnimationFrame(animation);
   } else {
     animation = requestAnimationFrame(draw);
   }
 

 let animation = requestAnimationFrame(draw);
  }