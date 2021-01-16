const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

let engine, 
    world, 
    particles = [], 
    plinkos = [],
    bounds = [],
    cols = 11,
    rows = 9,
    particleSize = 10,
    plinkoSize = 14;

function setup() {
  createCanvas(600, 700);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 2;
  
  newParticle();
  const spacing = width / cols;
  for (let j = 0; j < rows; j ++) {
    for (let i = 0; i < cols +1; i ++) {
      let x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
      }
      const y = spacing + j * spacing;
      const p = new Plinko(x, y, plinkoSize);
      plinkos.push(p);
    }
  }
  
  b = new Boundary(width/2, height + 50, width, 100);
  
  bounds.push(b);
  for (let i = 0; i < cols +1; i ++) {
    const x = i * spacing;
    const h = 100;
    const w = 10;
    const y = height - h/2;
    let b = new Boundary(x, y, w, h);
    bounds.push(b);
  }

  
}

function newParticle() {
  const p = new Particle(random(100,600), 0, particleSize);
  particles.push(p);
}

function draw() {
  if (frameCount % 30 == 0) {
    newParticle();
  }
  background(51);
  Engine.update(engine);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();  
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i,1);
      i--;
    }
  }
  for (let i = 0; i < plinkos.length; i++) {
    plinkos[i].show();  
  }
  
  for (let i = 0; i < bounds.length; i++) {
    bounds[i].show();  
  }
}
