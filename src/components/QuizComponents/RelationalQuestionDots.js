import {useEffect} from "react";

const RelationalQuestionDots = () => {
    useEffect(() => {
        const canvas = document.getElementById('dotCanvas');
        const ctx = canvas.getContext('2d');

        const dots = [
            { x: 150, y: 100 },
            { x: 150, y: 50 },
            { x: 250, y: 50 },
            { x: 250, y: 100 },
        ];

        let selectedDot = null;
        let tempLineStart = null;
        const connectedDots = [];

        canvas.addEventListener('click', handleCanvasClick);

        function drawDot(x, y) {
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#000';
            ctx.fill();
        }

        function drawLine(startX, startY, endX, endY) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = '#000';
            ctx.stroke();
        }

        function handleCanvasClick(event) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;

            for (const dot of dots) {
                const distance = Math.sqrt((mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2);
                if (distance < 5) {
                    // Clicked on a dot
                    if (selectedDot) {
                        // Check if a line is already drawn between these dots
                        const isConnected = connectedDots.some(([dot1, dot2]) =>
                            (dot1 === selectedDot && dot2 === dot) || (dot1 === dot && dot2 === selectedDot));

                        if (!isConnected) {
                            // Draw line between selected dot and this dot
                            drawLine(selectedDot.x, selectedDot.y, dot.x, dot.y);
                            connectedDots.push([selectedDot, dot]);
                        }

                        selectedDot = null; // Reset selected dot
                        tempLineStart = null; // Reset temp line start
                    }
                    else {
                        selectedDot = dot;
                        tempLineStart = dot;
                    }
                    break;
                }
            }
        }

        canvas.addEventListener('mousemove', handleMouseMove);

        function handleMouseMove(event) {
            if (selectedDot) {
                const mouseX = event.clientX - canvas.getBoundingClientRect().left;
                const mouseY = event.clientY - canvas.getBoundingClientRect().top;

                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
                for (const dot of dots) {
                    drawDot(dot.x, dot.y);
                }

                drawDot(selectedDot.x, selectedDot.y); // Redraw selected dot
                if (tempLineStart) {
                    drawLine(tempLineStart.x, tempLineStart.y, mouseX, mouseY); // Draw temp line
                }

                // Redraw permanent lines
                for (const [dot1, dot2] of connectedDots) {
                    drawLine(dot1.x, dot1.y, dot2.x, dot2.y);
                }
            }
        }

        // Initial draw of dots
        for (const dot of dots) {
            drawDot(dot.x, dot.y);
        }
    }, []);

    return (
        <div id="container">
            <canvas id="dotCanvas" width="400" height="200"></canvas>
            <span id="option1">Option 1</span>
            <span id="option2">Option 2</span>
            <span id="option3">Option 3</span>
            <span id="option4">Option 4</span>
        </div>
    );
}

export default RelationalQuestionDots;