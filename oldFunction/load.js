const loadScript = (url, cb) => {
    window.onload = () => {
        const el = document.createElement("script");
        el.type = "text/javascript";
        el.src = url;
        el.onload = cb;
        let d = document.body.children;
        for (let index = 0; index < d.length; index++) {
            const element = d[index];
            console.log(element);
            if (el !== element) {
                document.body.appendChild(el);
            }
        }

        console.log(d);
    }
}