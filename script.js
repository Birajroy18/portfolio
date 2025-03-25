const currentPath = window.location.pathname;

    // Select all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Loop through each link and check if the href matches the current path
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');  // Add the "active" class
        }
    });


function cursor(){
var firstsection = document.querySelector("body");  // Select by class
var cursor = document.querySelector("#cursor");

firstsection.addEventListener("mousemove", function(dets) {
    gsap.to(cursor, {
        x: dets.clientX+cursor.offsetWidth/5,  // Offset by half of cursor's width
        y: dets.clientY - 7.6*cursor.offsetHeight, // Offset by half of cursor's height
        duration: 0.5,    // Adjust duration as needed
        ease: "power3.out" // Smooth animation
    }); 
});
}   
cursor()


function string(){
    var path = "M 20 100 Q 750 100 1490 100"
var finalpath = "M 20 100 Q 750 100 1490 100"

var string = document.querySelector("#string")
string.addEventListener("mousemove", function (dets) {
    path =`M 20 100 Q ${dets.x} ${dets.y} 1490 100`
    gsap.to("svg path", {
        attr: { d: path },
        duration:0.7,
        ease: "power3.out"
    })
})

string.addEventListener("mouseleave",function(){
    gsap.to("svg path",{
        attr:{d:finalpath},
        duration:0.8,
        ease:"elastic.out(1,0.3)"
    })
})
}

string()

function page1Animation(){
    var tl=gsap.timeline()
    tl.from("nav div,nav li",{
        y:-40,
        opacity:0,
        delay:0.5,
        duration:0.8,
        stagger:0.2
    })

    tl.from(".leftsection h1",{
        opacity:0,
        duratino:0.4,
        y:20
    })
    tl.from(".leftsection h2",{
        opacity:0,
        duratino:0.4,
        y:20
    })
    tl.from(".leftsection p",{
        opacity:0,
        x:-200,
        duratino:0.6,
        stagger:0.3
    })
    tl.from(".buttons a",{
        opacity:0,
        duratino:0.4,
        stagger:0.2
    })
    tl.from(".rightsection img",{
        opacity:0,
        duration:0.4,
        x:200
    },"-=0.5")

}

page1Animation()