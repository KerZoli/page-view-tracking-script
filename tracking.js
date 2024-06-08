(function() {
    // every client should have it's own uuid
    const CLIENT_UUID = 'acde070d-8c4c-4f0d-9d8a-162843c10333';
    const BACKEND_URL = 'http://localhost:8080';
    
    const generateUid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

    const setCookie = (name, value, expireInDays) => {
        const d = new Date();    
        d.setTime(d.getTime() + (expireInDays * 24 * 60 * 60 * 1000));

        let expires = "expires="+ d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    const getCookie = (name) => {
        name += "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cArray = decodedCookie.split(';');
        for (let i=0; i<cArray.length; i++) {
          let c = cArray[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }

        return null;
    }

    const addTrackingPixel = (uniqueId, path) => {
        const img = new Image(1, 1);
        img.src = `${BACKEND_URL}/tracking?client_id=${CLIENT_UUID}&visitor_id=${uniqueId}&pathname=${path}&rand=${Math.random()}`;
        img.style.display = 'none';

        document.body.appendChild(img);
    }

    const trackPageView  = () => {
        const cookieName = 'visitor_id';
        const visitorId = getCookie(cookieName);

        if (!visitorId) {
            uniqueId = generateUid();
            setCookie(cookieName, uniqueId, 365);
        }
        const path = encodeURIComponent(window.location.pathname);

        addTrackingPixel(uniqueId, path)
    }

    window.onload = trackPageView;
})();