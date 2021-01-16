function Boundary(x,y,w,h) {
    const options = {
      density : 1,
      friction: 1,
      isStatic : true
    };
    this.body = Bodies.rectangle(x,y,w,h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }
  
  Boundary.prototype.show = function() {
    fill(128);
    // stroke(255);
    noStroke();
    const {x, y} = this.body.position;
    push();
    translate(x, y);
    rectMode(CENTER);
    rect(0,0, this.w, this.h);
    pop();
  }