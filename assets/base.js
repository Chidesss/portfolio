const canvas = document.querySelector("#particles");
const context = canvas.getContext("2d");
const colors = [
    [242, 121, 222],
    [191, 132, 217],
    [132, 119, 217],
    [181, 179, 242],
    [187, 195, 242],
];

let width, height, circles = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createCircles();
}

function createCircles() {
    circles = [];
    const count = Math.floor(width * height * 0.00008); // fewer circles
    for (let i = 0; i < count; i++) {
        circles.push(new Circle());
    }
}

function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

class Circle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 20 + 5; // random size
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random();
        this.setTarget();
    }

    setTarget() {
        this.startX = this.x;
        this.startY = this.y;
        this.targetX = this.x + (Math.random() * 200 - 100);
        this.targetY = this.y + (Math.random() * 200 - 100);
        this.tick = 0;
        this.ttl = Math.random() * 180 + 180;
    }

    update() {
        if (this.tick >= this.ttl) this.setTarget();
        const p = easeInOutQuad(this.tick / this.ttl);
        this.x = this.startX + (this.targetX - this.startX) * p;
        this.y = this.startY + (this.targetY - this.startY) * p;
        this.tick++;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${this.color.join(",")},${this.alpha})`;
        context.fill();
    }
}

function animate() {
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";
    circles.forEach(c => {
        c.update();
        c.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();
    animate();
});
