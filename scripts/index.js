// index.js - Run the update loop and interactivity for VK homepage
var canvas, context;
var count = 0; loaded = 0;
var logo;
var divisor = 2.0;
var window_scale, window_center_x, window_center_y;
var refresh = false;

// Window scaling
function window_scaling() {
    // Set Window Scale
    if (window.innerWidth < window.innerHeight) {
        window_scale = window.innerWidth / divisor;
    } else {
        window_scale = window.innerHeight / divisor;
    }

    // Set minimum logo size
    if (window_scale < 256) {
        window_scale = 256;
    }

    // Set Center Position (middle of screen)
    window_center_x = (canvas.width / 2);
    window_center_y = (canvas.height / 2);
}

// Place everything in an anonymous function, called on window load.
if (window.addEventListener) {
    window.addEventListener('load', function () {

        // Find the canvas element.
        canvas = document.getElementById('viewport');

        // Get the 2D canvas context
        context = canvas.getContext('2d');

        // Load Logo Image
        if (!loaded) {
            logo = new Image();
            logo.src = 'resources/logo/logo.svg';
            loaded = 0;
        }

        // Initialize page counter
        count = 0;

        // Attach the event handlers
        window.addEventListener("resize", ev_resize);

        // Start loop timer
        myTimer = setInterval(loop, 33);

        // Function Definitions
        //---------------------

        // Timer loop (runs every time the timer fires)
        function loop() {

            // Redraw page
            redraw();

            // Update loop count
            count = count + 1.0;
        }

        // Main (re)drawing function
        function redraw() {

            // Set Canvas Size
            canvas.width = window.innerWidth * 0.95;
            canvas.height = window.innerHeight * 0.95;

            // Window scale
            window_scaling();

            // Draw Logo from SVG
            if (loaded == 0) {
                logo.onload = function () {
                    logo.width = 1.0;
                    logo.height = 1.0;
                    context.save();
                    context.translate(window_center_x, window_center_y * 0.9);
                    context.rotate(-1 * Math.sin(count / 2000.0));
                    context.drawImage(logo, -window_scale / 2, -window_scale / 2, window_scale, window_scale);
                    context.restore();
                    loaded = 1;
                }
            } else {
                logo.width = 1.0;
                logo.height = 1.0;
                context.save();
                context.translate(window_center_x, window_center_y * 0.9);
                context.rotate(-1 * Math.sin(count / 2000.0));
                context.drawImage(logo, -window_scale / 2, -window_scale / 2, window_scale, window_scale);
                context.restore();
            }

            // VK Logo Text
            context.save();
            context.translate(window_center_x, window_center_y);
            context.fillStyle = "black";
            var fontSize = window_scale / 8;
            context.font = 'bold ' + fontSize + 'px Arial, sans-serif';
            context.textAlign = 'center';
            context.fillText("Voight-Kampff", 0, window_scale - fontSize * 3.14159);
            context.restore();

            // VK Slogan Text
            context.save();
            context.translate(window_center_x, window_center_y);
            context.fillStyle = "black";
            var fontSize = window_scale / 8;
            context.font = 'italic ' + fontSize / 2.1 + 'px Georgia, serif';
            context.textAlign = 'center';
            context.fillText("Think outside the screen", 0, window_scale - (fontSize * 2.321));
            context.restore();
        }

        // The resize event handler
        function ev_resize(e) {
            redraw();
        }

        // Just in case
        redraw();

    }, false);
}