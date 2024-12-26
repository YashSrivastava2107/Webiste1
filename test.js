const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const interactiveStars = [];
const backgroundStars = [];
const connections = [];
let currentConnection = 0;
let progress = 0;

// Helper function to generate a random number within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Helper function to create stars
function createStar(x, y, size, twinkleSpeed) {
    return {
        x: Math.min(Math.max(x, 0), canvas.width),  // Ensure x is within canvas
        y: Math.min(Math.max(y, 0), canvas.height), // Ensure y is within canvas
        size,
        opacity: random(0.3, 0.8),
        twinkleSpeed
    };
}

// Function to add an interactive star with a specific message (video or text)
function addInteractiveStar(x, y, content, type) {
    interactiveStars.push({
        ...createStar(x, y, 6, random(0.002, 0.005)),
        interactive: true,
        content,  // Store the content (either video URL or text)
        type  // Store the type (either "video" or "text")
    });
}

// Function to add a background star
function addBackgroundStar(x, y) {
    backgroundStars.push(createStar(x, y, random(1, 2), random(0.005, 0.01)));
}

// Hardcode the interactive stars with random positions
function initializeInteractiveStars() {
    // Define the messages (content) for each star (either video or text)
    const starMessages = [
        { content: 'videos/vid1.mp4', type: 'video' },
        { content: 'videos/vid2.mp4', type: 'video' },
        { content: 'videos/vid3.mp4', type: 'video' },
        { content: 'videos/vid4.mp4', type: 'video' },
        { content: 'videos/vid5.mp4', type: 'video' },
        { content: 'videos/vid6.mp4', type: 'video' },
        { content: 'videos/vid7.mp4', type: 'video' },
        { content: 'videos/vid8.mp4', type: 'video' },
        { content: 'videos/vid9.mp4', type: 'video' },
        { content: 'videos/vid10.mp4', type: 'video' },
        { content: 'videos/vid11.mp4', type: 'video' },
        { content: 'videos/vid12.mp4', type: 'video' },
        { content: 'videos/vid13.mp4', type: 'video' },
        { content: 'videos/vid14.mp4', type: 'video' },
        { content: 'videos/vid15.mp4', type: 'video' },
        { content: 'videos/vid16.mp4', type: 'video' },
        { content: 'videos/vid17.mp4', type: 'video' },
        {content: 'Dear Rahul Everyone saying good things about you We will only talk about the good times we have had together. And the best part is, that no one else will understand as its in our own GG club language ❤ Hope you enjoy and relive these moments - we sure did when we put this together. Happy 50th Bro ❤❤❤ Amiya, Gesu and Dimple', type :'text'},
        { content: 'Happy 50th Rahul Bhaiya. You make 50th look so FUN. 🤩 My earliest memories with you, when I was still a kid, are of you pulling my leg. And the recent ones are no different. Basically nothing has changed. You remain the OG king of roasting us, through time immemorial and having us in splits. There’s never a dull moment around you 😄😄 We have learnt a lot from you about making people feel special. The cake ritual that you had started, was something so lovely. When you started doing it, there was no Zomato or Swiggy. It took time, energy, effort and thought. And every single time, the smile it brought on our faces was huge. 🥰🥰 Back in 2010, when Shantanu and I decided to marry, I remember a Facebook post that I made and how you got involved in it, in spite of being a passive FB user. Your enthusiasm built the whole excitement towards the wedding. You were constantly in touch with me, updating me about your tickets, arrival etc. It meant the world to me. It made me feel truly special. What you’re doing in every aspect of your life, Rahul Bhaiya, is remarkable. And as your younger brothers and sisters, all of us look up to you and feel very inspired. Hope you have a wonderful time celebrating this milestone birthday! We wish you many more milestone celebrations in the future. Lots of lots of love and regards 🙏🏽 Shreya, Shantanu, Mihika and Noshi', type: 'text' },
{ content: 'जन्म दिवस की बहुत बहुत बधाई एवं शुभकामनाएं प्यारे राहुल ❤ तुम अपनी पचास वीं सालगिरह मनाने जा रहे हो, यकीन नहीं हो रहा है,छोटा सा, प्यारा सा राहुल कब इतना बड़ा हो गया पता ही नहीं चला 🙂बचपन में तुम जितने नटखट थे उसके विपरीत अभी सौम्य, शांत हो गये हो। तुम्हारे बचपन कीबहुत सारी मजेदार बातें याद कर बहुत हंसी आती है,वो मै लिख नहीं सकती,😁 मिलने पर बताऊंगी।', type: 'text' },
{ content: 'तुम हमेशा स्वस्थ मस्त व्यस्त एवं प्रसन्न रहो यही ईश्वर से प्रार्थना है। तरक्की करो,आगे बढ़ो, ईश्वर की कृपा, बड़ों का आशीर्वाद एवं छोटों का प्यार हमेशा तुम्हारे साथ हैं। अपने स्पेशल जन्म दिवस पर ग्रैंड सेलिब्रेशन करो, खूब मस्ती करो दोस्तों रिश्तेदारों के साथ।इस खुशी के मौके पर हम सभी तुम्हारे साथ हैं।यह खुशी का दिन बार बार आए।👏👏👏👏👏❤😘😘🥰🎉🎊🌸🌺🎁🎈🥳🥳🎁🎈🥳🥳❤🙌🙌', type: 'text' },
{ content: 'Hello Rahul Tumko janmdin ke bahut bahut badhai pyar or aashirwad Tum hamesha khush or swasth raho yahi prarthana hai by namrata sharan', type: 'text' },
{ content: 'कहां से शुरू करूँ ? राहुल मदालसा के गाने से ही सर्वोत्तम लाइंस उनके गाने की. जिंदगी होगी इतनी खूबसूरत कभी सोंचा न था. राष्ट्रपति भवन के सामने कैथेड्रल नर्सरी स्कूल राष्ट्रपति नीलम संजीव रेड्डी की पोती के साथ पढ़ते हुए उनकी बड़ी कार का आकर्षण कार के प्रति उसका प्रेम तो मशहूर है बचपन मे मनमर्जी वाला राहुल कैसे धीर गम्भीर बन गया कभी सोंचा न था कल्पना से बेह्तर होती जिंदगी कभी सोंचा न था . अंडमान के स्कूल की पढ़ाई व कठिनाई से बन गया वो कर्मठ होशियार 9 उँगलियों मे भगवान ने चक्र ऐसे ही थोड़े ना दिया होगा जिंदगी मे आगे बढ़ने से भला कौन रोक सकता है ऐसा है हमारा बेटा राहुल ज्ञानवान ऊर्जावान खूबसूरत व्यक्तित्व मासूम. हास्य-व्यंग्य पर मस्त चुटकी लेने वाला अपनी नानी के संस्कारों से प्रभावित अपनी फुआ व सबका लाड़ला अपने कार्यों से अचंभित करने वाला राहुल मन की बात बिना कहे समझ अमल करने वाला. कैसा लगता है ? एक मां क्या व कैसे बताए! बस समझ लीजिए है जिन्दगी अपनी एक उत्सव की तरह स्वस्थ सुखी जीवन का राज है हमारा अनमोल रिश्ता ❤❤❤❤❤❤❤❤ बहुत बहुत प्यार आशीर्वाद प्यारे बेटे Our Life Line ♥ ❤/ by Mom', type: 'text' }

    ];

    // Randomly assign positions for each star
    starMessages.forEach(message => {
        const x = Math.random() * canvas.width;  // Random x position
        const y = Math.random() * canvas.height; // Random y position
        addInteractiveStar(x, y, message.content, message.type); // Add the star at the random position
    });
}

