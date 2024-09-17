const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('moveButton');

const circle = {
    x: 100,
    y: 300, 
    size: 20, 
    dx: 4, 
    dy: 4
};

const bricks = [];
for (let i = 0; i < 7; i++) {
    bricks.push({
        x:i * 70 + 10,
        y: 20,
        width: 50,
        height: 30
    });
};

const drawBricks = () => {
    ctx.fillStyle = 'blue';
    bricks.forEach(brick => {
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    });
};

// const detectCollision = (circle, brick) => {
//     // Check if circle is within the brick's bounds
//     const distX = Math.abs(circle.x - brick.x - brick.width / 2);
//     const distY = Math.abs(circle.y - brick.y - brick.height / 2);
    
//     if (distX > (brick.width / 2 + circle.size) || distY > (brick.height / 2 + circle.size)) {
//         return false;
//     }
    
//     if (distX <= (brick.width / 2) || distY <= (brick.height / 2)) {
//         return true;
//     }
    
//     const dx = distX - brick.width / 2;
//     const dy = distY - brick.height / 2;
//     return (dx * dx + dy * dy <= (circle.size * circle.size));
// };

const drawCircle = () => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
};

const updateCircle = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawCircle(); 
    drawBricks();
    // Move the circle
    circle.x += circle.dx;
    circle.y += circle.dy;

    // Detect side walls
    if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
        circle.dx = -circle.dx; // Reverse direction
    }

    // Detect top and bottom walls
    if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
        circle.dy = -circle.dy; // Reverse direction
    }

    // bricks.forEach((brick, index) => {
    //     if (detectCollision(circle, brick)) {
    //         bricks.splice(index, 1); // Remove collided brick
    //     }
    // });

    requestAnimationFrame(updateCircle);
};

updateCircle();