// Randomize the background stars (ensure they stay within the canvas)
function randomizeBackgroundStars(count) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        addBackgroundStar(x, y);
    }
}

// Connect stars in a looped pattern
function connectStars() {
    connections.length = 0;
    for (let i = 0; i < interactiveStars.length; i++) {
        const start = interactiveStars[i];
        const end = interactiveStars[(i + 1) % interactiveStars.length]; // Loop back to the first star
        connections.push([start, end]);
    }
}

// Draw stars with twinkle effect
function drawStars(stars) {
    stars.forEach((star) => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.3) {
            star.twinkleSpeed *= -1; // Reverse direction for twinkling
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });
}

// Animate the connections between interactive stars
function drawConnections() {
    if (connections.length > 0) {
        const [start, end] = connections[currentConnection];

        const x = start.x + (end.x - start.x) * progress;
        const y = start.y + (end.y - start.y) * progress;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        progress += 0.002;
        if (progress >= 1) {
            progress = 0;
            currentConnection = (currentConnection + 1) % connections.length;
        }
    }
}

// Main animation function
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars(backgroundStars); // Draw background stars
    drawConnections(); // Draw connecting lines between interactive stars
    drawStars(interactiveStars); // Draw interactive stars

    requestAnimationFrame(animate);
}

// Event listener for resizing the window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    connectStars(); // Reconnect stars after resizing
});

// Function to show the message box when a star is clicked
function showMessage(content, type) {
    const messageBox = document.getElementById('message-box');
    const messageContent = document.getElementById('message-content');
    
    // Clear previous content
    messageContent.innerHTML = '';

    if (type === 'video') {
        const videoElement = document.createElement('video');
        videoElement.src = content; // Set video URL
        videoElement.controls = true; // Add video controls
        videoElement.style.width = '100%'; // Make the video take up 100% width
        videoElement.style.height = '100%'; // Make the video take up 100% height
        videoElement.style.objectFit = 'contain'; // Ensure the video fits inside the box while maintaining aspect ratio
        videoElement.style.borderRadius = '10px'; // Optional: border radius for the video
        messageContent.appendChild(videoElement); // Add the video to the content area
    } else if (type === 'text') {
        const textElement = document.createElement('p');
        textElement.innerText = content; // Set text content
        messageContent.appendChild(textElement); // Add the text to the content area
    }

    messageBox.style.display = 'block'; // Show the message box
}

// Function to hide the message box when the close button is clicked
document.getElementById('close-button').addEventListener('click', hideMessage);

function hideMessage() {
    const messageBox = document.getElementById('message-box');
    messageBox.style.display = 'none'; // Hide the popup
}
// Event listener for clicks on the canvas
canvas.addEventListener('click', (event) => {
    const { offsetX, offsetY } = event;

    // Check if the click is inside any of the interactive stars
    interactiveStars.forEach((star) => {
        const distance = Math.sqrt((offsetX - star.x) ** 2 + (offsetY - star.y) ** 2);
        if (distance <= star.size) {
            showMessage(star.content, star.type); // Show the content (video or text) for the clicked star
        }
    });
});

// Initialize the stars and animations
initializeInteractiveStars(); // Initialize interactive stars with hard-coded content
randomizeBackgroundStars(100); // Randomize 100 background stars
connectStars(); // Connect the stars
animate(); // Start animation loop
